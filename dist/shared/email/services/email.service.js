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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const config_1 = require("../../../config");
const error_constant_1 = require("../../../constants/error.constant");
const moment_1 = __importDefault(require("moment"));
let EmailService = exports.EmailService = EmailService_1 = class EmailService {
    securityConfig;
    httpService;
    mailerService;
    cacheManager;
    logger = new common_1.Logger(EmailService_1.name);
    hunterApiKey;
    constructor(securityConfig, httpService, mailerService, cacheManager) {
        this.securityConfig = securityConfig;
        this.httpService = httpService;
        this.mailerService = mailerService;
        this.cacheManager = cacheManager;
        this.hunterApiKey = this.securityConfig.hunterApiKey;
    }
    async verifyEmail(email) {
        try {
            const { data: { data }, } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${this.hunterApiKey}`));
            return (data.status === 'valid' &&
                data.regexp === true &&
                data.result === 'deliverable');
        }
        catch (error) {
            this.logger.error('Failed to verify email:', error);
            throw new common_1.NotImplementedException(error_constant_1.ErrorEnum.EMAIL_VERIFICATION_FAILED);
        }
    }
    async sendEmail(email, type, subject, content) {
        this.logger.log(`Sending email to ${email}...`);
        if (type === 'text') {
            return this.mailerService.sendMail({
                to: email,
                subject,
                text: content,
            });
        }
        else {
            return this.mailerService.sendMail({
                to: email,
                subject,
                html: content,
            });
        }
    }
    async checkVerificationCodeLimit(email) {
        const cacheKey = `verification-code-limit:${email}`;
        const userInfo = await this.cacheManager.get(cacheKey);
        const currentTime = (0, moment_1.default)().unix();
        if (!userInfo || userInfo.expiry < currentTime) {
            await this.cacheManager.set(cacheKey, {
                count: 1,
                expiry: (0, moment_1.default)().add(5, 'minute').unix(),
            });
            return { hasLimit: false, timeRemaining: 0 };
        }
        const timeRemaining = userInfo.expiry - currentTime;
        if (userInfo.count >= 3) {
            return { hasLimit: true, timeRemaining };
        }
        await this.cacheManager.set(cacheKey, {
            count: userInfo.count + 1,
            expiry: userInfo.expiry,
        });
        return { hasLimit: false, timeRemaining };
    }
    async sendVerificationCode(email, code) {
        const subject = 'Sign in code';
        const template = './verification-code';
        try {
            this.logger.log(`Sending verification email to ${email}...`);
            await this.mailerService.sendMail({
                to: email,
                subject,
                template,
                context: {
                    code,
                },
            });
        }
        catch (error) {
            this.logger.error('Failed to send verification code:', error);
            throw new common_1.NotImplementedException(error_constant_1.ErrorEnum.VERIFICATION_CODE_SEND_FAILED);
        }
        return {
            email,
            code,
        };
    }
};
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.SecurityConfig.KEY)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService,
        mailer_1.MailerService, Function])
], EmailService);
//# sourceMappingURL=email.service.js.map