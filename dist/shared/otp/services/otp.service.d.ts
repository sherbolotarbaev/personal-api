import { type Cache } from '@nestjs/cache-manager';
import { UserService } from '../../../modules/user/services';
import { EmailService } from '../../email/services';
import { SendOtpDto } from '../dto';
export declare class OtpService {
    private readonly emailService;
    private readonly userService;
    private readonly cacheManager;
    constructor(emailService: EmailService, userService: UserService, cacheManager: Cache);
    checkIfOtpMatch(email: string, otp: string): Promise<void>;
    sendOtp({ email }: SendOtpDto): Promise<{
        email: string;
        ok: boolean;
    }>;
    private generateOtp;
    private getExpiration;
    private checkExpiration;
}
