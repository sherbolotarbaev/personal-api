import type { OAuthProvidersEnum } from '../../oauth2/common/enums';
import { PrismaService } from '../../../shared/database/services';
import { CreateUserDto, UpdateUserDto } from '../dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private UserInclude;
    findAll(): Promise<IUser[] | null>;
    findById(id: number): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findOrCreate(provider: OAuthProvidersEnum, email: string, name: string, surname: string, photo?: string): Promise<IUser>;
    createUser({ name, surname, email, photo, }: CreateUserDto): Promise<IUser>;
    updateUser(userId: number, { name, surname, email, photo }: UpdateUserDto): Promise<IUser>;
    deleteUser(userId: number): Promise<IUser>;
    private formatEmail;
}
