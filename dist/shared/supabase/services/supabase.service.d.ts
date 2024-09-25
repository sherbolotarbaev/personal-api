import type { File } from '@nest-lab/fastify-multer';
import { type ISecurityConfig } from '../../../config';
export declare class SupabaseService {
    private readonly securityConfig;
    private readonly logger;
    private readonly supabase;
    private readonly photosBucketPath;
    constructor(securityConfig: ISecurityConfig);
    upload(file: File, userId?: number): Promise<string>;
    private uploadFile;
    getUrl(bucket: string, filePath: string): Promise<string>;
    private generateUniqueFileName;
}
