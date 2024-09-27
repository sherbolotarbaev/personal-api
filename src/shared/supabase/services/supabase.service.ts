import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

import type { File } from '@nest-lab/fastify-multer';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { type ISecurityConfig, SecurityConfig } from '../../../config';
import { ErrorEnum } from '../../../constants/error.constant';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);

  private readonly supabase: SupabaseClient;
  private readonly photosBucketPath = '/photos';

  constructor(
    @Inject(SecurityConfig.KEY)
    private readonly securityConfig: ISecurityConfig,
  ) {
    this.supabase = createClient(
      this.securityConfig.supabaseUrl,
      this.securityConfig.supabaseSecretKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
  }

  public async upload(file: File, userId?: number) {
    if (!file) {
      throw new NotFoundException(ErrorEnum.FILE_NOT_FOUND);
    }

    const allowedFileTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/webp',
    ];
    if (!allowedFileTypes.includes(file.mimetype)) {
      throw new BadRequestException(ErrorEnum.INVALID_FILE_TYPE);
    }

    const maxSize = 15 * 1024 * 1024; // 15 MB
    if (file.size > maxSize) {
      throw new BadRequestException(ErrorEnum.FILE_SIZE_EXCEEDS);
    }

    const uniqueFileName = this.generateUniqueFileName(
      file.originalname,
      userId,
    );
    const filePath = await this.uploadFile(
      this.photosBucketPath,
      uniqueFileName,
      file.buffer,
    );
    return this.getUrl(this.photosBucketPath, filePath);
  }

  private async uploadFile(
    uploadPath: string,
    filename: string,
    buffer: Buffer,
  ) {
    try {
      const {
        data: { path },
      } = await this.supabase.storage
        .from(uploadPath)
        .upload(filename, buffer, { upsert: false });
      return path;
    } catch (error) {
      this.logger.error('Failed to upload file to Supabase:', error);
      throw new ServiceUnavailableException(
        'Failed to upload file to Supabase.',
      );
    }
  }
  public async getUrl(bucket: string, filePath: string) {
    if (!filePath.length) return '';
    return `${process.env.SUPABASE_URL}/storage/v1/object/public${bucket}/${filePath}`;
  }

  private generateUniqueFileName(originalFileName: string, userId?: number) {
    const date = new Date().toJSON();
    const fileExtension = originalFileName.split('.').pop();
    return `${userId ? `user-${userId}-` : ''}photo-${date}.${fileExtension}`;
  }
}
