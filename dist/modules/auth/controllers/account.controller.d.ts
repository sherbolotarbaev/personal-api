import type { FastifyReply, FastifyRequest } from 'fastify';
import { IUserAgent } from '../../../utils/user-agent/interfaces';
import { EditMeDto } from '../dto';
import { AuthService } from '../services';
export declare class AccountController {
    private readonly authService;
    constructor(authService: AuthService);
    getMe({ id: userId }: IUser, ip: string, userAgent: IUserAgent): Promise<IUser>;
    editMe({ id: userId }: IUser, dto: EditMeDto): Promise<IUser>;
    logout(request: FastifyRequest, response: FastifyReply): Promise<never>;
}
