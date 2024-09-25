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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../../../shared/database/services");
let UserService = exports.UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    UserInclude = {
        metaData: {
            select: {
                ip: true,
                city: true,
                region: true,
                country: true,
                timezone: true,
                lastSeen: true,
                device: true,
            },
        },
    };
    async findAll() {
        return this.prisma.user.findMany({
            include: this.UserInclude,
        });
    }
    async findById(id) {
        return this.prisma.user.findFirst({
            where: {
                id,
            },
            include: this.UserInclude,
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: {
                email: this.formatEmail(email),
            },
            include: this.UserInclude,
        });
    }
    async findOrCreate(provider, email, name, surname, photo) {
        const user = await this.findByEmail(email);
        if (user) {
            return user;
        }
        return this.createUser({
            name,
            surname,
            email: this.formatEmail(email),
            photo: photo ? photo : `https://avatar.vercel.sh/${email}`,
        });
    }
    async createUser({ name, surname, email, photo, }) {
        return this.prisma.user.create({
            data: {
                name,
                surname,
                email: this.formatEmail(email),
                photo,
            },
            include: this.UserInclude,
        });
    }
    async updateUser(userId, { name, surname, email, photo }) {
        return this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name,
                surname,
                email: email ? this.formatEmail(email) : undefined,
                photo,
            },
            include: this.UserInclude,
        });
    }
    async deleteUser(userId) {
        return this.prisma.user.delete({
            where: {
                id: userId,
            },
            include: this.UserInclude,
        });
    }
    formatEmail(email) {
        return email.toLowerCase().trim();
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [services_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map