import { SignInDto, SignUpDto } from '../dto';
import { AuthService } from '../services';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(dto: SignUpDto, domain: string | undefined): Promise<{
        user: IUser;
        accessToken: string;
    }>;
    signIn(dto: SignInDto, domain: string | undefined): Promise<import("../common/interfaces").IAuthResult>;
}
