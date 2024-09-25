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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OAuth2Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Service = void 0;
const axios_1 = require("@nestjs/axios");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const services_1 = require("../../../shared/jwt/services");
const enums_1 = require("../../../shared/jwt/common/enums");
const services_2 = require("../../user/services");
const validation_1 = require("../../../utils/validation");
const config_1 = require("../../../config");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
const classes_1 = require("../common/classes");
const enums_2 = require("../common/enums");
let OAuth2Service = exports.OAuth2Service = class OAuth2Service {
    static { OAuth2Service_1 = this; }
    oauthConfig;
    appConfig;
    cacheManager;
    httpService;
    jwtService;
    userService;
    logger = new common_1.Logger(OAuth2Service_1.name);
    static BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    static BIG62 = BigInt(OAuth2Service_1.BASE62.length);
    [enums_2.OAuthProvidersEnum.GOOGLE];
    [enums_2.OAuthProvidersEnum.GITHUB];
    constructor(oauthConfig, appConfig, cacheManager, httpService, jwtService, userService) {
        this.oauthConfig = oauthConfig;
        this.appConfig = appConfig;
        this.cacheManager = cacheManager;
        this.httpService = httpService;
        this.jwtService = jwtService;
        this.userService = userService;
        this[enums_2.OAuthProvidersEnum.GOOGLE] = OAuth2Service_1.setOAuthClass(enums_2.OAuthProvidersEnum.GOOGLE, oauthConfig, this.appConfig.baseUrl);
        this[enums_2.OAuthProvidersEnum.GITHUB] = OAuth2Service_1.setOAuthClass(enums_2.OAuthProvidersEnum.GITHUB, oauthConfig, this.appConfig.baseUrl);
    }
    static setOAuthClass(provider, oauthConfig, url) {
        const client = oauthConfig[provider];
        if ((0, validation_1.isNull)(client)) {
            return null;
        }
        return new classes_1.OAuthClass(provider, client, url);
    }
    static getOAuthStateKey(state) {
        return `oauth_state:${state}`;
    }
    static getOAuthCodeKey(code) {
        return `oauth_code:${code}`;
    }
    static generateCode() {
        let num = BigInt('0x' + (0, uuid_1.v4)().replace(/-/g, ''));
        let code = '';
        while (num > 0) {
            const remainder = Number(num % OAuth2Service_1.BIG62);
            code = OAuth2Service_1.BASE62[remainder] + code;
            num = num / OAuth2Service_1.BIG62;
        }
        return code.padStart(22, '0');
    }
    async getAuthorizationUrl(provider) {
        const [url, state] = this.getOAuth(provider).authorizationUrl;
        try {
            await this.cacheManager.set(OAuth2Service_1.getOAuthStateKey(state), provider, 120000);
        }
        catch (error) {
            this.logger.error('Failed to cache authorization state:', error.message);
        }
        return url;
    }
    async getUserData(provider, cbQuery) {
        const { code, state } = cbQuery;
        const accessToken = await this.getAccessToken(provider, code, state);
        const userReq = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(this.getOAuth(provider).dataUrl, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            throw new common_1.UnauthorizedException(error.response.data);
        })));
        if (userReq.status !== common_1.HttpStatus.OK) {
            throw new common_1.UnauthorizedException();
        }
        if (!userReq.data.email && provider === enums_2.OAuthProvidersEnum.GITHUB) {
            const emails = await this.getGitHubEmails(accessToken);
            const primaryEmail = emails.find((e) => e.primary && e.verified);
            userReq.data.email = primaryEmail?.email;
        }
        return userReq.data;
    }
    async getGitHubEmails(accessToken) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://api.github.com/user/emails', {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }));
        return response.data;
    }
    async callback(provider, email, name, surname, photo) {
        const user = await this.userService.findOrCreate(provider, email, name, surname, photo);
        const code = OAuth2Service_1.generateCode();
        try {
            this.cacheManager.set(OAuth2Service_1.getOAuthCodeKey(code), user.email, this.jwtService.accessTime);
        }
        catch (error) {
            this.logger.error('Failed to cache authorization code:', error.message);
        }
        const accessToken = await this.jwtService.generateToken(user, enums_1.TokenTypeEnum.ACCESS);
        return {
            accessToken,
        };
    }
    async token(code, userId) {
        const codeKey = OAuth2Service_1.getOAuthCodeKey(code);
        const email = await this.cacheManager.get(codeKey);
        if (!email) {
            throw new common_1.UnauthorizedException();
        }
        await this.cacheManager.del(codeKey);
        const user = await this.userService.findByEmail(email);
        if (user?.id !== userId) {
            throw new common_1.UnauthorizedException();
        }
        const accessToken = await this.jwtService.generateToken(user, enums_1.TokenTypeEnum.ACCESS);
        return {
            user,
            accessToken,
        };
    }
    getOAuth(provider) {
        const oauth = this[provider];
        if ((0, validation_1.isNull)(oauth)) {
            throw new common_1.NotFoundException('Page not found.');
        }
        return oauth;
    }
    async getAccessToken(provider, code, state) {
        const oauth = this.getOAuth(provider);
        const stateProvider = await this.cacheManager.get(OAuth2Service_1.getOAuthStateKey(state));
        if (!stateProvider || provider !== stateProvider) {
            throw new common_1.UnauthorizedException('Corrupted state.');
        }
        try {
            return await oauth.getToken(code);
        }
        catch (error) {
            this.logger.error('Failed to get oauth token:', error.message);
        }
    }
};
exports.OAuth2Service = OAuth2Service = OAuth2Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.OAuthConfig.KEY)),
    __param(1, (0, common_1.Inject)(config_1.AppConfig.KEY)),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, Object, Function, axios_1.HttpService,
        services_1.JwtService,
        services_2.UserService])
], OAuth2Service);
//# sourceMappingURL=oauth2.service.js.map