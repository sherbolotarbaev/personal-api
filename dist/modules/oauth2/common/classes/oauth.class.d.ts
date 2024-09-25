import { OAuthProvidersEnum } from '../enums';
import type { IClient } from '../interfaces';
export declare class OAuthClass {
    private readonly provider;
    private readonly client;
    private readonly url;
    private static readonly [OAuthProvidersEnum.GOOGLE];
    private static readonly [OAuthProvidersEnum.GITHUB];
    private static userDataUrls;
    private readonly code;
    private readonly authorization;
    private readonly userDataUrl;
    constructor(provider: OAuthProvidersEnum, client: IClient, url: string);
    get dataUrl(): string;
    get authorizationUrl(): [string, string];
    private static genAuthorization;
    getToken(code: string): Promise<string>;
}
