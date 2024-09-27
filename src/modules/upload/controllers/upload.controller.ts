import { type File, FileInterceptor } from '@nest-lab/fastify-multer';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { AuthUser } from '../../auth/common/decorators';

import { UploadService } from '../services';

@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @AuthUser() { id: userId }: IUser,
    @UploadedFile() file: File,
  ) {
    return this.uploadService.uploadPhoto(userId, file);
  }
}
