"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oauth2Module = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const services_1 = require("../user/services");
const controllers_1 = require("./controllers");
const services_2 = require("./services");
let Oauth2Module = exports.Oauth2Module = class Oauth2Module {
};
exports.Oauth2Module = Oauth2Module = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [controllers_1.OAuth2Controller],
        providers: [services_2.OAuth2Service, services_1.UserService],
    })
], Oauth2Module);
//# sourceMappingURL=oauth2.module.js.map