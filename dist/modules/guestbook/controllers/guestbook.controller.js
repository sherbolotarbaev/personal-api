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
exports.GuestbookController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../auth/common/decorators");
const dto_1 = require("../dto");
const services_1 = require("../services");
let GuestbookController = exports.GuestbookController = class GuestbookController {
    guestbookService;
    constructor(guestbookService) {
        this.guestbookService = guestbookService;
    }
    async newMessage(dto, { id: userId }) {
        return this.guestbookService.newMessage(dto, userId);
    }
    async editMessage(id, dto, { id: userId }) {
        return this.guestbookService.editMessage(id, dto, userId);
    }
    async deleteMessage(id, { id: userId }) {
        return this.guestbookService.deleteMessage(id, userId);
    }
    async getMessages(queryDto) {
        return this.guestbookService.getMessages(queryDto);
    }
    async addReaction(id, dto, { id: userId }) {
        return this.guestbookService.addReaction(id, dto, userId);
    }
    async removeReaction(id, dto, { id: userId }) {
        return this.guestbookService.removeReaction(id, dto, userId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.MessageDto, Object]),
    __metadata("design:returntype", Promise)
], GuestbookController.prototype, "newMessage", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.MessageDto, Object]),
    __metadata("design:returntype", Promise)
], GuestbookController.prototype, "editMessage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GuestbookController.prototype, "deleteMessage", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GetMessagesDto]),
    __metadata("design:returntype", Promise)
], GuestbookController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)(':id/reactions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.ReactionDto, Object]),
    __metadata("design:returntype", Promise)
], GuestbookController.prototype, "addReaction", null);
__decorate([
    (0, common_1.Delete)(':id/reactions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.ReactionDto, Object]),
    __metadata("design:returntype", Promise)
], GuestbookController.prototype, "removeReaction", null);
exports.GuestbookController = GuestbookController = __decorate([
    (0, common_1.Controller)('guestbook'),
    __metadata("design:paramtypes", [services_1.GuestbookService])
], GuestbookController);
//# sourceMappingURL=guestbook.controller.js.map