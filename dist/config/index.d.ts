import { type IAppConfig, appRegToken } from './app.config';
import { type IJwtConfig, jwtRegToken } from './jwt.config';
import { type ISecurityConfig, securityRegToken } from './security.config';
import { type IOAuthConfig, oauthRegToken } from './oauth.config';
import { type IRedisConfig, redisRegToken } from './redis.config';
import { type IMailerConfig, mailerRegToken } from './mailer.config';
export * from './app.config';
export * from './jwt.config';
export * from './mailer.config';
export * from './oauth.config';
export * from './redis.config';
export * from './security.config';
export interface AllConfigType {
    [appRegToken]: IAppConfig;
    [jwtRegToken]: IJwtConfig;
    [securityRegToken]: ISecurityConfig;
    [oauthRegToken]: IOAuthConfig;
    [redisRegToken]: IRedisConfig;
    [mailerRegToken]: IMailerConfig;
}
export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;
declare const _default: {
    AppConfig: (() => {
        nodeEnvironment: string;
        name: string;
        port: number;
        baseUrl: string;
        frontBaseUrl: string;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        nodeEnvironment: string;
        name: string;
        port: number;
        baseUrl: string;
        frontBaseUrl: string;
    }>;
    JwtConfig: (() => {
        access: {
            publicKey: string;
            privateKey: string;
            expiresIn: number;
        };
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        access: {
            publicKey: string;
            privateKey: string;
            expiresIn: number;
        };
    }>;
    SecurityConfig: (() => {
        googleClientId: string;
        googleClientSecret: string;
        googleCallbackUrl: string;
        githubClientId: string;
        githubClientSecret: string;
        githubCallbackUrl: string;
        cookieSecret: string;
        hunterApiKey: string;
        ipInfoApiKey: string;
        telegramBotApiKey: string;
        telegramBotChatId: string;
        supabaseUrl: string;
        supabaseSecretKey: string;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        googleClientId: string;
        googleClientSecret: string;
        googleCallbackUrl: string;
        githubClientId: string;
        githubClientSecret: string;
        githubCallbackUrl: string;
        cookieSecret: string;
        hunterApiKey: string;
        ipInfoApiKey: string;
        telegramBotApiKey: string;
        telegramBotChatId: string;
        supabaseUrl: string;
        supabaseSecretKey: string;
    }>;
    OAuthConfig: (() => {
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
    RedisConfig: (() => {
        host: string;
        port: number;
        username: string;
        password: string;
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        host: string;
        port: number;
        username: string;
        password: string;
    }>;
    MailerConfig: (() => {
        host: string;
        port: number;
        auth: {
            user: string;
            pass: string;
        };
    }) & import("@nestjs/config").ConfigFactoryKeyHost<{
        host: string;
        port: number;
        auth: {
            user: string;
            pass: string;
        };
    }>;
};
export default _default;
