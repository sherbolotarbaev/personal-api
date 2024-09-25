import { ConfigType } from '@nestjs/config';
export declare const jwtRegToken = "jwt";
export declare const JwtConfig: (() => {
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
export type IJwtConfig = ConfigType<typeof JwtConfig>;
