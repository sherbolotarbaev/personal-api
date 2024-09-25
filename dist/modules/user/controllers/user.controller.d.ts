import { UserService } from '../services';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<IUser[]>;
}
