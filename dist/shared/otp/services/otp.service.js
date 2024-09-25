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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const moment_1 = __importDefault(require("moment"));
const error_constant_1 = require("../../../constants/error.constant");
const services_1 = require("../../../modules/user/services");
const services_2 = require("../../email/services");
const too_many_requests_exception_1 = require("../../../common/exceptions/too-many-requests.exception");
let OtpService = exports.OtpService = class OtpService {
    emailService;
    userService;
    cacheManager;
    constructor(emailService, userService, cacheManager) {
        this.emailService = emailService;
        this.userService = userService;
        this.cacheManager = cacheManager;
    }
    async checkIfOtpMatch(email, otp) {
        const cacheKey = `otp-${email}`;
        const cachedOTP = await this.cacheManager.get(cacheKey);
        if (!cachedOTP) {
            throw new common_1.BadRequestException(error_constant_1.ErrorEnum.VERIFICATION_NOT_FOUND);
        }
        const { hasLimit, timeRemaining } = await this.emailService.checkVerificationCodeLimit(email);
        if (hasLimit && timeRemaining > 0) {
            const minutesRemaining = Math.ceil(timeRemaining / 60);
            const minuteText = minutesRemaining === 1 ? 'minute' : 'minutes';
            throw new too_many_requests_exception_1.TooManyRequestsException(`Please try again in ${minutesRemaining} ${minuteText}.`, timeRemaining);
        }
        const otpMatch = await (0, bcrypt_1.compare)(otp, cachedOTP.otpHash);
        if (!otpMatch) {
            throw new common_1.BadRequestException(error_constant_1.ErrorEnum.VERIFICATION_CODE_INVALID);
        }
        if (this.checkExpiration(cachedOTP.expiresAt)) {
            throw new common_1.BadRequestException(error_constant_1.ErrorEnum.VERIFICATION_CODE_EXPIRED);
        }
        await this.cacheManager.del(cacheKey);
    }
    async sendOtp({ email }) {
        const user = await this.userService.findByEmail(email);
        if (!user || !user.isActive) {
            return {
                email,
                ok: false,
            };
        }
        const otp = this.generateOtp();
        const otpHash = await (0, bcrypt_1.hash)(otp, 10);
        const expiresAt = this.getExpiration();
        const cacheKey = `otp-${user.email}`;
        const cachePayload = {
            otpHash,
            expiresAt,
        };
        Promise.all([
            this.cacheManager.set(cacheKey, cachePayload),
            this.emailService.sendVerificationCode(user.email, otp),
        ]);
        return {
            email: user.email,
            ok: true,
        };
    }
    generateOtp() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    }
    getExpiration() {
        return (0, moment_1.default)().add(10, 'minutes').toDate();
    }
    checkExpiration(expiresAt) {
        return moment_1.default.utc(expiresAt).isBefore((0, moment_1.default)().utc());
    }
};
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [services_2.EmailService,
        services_1.UserService, Function])
], OtpService);
//# sourceMappingURL=otp.service.js.map