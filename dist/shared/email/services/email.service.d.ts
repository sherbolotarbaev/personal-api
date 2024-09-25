import { type Cache } from '@nestjs/cache-manager';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import { type ISecurityConfig } from '../../../config';
export declare class EmailService {
    private readonly securityConfig;
    private readonly httpService;
    private readonly mailerService;
    private readonly cacheManager;
    private readonly logger;
    private readonly hunterApiKey;
    constructor(securityConfig: ISecurityConfig, httpService: HttpService, mailerService: MailerService, cacheManager: Cache);
    verifyEmail(email: string): Promise<boolean>;
    sendEmail(email: string, type: 'text' | 'html', subject: string, content: string): Promise<boolean>;
    checkVerificationCodeLimit(email: string): Promise<{
        hasLimit: boolean;
        timeRemaining: number;
    }>;
    sendVerificationCode(email: string, code: string): Promise<{
        email: string;
        code: string;
    }>;
}
