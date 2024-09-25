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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const services_1 = require("../../../shared/jwt/services");
const services_2 = require("../../../shared/database/services");
const services_3 = require("../../../shared/location/services");
const services_4 = require("../../../shared/otp/services");
const services_5 = require("../../../shared/email/services");
const enums_1 = require("../../../shared/jwt/common/enums");
const services_6 = require("../../user/services");
const error_constant_1 = require("../../../constants/error.constant");
const env_1 = require("../../../global/env");
let AuthService = exports.AuthService = class AuthService {
    prisma;
    userService;
    jwtService;
    locationService;
    otpService;
    emailService;
    constructor(prisma, userService, jwtService, locationService, otpService, emailService) {
        this.prisma = prisma;
        this.userService = userService;
        this.jwtService = jwtService;
        this.locationService = locationService;
        this.otpService = otpService;
        this.emailService = emailService;
    }
    async signUp({ name, surname, email }, domain) {
        const isValidEmail = await this.emailService.verifyEmail(email);
        if (!isValidEmail) {
            throw new common_1.BadRequestException(error_constant_1.ErrorEnum.INVALID_EMAIL);
        }
        let user;
        try {
            user = await this.userService.createUser({
                name,
                surname,
                email,
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                throw new common_1.ConflictException(error_constant_1.ErrorEnum.USER_EXISTS);
            }
            throw new common_1.NotImplementedException(error_constant_1.ErrorEnum.SIGN_UP_FAILED);
        }
        const accessToken = await this.jwtService.generateToken(user, enums_1.TokenTypeEnum.ACCESS, domain);
        return {
            user,
            accessToken,
        };
    }
    async signIn({ email, otp }, domain) {
        const user = await this.verifyUserByEmail(email);
        await this.otpService.checkIfOtpMatch(user.email, otp);
        const accessToken = await this.jwtService.generateToken(user, enums_1.TokenTypeEnum.ACCESS, domain);
        return {
            user,
            accessToken,
        };
    }
    async getMe(userId, ip, userAgent) {
        const user = await this.userService.findById(userId);
        if (!env_1.isDev) {
            this.setMetaData(user.id, `${userAgent.ua} / ${userAgent.os.name} (${userAgent.os.version})`, ip);
        }
        return user;
    }
    async editMe(userId, { name, surname, photo }) {
        const updatedUser = await this.userService.updateUser(userId, {
            name,
            surname,
            photo,
        });
        return updatedUser;
    }
    async verifyUserByEmail(email) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(error_constant_1.ErrorEnum.USER_NOT_FOUND);
        }
        if (!user.isActive) {
            throw new common_1.ForbiddenException(error_constant_1.ErrorEnum.USER_DEACTIVATED);
        }
        return user;
    }
    async setMetaData(userId, device, ip) {
        const { city, country, region, timezone } = await this.locationService.getLocation(ip);
        return this.prisma.userMetaData.upsert({
            where: {
                userId,
            },
            create: {
                userId,
                ip,
                city,
                country,
                region,
                timezone,
                lastSeen: new Date(),
                device,
            },
            update: {
                ip,
                city,
                country,
                region,
                timezone,
                lastSeen: new Date(),
                device,
            },
        });
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [services_2.PrismaService,
        services_6.UserService,
        services_1.JwtService,
        services_3.LocationService,
        services_4.OtpService,
        services_5.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map