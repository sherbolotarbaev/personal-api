import { ConfigType } from '@nestjs/config';
export declare const redisRegToken = "redis";
export declare const RedisConfig: (() => {
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
export type IRedisConfig = ConfigType<typeof RedisConfig>;
