import { type File } from '@nest-lab/fastify-multer';
import { UploadService } from '../services';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadPhoto({ id: userId }: IUser, file: File): Promise<{
        url: string;
    }>;
}
