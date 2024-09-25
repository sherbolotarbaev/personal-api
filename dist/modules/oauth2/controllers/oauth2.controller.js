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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth2Controller = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../auth/common/decorators");
const cookie_1 = require("../../../utils/cookie");
const config_1 = require("../../../config");
const enums_1 = require("../common/enums");
const guards_1 = require("../common/guards");
const dto_1 = require("../dto");
const services_1 = require("../services");
let OAuth2Controller = exports.OAuth2Controller = class OAuth2Controller {
    oauth2Service;
    appConfig;
    constructor(oauth2Service, appConfig) {
        this.oauth2Service = oauth2Service;
        this.appConfig = appConfig;
    }
    async google(response) {
        return this.startRedirect(response, enums_1.OAuthProvidersEnum.GOOGLE);
    }
    async googleCallback(cbQuery, request, response) {
        const provider = enums_1.OAuthProvidersEnum.GOOGLE;
        const { given_name: name, family_name: surname, email, picture, } = await this.oauth2Service.getUserData(provider, cbQuery);
        return this.callbackAndRedirect(request, response, provider, email, name, surname, picture.replace('s96-c', 's384-c'));
    }
    async github(response) {
        return this.startRedirect(response, enums_1.OAuthProvidersEnum.GITHUB);
    }
    async githubCallback(cbQuery, request, response) {
        const provider = enums_1.OAuthProvidersEnum.GITHUB;
        const { name, login, email, avatar_url } = await this.oauth2Service.getUserData(provider, cbQuery);
        return this.callbackAndRedirect(request, response, provider, email, name?.split(' ')[0] || login, name?.split(' ')[1] || ' ', avatar_url);
    }
    async startRedirect(response, provider) {
        const url = await this.oauth2Service.getAuthorizationUrl(provider);
        return response.status(common_1.HttpStatus.TEMPORARY_REDIRECT).redirect(url);
    }
    async callbackAndRedirect(request, response, provider, email, name, surname, photo) {
        const { accessToken } = await this.oauth2Service.callback(provider, email, name, surname, photo);
        (0, cookie_1.setCookie)(request, response, 'session', accessToken);
        return response
            .status(common_1.HttpStatus.FOUND)
            .redirect(this.appConfig.frontBaseUrl);
    }
};
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OAuth2Controller.prototype, "google", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)((0, guards_1.OAuthFlagGuard)(enums_1.OAuthProvidersEnum.GOOGLE)),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CallbackQueryDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OAuth2Controller.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Get)('github'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OAuth2Controller.prototype, "github", null);
__decorate([
    (0, common_1.Get)('github/callback'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)((0, guards_1.OAuthFlagGuard)(enums_1.OAuthProvidersEnum.GITHUB)),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CallbackQueryDto, Object, Object]),
    __metadata("design:returntype", Promise)
], OAuth2Controller.prototype, "githubCallback", null);
exports.OAuth2Controller = OAuth2Controller = __decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Controller)('oauth2'),
    __param(1, (0, common_1.Inject)(config_1.AppConfig.KEY)),
    __metadata("design:paramtypes", [services_1.OAuth2Service, Object])
], OAuth2Controller);
//# sourceMappingURL=oauth2.controller.js.map