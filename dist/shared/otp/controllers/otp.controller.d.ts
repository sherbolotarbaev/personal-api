import { SendOtpDto } from '../dto';
import { OtpService } from '../services';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    sendOtp(dto: SendOtpDto): Promise<{
        email: string;
        ok: boolean;
    }>;
}
