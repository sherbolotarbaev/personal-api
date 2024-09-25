import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { TokenTypeEnum } from '../common/enums';
import { IAccessToken } from '../common/interfaces';
export declare class JwtService {
    private readonly configService;
    private readonly nestJwtService;
    private readonly logger;
    private readonly jwtConfig;
    private readonly domain;
    private readonly issuer;
    constructor(configService: ConfigService, nestJwtService: NestJwtService);
    get accessTime(): number;
    private generateTokenAsync;
    private verifyTokenAsync;
    private throwBadRequest;
    generateToken(user: IUser, tokenType: TokenTypeEnum, domain?: string | null): Promise<string>;
    verifyToken<T extends IAccessToken>(token: string, tokenType: TokenTypeEnum, domain?: string | null): Promise<T>;
}
