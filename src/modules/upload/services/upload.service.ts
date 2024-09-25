import type { File } from '@nest-lab/fastify-multer';
import { Injectable } from '@nestjs/common';

import { SupabaseService } from '~/shared/supabase/services';

@Injectable()
export class UploadService {
  constructor(private readonly supabase: SupabaseService) {}

  public async uploadPhoto(
    userId: number,
    file: File,
  ): Promise<{ url: string }> {
    const url = await this.supabase.upload(file, userId);
    return {
      url,
    };
  }
}
