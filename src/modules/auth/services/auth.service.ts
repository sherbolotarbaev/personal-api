import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '~/shared/database/services';
import { EmailService } from '~/shared/email/services';
import { TokenTypeEnum } from '~/shared/jwt/common/enums';
import { JwtService } from '~/shared/jwt/services';
import { LocationService } from '~/shared/location/services';
import { OtpService } from '~/shared/otp/services';

import { UserService } from '~/modules/user/services';

import { ErrorEnum } from '~/constants/error.constant';
import { IUserAgent } from '~/utils/user-agent/interfaces';
import type { IAuthResult } from '../common/interfaces';

import { isDev } from '~/global/env';

import { EditMeDto, SignInDto, SignUpDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly locationService: LocationService,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
  ) {}

  public async signUp(
    { name, surname, email }: SignUpDto,
    domain?: string,
  ): Promise<{
    user: IUser;
    accessToken: string;
  }> {
    const isValidEmail = await this.emailService.verifyEmail(email);

    if (!isValidEmail) {
      throw new BadRequestException(ErrorEnum.INVALID_EMAIL);
    }

    let user: IUser;
    try {
      user = await this.userService.createUser({
        name,
        surname,
        email,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ConflictException(ErrorEnum.USER_EXISTS);
      }
      throw new NotImplementedException(ErrorEnum.SIGN_UP_FAILED);
    }

    const accessToken = await this.jwtService.generateToken(
      user,
      TokenTypeEnum.ACCESS,
      domain,
    );

    return {
      user,
      accessToken,
    };
  }

  public async signIn(
    { email, otp }: SignInDto,
    domain: string | undefined,
  ): Promise<IAuthResult> {
    const user = await this.verifyUserByEmail(email);

    await this.otpService.checkIfOtpMatch(user.email, otp);

    const accessToken = await this.jwtService.generateToken(
      user,
      TokenTypeEnum.ACCESS,
      domain,
    );

    return {
      user,
      accessToken,
    };
  }

  public async getMe(
    userId: number,
    ip: string,
    userAgent: IUserAgent,
  ): Promise<IUser> {
    const user = await this.userService.findById(userId);

    if (!isDev) {
      this.setMetaData(
        user.id,
        `${userAgent.ua} / ${userAgent.os.name} (${userAgent.os.version})`,
        ip,
      );
    }

    return user;
  }

  public async editMe(
    userId: number,
    { name, surname, photo }: EditMeDto,
  ): Promise<IUser> {
    const updatedUser = await this.userService.updateUser(userId, {
      name,
      surname,
      photo,
    });
    return updatedUser;
  }

  private async verifyUserByEmail(email: string): Promise<IUser> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(ErrorEnum.USER_NOT_FOUND);
    }

    if (!user.isActive) {
      throw new ForbiddenException(ErrorEnum.USER_DEACTIVATED);
    }

    return user;
  }

  private async setMetaData(
    userId: number,
    device: string,
    ip: string,
  ): Promise<IUserMetaData> {
    const { city, country, region, timezone } =
      await this.locationService.getLocation(ip);

    return this.prisma.userMetaData.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        ip,
        city,
        country,
        region,
        timezone,
        lastSeen: new Date(),
        device,
      },
      update: {
        ip,
        city,
        country,
        region,
        timezone,
        lastSeen: new Date(),
        device,
      },
    });
  }
}
