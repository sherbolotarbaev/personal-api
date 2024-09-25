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
exports.OAuthFlagGuard = void 0;
const common_1 = require("@nestjs/common");
const validation_1 = require("../../../../utils/validation");
const config_1 = require("../../../../config");
const OAuthFlagGuard = (provider) => {
    let OAuthFlagGuardClass = class OAuthFlagGuardClass {
        oauthConfig;
        constructor(oauthConfig) {
            this.oauthConfig = oauthConfig;
        }
        canActivate(context) {
            const client = this.oauthConfig[provider];
            if ((0, validation_1.isNull)(client)) {
                const request = context.switchToHttp().getRequest();
                throw new common_1.NotFoundException(`Cannot ${request.method} ${request.url}.`);
            }
            return true;
        }
    };
    OAuthFlagGuardClass = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)(config_1.OAuthConfig.KEY)),
        __metadata("design:paramtypes", [Object])
    ], OAuthFlagGuardClass);
    return (0, common_1.mixin)(OAuthFlagGuardClass);
};
exports.OAuthFlagGuard = OAuthFlagGuard;
//# sourceMappingURL=oauth-flag.guard.js.map