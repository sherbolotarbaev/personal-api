"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModule = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../../modules/user/services");
const controllers_1 = require("./controllers");
const services_2 = require("./services");
let OtpModule = exports.OtpModule = class OtpModule {
};
exports.OtpModule = OtpModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [controllers_1.OtpController],
        providers: [services_2.OtpService, services_1.UserService],
        exports: [services_2.OtpService],
    })
], OtpModule);
//# sourceMappingURL=otp.module.js.map