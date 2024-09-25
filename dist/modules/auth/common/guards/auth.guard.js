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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const enums_1 = require("../../../../shared/jwt/common/enums");
const services_1 = require("../../../../shared/jwt/services");
const public_decorator_1 = require("../decorators/public.decorator");
let AuthGuard = exports.AuthGuard = class AuthGuard {
    reflector;
    jwtService;
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const activate = await this.setHttpHeader(context.switchToHttp().getRequest(), isPublic);
        if (!activate) {
            throw new common_1.UnauthorizedException();
        }
        return activate;
    }
    async setHttpHeader(request, isPublic) {
        const { session } = request.cookies;
        if (session === undefined || !session.length) {
            return isPublic;
        }
        const domain = this.extractDomain(request.hostname.split(':')[0]);
        try {
            const { id, role } = await this.jwtService.verifyToken(session, enums_1.TokenTypeEnum.ACCESS, domain);
            request.user = {
                id,
                role,
            };
            return true;
        }
        catch {
            return isPublic;
        }
    }
    extractDomain(hostname) {
        if (hostname === '127.0.0.1')
            return hostname;
        const parts = hostname.split('.').slice(-2);
        return parts.join('.');
    }
};
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        services_1.JwtService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map