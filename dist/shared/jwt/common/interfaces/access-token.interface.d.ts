import type { UserRole } from '@prisma/client';
import type { ITokenBase } from '.';
export interface IAccessPayload {
    readonly id: number;
    readonly role: UserRole;
}
export interface IAccessToken extends IAccessPayload, ITokenBase {
}
