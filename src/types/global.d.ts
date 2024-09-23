import { UserRole } from '@prisma/client';

declare global {
  interface IUser {
    readonly id: number;
    readonly role: UserRole;
    readonly email: string;
    readonly name: string;
    readonly surname: string;
    readonly photo?: string;
    readonly isActive: boolean;
    readonly isVerified: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    readonly metaData: UserMetaData;
  }

  interface IUserMetaData {
    readonly ip: string;
    readonly city?: string;
    readonly region?: string;
    readonly country?: string;
    readonly timezone?: string;
    readonly lastSeen: Date;
    readonly device?: string;
  }

  interface IGuestBookMessageAuthor {
    readonly name: string;
    readonly email: string;
    readonly photo: string;
    readonly isVerified: boolean;
  }

  interface IGuestBookMessage {
    readonly id: number;
    readonly body: string;
    readonly isEdited: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly authorId: number;
    readonly author: IGuestBookMessageAuthor;
    readonly reactions: IGuestBookMessageReaction[];
  }

  interface IPostView {
    readonly slug: string;
    readonly viewsCount: number;
    readonly likesCount: number;
  }

  interface IPostLike {
    readonly userId: number;
    readonly slug: string;
  }

  interface IGuestBookMessageReaction {
    readonly userId: number;
    readonly messageId: number;
    readonly emoji: string;
  }
}
export = {};
