import { ConfigType } from '@nestjs/config';
export declare const appRegToken = "app";
export declare const AppConfig: (() => {
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
export type IAppConfig = ConfigType<typeof AppConfig>;
