import { HttpService } from '@nestjs/axios';
import { type Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenTypeEnum } from '../../../shared/jwt/common/enums';
import { JwtService } from '../../../shared/jwt/services';

import type { IAuthResult } from '../../auth/common/interfaces';
import { UserService } from '../../user/services';

import {
  AppConfig,
  type IAppConfig,
  type IOAuthConfig,
  OAuthConfig,
} from '../../../config';
import { isNull } from '../../../utils/validation';

import { catchError, firstValueFrom } from 'rxjs';
import { v4 } from 'uuid';

import { OAuthClass } from '../common/classes';
import { OAuthProvidersEnum } from '../common/enums';
import type {
  ICallbackResult,
  IClient,
  IGitHubEmailsResult,
} from '../common/interfaces';

import { CallbackQueryDto } from '../dto';

@Injectable()
export class OAuth2Service {
  private readonly logger = new Logger(OAuth2Service.name);

  private static readonly BASE62 =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private static readonly BIG62 = BigInt(OAuth2Service.BASE62.length);

  private readonly [OAuthProvidersEnum.GOOGLE]: OAuthClass | null;
  private readonly [OAuthProvidersEnum.GITHUB]: OAuthClass | null;

  constructor(
    @Inject(OAuthConfig.KEY) private readonly oauthConfig: IOAuthConfig,
    @Inject(AppConfig.KEY)
    private readonly appConfig: IAppConfig,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    this[OAuthProvidersEnum.GOOGLE] = OAuth2Service.setOAuthClass(
      OAuthProvidersEnum.GOOGLE,
      oauthConfig,
      this.appConfig.baseUrl,
    );
    this[OAuthProvidersEnum.GITHUB] = OAuth2Service.setOAuthClass(
      OAuthProvidersEnum.GITHUB,
      oauthConfig,
      this.appConfig.baseUrl,
    );
  }

  private static setOAuthClass(
    provider: OAuthProvidersEnum,
    oauthConfig: IOAuthConfig,
    url: string,
  ): OAuthClass | null {
    const client: IClient | null = oauthConfig[provider];

    if (isNull(client)) {
      return null;
    }

    return new OAuthClass(provider, client, url);
  }

  private static getOAuthStateKey(state: string): string {
    return `oauth_state:${state}`;
  }

  private static getOAuthCodeKey(code: string): string {
    return `oauth_code:${code}`;
  }

  private static generateCode(): string {
    let num = BigInt('0x' + v4().replace(/-/g, ''));
    let code = '';

    while (num > 0) {
      const remainder = Number(num % OAuth2Service.BIG62);
      code = OAuth2Service.BASE62[remainder] + code;
      num = num / OAuth2Service.BIG62;
    }

    return code.padStart(22, '0');
  }

  public async getAuthorizationUrl(
    provider: OAuthProvidersEnum,
    next?: string,
  ): Promise<string> {
    const oauth = this.getOAuth(provider);
    const [url, state] = oauth.getAuthorizationUrl(next);

    try {
      await this.cacheManager.set(
        OAuth2Service.getOAuthStateKey(state),
        { provider, next },
        120_000,
      );
    } catch (error) {
      this.logger.error('Failed to cache authorization state:', error.message);
    }

    return url;
  }

  public async getUserData<T extends Record<string, any>>(
    provider: OAuthProvidersEnum,
    cbQuery: CallbackQueryDto,
  ): Promise<{ userData: T; next?: string }> {
    const { code, state } = cbQuery;
    const { accessToken, next } = await this.getAccessToken(
      provider,
      code,
      state,
    );
    const userReq = await firstValueFrom(
      this.httpService
        .get<T>(this.getOAuth(provider).dataUrl, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          catchError((error) => {
            throw new UnauthorizedException(error.response.data);
          }),
        ),
    );

    if (userReq.status !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    if (!userReq.data.email && provider === OAuthProvidersEnum.GITHUB) {
      const emails = await this.getGitHubEmails(accessToken);
      const primaryEmail = emails.find((e) => e.primary && e.verified);
      (userReq.data as any).email = primaryEmail?.email;
    }

    return { userData: userReq.data, next };
  }

  public async getGitHubEmails(
    accessToken: string,
  ): Promise<IGitHubEmailsResult[]> {
    const response = await firstValueFrom(
      this.httpService.get<IGitHubEmailsResult[]>(
        'https://api.github.com/user/emails',
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    );
    return response.data;
  }

  public async callback(
    provider: OAuthProvidersEnum,
    email: string,
    name: string,
    surname: string,
    photo?: string,
    domain?: string,
  ): Promise<ICallbackResult> {
    const user = await this.userService.findOrCreate(
      provider,
      email,
      name,
      surname,
      photo,
    );

    const code = OAuth2Service.generateCode();

    try {
      this.cacheManager.set(
        OAuth2Service.getOAuthCodeKey(code),
        user.email,
        this.jwtService.accessTime,
      );
    } catch (error) {
      this.logger.error('Failed to cache authorization code:', error.message);
    }

    const accessToken = await this.jwtService.generateToken(
      user,
      TokenTypeEnum.ACCESS,
      domain,
    );

    return {
      accessToken,
    };
  }

  public async token(code: string, userId: number): Promise<IAuthResult> {
    const codeKey = OAuth2Service.getOAuthCodeKey(code);
    const email = await this.cacheManager.get<string>(codeKey);

    if (!email) {
      throw new UnauthorizedException();
    }

    await this.cacheManager.del(codeKey);
    const user = await this.userService.findByEmail(email);

    if (user?.id !== userId) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.generateToken(
      user,
      TokenTypeEnum.ACCESS,
    );

    return {
      user,
      accessToken,
    };
  }

  private getOAuth(provider: OAuthProvidersEnum): OAuthClass {
    const oauth = this[provider];

    if (isNull(oauth)) {
      throw new NotFoundException('Page not found.');
    }

    return oauth;
  }

  private async getAccessToken(
    provider: OAuthProvidersEnum,
    code: string,
    state: string,
  ): Promise<{ accessToken: string; next?: string }> {
    const oauth = this.getOAuth(provider);
    const cachedState = await this.cacheManager.get<{
      provider: OAuthProvidersEnum;
      next?: string;
    }>(OAuth2Service.getOAuthStateKey(state));

    if (!cachedState || provider !== cachedState.provider) {
      throw new UnauthorizedException('Corrupted state.');
    }

    try {
      const accessToken = await oauth.getToken(code);
      return { accessToken, next: cachedState.next };
    } catch (error) {
      this.logger.error('Failed to get oauth token:', error.message);
      throw new UnauthorizedException('Failed to get OAuth token.');
    }
  }
}
