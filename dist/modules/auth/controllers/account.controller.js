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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../common/decorators");
const ip_decorator_1 = require("../../../common/decorators/ip.decorator");
const user_agent_decorator_1 = require("../../../common/decorators/user-agent.decorator");
const cookie_1 = require("../../../utils/cookie");
const dto_1 = require("../dto");
const services_1 = require("../services");
let AccountController = exports.AccountController = class AccountController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async getMe({ id: userId }, ip, userAgent) {
        return this.authService.getMe(userId, ip, userAgent);
    }
    async editMe({ id: userId }, dto) {
        return this.authService.editMe(userId, dto);
    }
    async logout(request, response) {
        (0, cookie_1.setCookie)(request, response, 'session', undefined);
        return response.status(200).redirect('/');
    }
};
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, ip_decorator_1.Ip)()),
    __param(2, (0, user_agent_decorator_1.UserAgent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.EditMeDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "editMe", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "logout", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [services_1.AuthService])
], AccountController);
//# sourceMappingURL=account.controller.js.map