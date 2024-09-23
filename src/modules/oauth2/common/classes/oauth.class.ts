import { randomBytes } from 'crypto';
import { AuthorizationCode } from 'simple-oauth2';

import { OAuthProvidersEnum } from '../enums';
import type { IAuthParams, IClient, IProvider } from '../interfaces';

export class OAuthClass {
  private static readonly [OAuthProvidersEnum.GOOGLE]: IProvider = {
    authorizeHost: 'https://accounts.google.com',
    authorizePath: '/o/oauth2/v2/auth',
    tokenHost: 'https://www.googleapis.com',
    tokenPath: '/oauth2/v4/token',
  };
  private static readonly [OAuthProvidersEnum.GITHUB]: IProvider = {
    authorizeHost: 'https://github.com',
    authorizePath: '/login/oauth/authorize',
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
  };
  private static userDataUrls: Record<OAuthProvidersEnum, string> = {
    [OAuthProvidersEnum.GOOGLE]:
      'https://www.googleapis.com/oauth2/v3/userinfo',
    [OAuthProvidersEnum.GITHUB]: 'https://api.github.com/user',
    [OAuthProvidersEnum.LOCAL]: '',
  };

  private readonly code: AuthorizationCode;
  private readonly authorization: IAuthParams;
  private readonly userDataUrl: string;

  constructor(
    private readonly provider: OAuthProvidersEnum,
    private readonly client: IClient,
    private readonly url: string,
  ) {
    if (provider === OAuthProvidersEnum.LOCAL) {
      throw new Error('Invalid provider');
    }

    this.code = new AuthorizationCode({
      client,
      auth: OAuthClass[provider],
    });
    this.authorization = OAuthClass.genAuthorization(provider, url);
    this.userDataUrl = OAuthClass.userDataUrls[provider];
  }

  public get dataUrl(): string {
    return this.userDataUrl;
  }

  public get authorizationUrl(): [string, string] {
    const state = randomBytes(16).toString('hex');
    return [this.code.authorizeURL({ ...this.authorization, state }), state];
  }

  private static genAuthorization(
    provider: OAuthProvidersEnum,
    url: string,
  ): IAuthParams {
    const redirect_uri = `${url}/oauth2/${provider}/callback`;

    switch (provider) {
      case OAuthProvidersEnum.GOOGLE:
        return {
          redirect_uri,
          scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
          ],
        };
      case OAuthProvidersEnum.GITHUB:
        return {
          redirect_uri,
          scope: ['user:email', 'read:user'],
        };
    }
  }

  public async getToken(code: string): Promise<string> {
    const result = await this.code.getToken({
      code,
      redirect_uri: this.authorization.redirect_uri,
      scope: this.authorization.scope,
    });
    return result.token.access_token as string;
  }
}
