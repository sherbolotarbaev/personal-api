import type { File } from '@nest-lab/fastify-multer';
import { SupabaseService } from '../../../shared/supabase/services';
export declare class UploadService {
    private readonly supabase;
    constructor(supabase: SupabaseService);
    uploadPhoto(userId: number, file: File): Promise<{
        url: string;
    }>;
}
