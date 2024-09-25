"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const config_2 = require("../../../config");
const env_1 = require("../../../global/env");
const error_constant_1 = require("../../../constants/error.constant");
const enums_1 = require("../common/enums");
let JwtService = exports.JwtService = JwtService_1 = class JwtService {
    configService;
    nestJwtService;
    logger = new common_1.Logger(JwtService_1.name);
    jwtConfig;
    domain;
    issuer;
    constructor(configService, nestJwtService) {
        this.configService = configService;
        this.nestJwtService = nestJwtService;
        this.jwtConfig = this.configService.get(config_2.jwtRegToken);
        this.domain = !env_1.isDev ? '.sherbolotarbaev.co' : 'localhost';
        this.issuer = 'api.sherbolotarbaev.co';
    }
    get accessTime() {
        return this.jwtConfig.access.expiresIn;
    }
    async generateTokenAsync(payload, options) {
        return this.nestJwtService.sign(payload, options);
    }
    async verifyTokenAsync(token, options) {
        return this.nestJwtService.verify(token, options);
    }
    async throwBadRequest(promise) {
        try {
            return await promise;
        }
        catch (error) {
            if (error instanceof jwt_1.TokenExpiredError) {
                throw new common_1.BadRequestException(error_constant_1.ErrorEnum.TOKEN_EXPIRED);
            }
            if (error instanceof jwt_1.JsonWebTokenError) {
                throw new common_1.BadRequestException(error_constant_1.ErrorEnum.TOKEN_INVALID);
            }
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async generateToken(user, tokenType, domain) {
        const jwtOptions = {
            issuer: this.issuer,
            subject: user.email,
            audience: domain ?? this.domain,
            algorithm: tokenType === enums_1.TokenTypeEnum.ACCESS ? 'RS256' : 'HS256',
        };
        switch (tokenType) {
            case enums_1.TokenTypeEnum.ACCESS:
                const { privateKey, expiresIn: accessTokenExpiration } = this.jwtConfig.access;
                try {
                    return await this.generateTokenAsync({ id: user.id, role: user.role }, {
                        ...jwtOptions,
                        privateKey,
                        expiresIn: accessTokenExpiration,
                    });
                }
                catch (error) {
                    this.logger.error('Failed to generate ACCESS token:', error);
                    throw new common_1.InternalServerErrorException(error.message);
                }
        }
    }
    async verifyToken(token, tokenType, domain) {
        const jwtOptions = {
            issuer: this.issuer,
            audience: domain ?? this.domain,
        };
        switch (tokenType) {
            case enums_1.TokenTypeEnum.ACCESS:
                const { publicKey, expiresIn: accessTokenExpiration } = this.jwtConfig.access;
                try {
                    return this.throwBadRequest(this.verifyTokenAsync(token, {
                        ...jwtOptions,
                        publicKey,
                        maxAge: accessTokenExpiration,
                        algorithms: ['RS256'],
                    }));
                }
                catch (error) {
                    this.logger.error('Failed to validate ACCESS token:', error);
                    throw new common_1.InternalServerErrorException(error.message);
                }
        }
    }
};
exports.JwtService = JwtService = JwtService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService])
], JwtService);
//# sourceMappingURL=jwt.service.js.map