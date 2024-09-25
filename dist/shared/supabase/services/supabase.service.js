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
var SupabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const error_constant_1 = require("../../../constants/error.constant");
const config_1 = require("../../../config");
let SupabaseService = exports.SupabaseService = SupabaseService_1 = class SupabaseService {
    securityConfig;
    logger = new common_1.Logger(SupabaseService_1.name);
    supabase;
    photosBucketPath = '/photos';
    constructor(securityConfig) {
        this.securityConfig = securityConfig;
        this.supabase = (0, supabase_js_1.createClient)(this.securityConfig.supabaseUrl, this.securityConfig.supabaseSecretKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
    }
    async upload(file, userId) {
        if (!file) {
            throw new common_1.NotFoundException(error_constant_1.ErrorEnum.FILE_NOT_FOUND);
        }
        const allowedFileTypes = [
            'image/jpeg',
            'image/png',
            'image/jpg',
            'image/webp',
        ];
        if (!allowedFileTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException(error_constant_1.ErrorEnum.INVALID_FILE_TYPE);
        }
        const maxSize = 15 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new common_1.BadRequestException(error_constant_1.ErrorEnum.FILE_SIZE_EXCEEDS);
        }
        const uniqueFileName = this.generateUniqueFileName(file.originalname, userId);
        const filePath = await this.uploadFile(this.photosBucketPath, uniqueFileName, file.buffer);
        return this.getUrl(this.photosBucketPath, filePath);
    }
    async uploadFile(uploadPath, filename, buffer) {
        try {
            const { data: { path }, } = await this.supabase.storage
                .from(uploadPath)
                .upload(filename, buffer, { upsert: false });
            return path;
        }
        catch (error) {
            this.logger.error('Failed to upload file to Supabase:', error);
            throw new common_1.ServiceUnavailableException('Failed to upload file to Supabase.');
        }
    }
    async getUrl(bucket, filePath) {
        if (!filePath.length)
            return '';
        return `${process.env.SUPABASE_URL}/storage/v1/object/public${bucket}/${filePath}`;
    }
    generateUniqueFileName(originalFileName, userId) {
        const date = new Date().toJSON();
        const fileExtension = originalFileName.split('.').pop();
        return `${userId ? `user-${userId}-` : ''}photo-${date}.${fileExtension}`;
    }
};
exports.SupabaseService = SupabaseService = SupabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.SecurityConfig.KEY)),
    __metadata("design:paramtypes", [Object])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map