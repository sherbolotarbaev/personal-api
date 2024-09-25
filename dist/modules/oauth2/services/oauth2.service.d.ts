import { HttpService } from '@nestjs/axios';
import { type Cache } from '@nestjs/cache-manager';
import { JwtService } from '../../../shared/jwt/services';
import { UserService } from '../../user/services';
import type { IAuthResult } from '../../auth/common/interfaces';
import { type IAppConfig, type IOAuthConfig } from '../../../config';
import { OAuthProvidersEnum } from '../common/enums';
import type { ICallbackResult, IGitHubEmailsResult } from '../common/interfaces';
import { CallbackQueryDto } from '../dto';
export declare class OAuth2Service {
    private readonly oauthConfig;
    private readonly appConfig;
    private readonly cacheManager;
    private readonly httpService;
    private readonly jwtService;
    private readonly userService;
    private readonly logger;
    private static readonly BASE62;
    private static readonly BIG62;
    private readonly [OAuthProvidersEnum.GOOGLE];
    private readonly [OAuthProvidersEnum.GITHUB];
    constructor(oauthConfig: IOAuthConfig, appConfig: IAppConfig, cacheManager: Cache, httpService: HttpService, jwtService: JwtService, userService: UserService);
    private static setOAuthClass;
    private static getOAuthStateKey;
    private static getOAuthCodeKey;
    private static generateCode;
    getAuthorizationUrl(provider: OAuthProvidersEnum): Promise<string>;
    getUserData<T extends Record<string, any>>(provider: OAuthProvidersEnum, cbQuery: CallbackQueryDto): Promise<T>;
    getGitHubEmails(accessToken: string): Promise<IGitHubEmailsResult[]>;
    callback(provider: OAuthProvidersEnum, email: string, name: string, surname: string, photo?: string): Promise<ICallbackResult>;
    token(code: string, userId: number): Promise<IAuthResult>;
    private getOAuth;
    private getAccessToken;
}
