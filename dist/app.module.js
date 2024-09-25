"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const config_2 = __importDefault(require("./config"));
const modules_1 = require("./modules");
const database_1 = require("./shared/database");
const email_1 = require("./shared/email");
const jwt_1 = require("./shared/jwt");
const location_1 = require("./shared/location");
const otp_1 = require("./shared/otp");
const redis_1 = require("./shared/redis");
const supabase_1 = require("./shared/supabase");
const guards_1 = require("./modules/auth/common/guards");
const app_controller_1 = require("./app.controller");
const oauth2_module_1 = require("./modules/oauth2/oauth2.module");
const guestbook_module_1 = require("./modules/guestbook/guestbook.module");
const ConfigOptions = {
    isGlobal: true,
    expandVariables: true,
    envFilePath: '.env',
    load: [...Object.values(config_2.default)],
};
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(ConfigOptions),
            database_1.DatabaseModule,
            email_1.EmailModule,
            jwt_1.JwtModule,
            location_1.LocationModule,
            otp_1.OtpModule,
            redis_1.RedisModule,
            supabase_1.SupabaseModule,
            modules_1.AuthModule,
            modules_1.UploadModule,
            modules_1.UserModule,
            oauth2_module_1.Oauth2Module,
            guestbook_module_1.GuestbookModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map