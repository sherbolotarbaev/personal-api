"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const node_path_1 = require("node:path");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const axios_1 = require("@nestjs/axios");
const config_2 = require("../../config");
const services_1 = require("./services");
const MailerOptions = {
    useFactory: (configService) => {
        const appConfig = configService.get(config_2.appRegToken);
        const mailerConfig = configService.get(config_2.mailerRegToken);
        return {
            transport: mailerConfig,
            defaults: {
                from: {
                    name: appConfig.name,
                    address: mailerConfig.auth.user,
                },
            },
            template: {
                dir: (0, node_path_1.join)(__dirname, '..', '..', 'templates'),
                adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        };
    },
    inject: [config_1.ConfigService],
};
let EmailModule = exports.EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [mailer_1.MailerModule.forRootAsync(MailerOptions), axios_1.HttpModule],
        providers: [services_1.EmailService],
        exports: [services_1.EmailService],
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map