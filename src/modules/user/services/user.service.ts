import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';

// import type { OAuthProvidersEnum } from '~/modules/oauth2/common/enums';
import type { OAuthProvidersEnum } from '../../oauth2/common/enums'; // fix: vercel issue

// import { PrismaService } from '~/shared/database/services';
import { PrismaService } from '../../../shared/database/services'; // fix: vercel issue

import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private UserInclude: Prisma.UserInclude = {
    metaData: {
      select: {
        ip: true,
        city: true,
        region: true,
        country: true,
        timezone: true,
        lastSeen: true,
        device: true,
      },
    },
  };

  public async findAll(): Promise<IUser[] | null> {
    return this.prisma.user.findMany({
      include: this.UserInclude,
    });
  }

  public async findById(id: number): Promise<IUser | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
      include: this.UserInclude,
    });
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({
      where: {
        email: this.formatEmail(email),
      },
      include: this.UserInclude,
    });
  }

  public async findOrCreate(
    provider: OAuthProvidersEnum,
    email: string,
    name: string,
    surname: string,
  ) {
    const user = await this.findByEmail(email);

    if (user) {
      return user;
    }

    return this.createUser({
      name,
      surname: surname,
      email,
    });
  }

  public async createUser({
    name,
    surname,
    email,
    photo,
  }: CreateUserDto): Promise<IUser> {
    return this.prisma.user.create({
      data: {
        name,
        surname,
        email: this.formatEmail(email),
        photo,
      },
      include: this.UserInclude,
    });
  }

  public async updateUser(
    userId: number,
    { name, surname, email, photo }: UpdateUserDto,
  ): Promise<IUser> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        surname,
        email: email ? this.formatEmail(email) : undefined,
        photo,
      },
      include: this.UserInclude,
    });
  }

  public async deleteUser(userId: number): Promise<IUser> {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
      include: this.UserInclude,
    });
  }

  private formatEmail(email: string): string {
    return email.toLowerCase().trim();
  }
}
