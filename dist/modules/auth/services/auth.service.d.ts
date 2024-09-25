import { JwtService } from '../../../shared/jwt/services';
import { PrismaService } from '../../../shared/database/services';
import { LocationService } from '../../../shared/location/services';
import { OtpService } from '../../../shared/otp/services';
import { EmailService } from '../../../shared/email/services';
import { UserService } from '../../user/services';
import { IUserAgent } from '../../../utils/user-agent/interfaces';
import type { IAuthResult } from '../common/interfaces';
import { EditMeDto, SignInDto, SignUpDto } from '../dto';
export declare class AuthService {
    private readonly prisma;
    private readonly userService;
    private readonly jwtService;
    private readonly locationService;
    private readonly otpService;
    private readonly emailService;
    constructor(prisma: PrismaService, userService: UserService, jwtService: JwtService, locationService: LocationService, otpService: OtpService, emailService: EmailService);
    signUp({ name, surname, email }: SignUpDto, domain?: string): Promise<{
        user: IUser;
        accessToken: string;
    }>;
    signIn({ email, otp }: SignInDto, domain: string | undefined): Promise<IAuthResult>;
    getMe(userId: number, ip: string, userAgent: IUserAgent): Promise<IUser>;
    editMe(userId: number, { name, surname, photo }: EditMeDto): Promise<IUser>;
    private verifyUserByEmail;
    private setMetaData;
}
