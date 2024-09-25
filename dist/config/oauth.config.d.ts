import { ConfigType } from '@nestjs/config';
export declare const oauthRegToken = "oauth";
export declare const OAuthConfig: (() => {
    google: {
        id: string;
        secret: string;
    };
    github: {
        id: string;
        secret: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    google: {
        id: string;
        secret: string;
    };
    github: {
        id: string;
        secret: string;
    };
}>;
export type IOAuthConfig = ConfigType<typeof OAuthConfig>;
