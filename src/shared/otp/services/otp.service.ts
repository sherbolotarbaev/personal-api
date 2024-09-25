import { type Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { compare, hash } from 'bcrypt';
import moment from 'moment';

import { ErrorEnum } from '~/constants/error.constant';
import { UserService } from '~/modules/user/services';
import { EmailService } from '~/shared/email/services';

import { TooManyRequestsException } from '~/common/exceptions/too-many-requests.exception';
import type { IOtpCachePayload } from '../common/interfaces';

import { SendOtpDto } from '../dto';

@Injectable()
export class OtpService {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  public async checkIfOtpMatch(email: string, otp: string): Promise<void> {
    const cacheKey = `otp-${email}`;
    const cachedOTP: IOtpCachePayload = await this.cacheManager.get(cacheKey);

    if (!cachedOTP) {
      throw new BadRequestException(ErrorEnum.VERIFICATION_NOT_FOUND);
    }

    const { hasLimit, timeRemaining } =
      await this.emailService.checkVerificationCodeLimit(email);

    if (hasLimit && timeRemaining > 0) {
      const minutesRemaining = Math.ceil(timeRemaining / 60);
      const minuteText = minutesRemaining === 1 ? 'minute' : 'minutes';

      throw new TooManyRequestsException(
        `Please try again in ${minutesRemaining} ${minuteText}.`,
        timeRemaining,
      );
    }

    const otpMatch = await compare(otp, cachedOTP.otpHash);
    if (!otpMatch) {
      throw new BadRequestException(ErrorEnum.VERIFICATION_CODE_INVALID);
    }

    if (this.checkExpiration(cachedOTP.expiresAt)) {
      throw new BadRequestException(ErrorEnum.VERIFICATION_CODE_EXPIRED);
    }

    await this.cacheManager.del(cacheKey);
  }

  public async sendOtp({ email }: SendOtpDto): Promise<{
    email: string;
    ok: boolean;
  }> {
    const user = await this.userService.findByEmail(email);

    if (!user || !user.isActive) {
      return {
        email,
        ok: false,
      };
    }

    const otp = this.generateOtp();
    const otpHash = await hash(otp, 10);
    const expiresAt = this.getExpiration();

    const cacheKey = `otp-${user.email}`;
    const cachePayload: IOtpCachePayload = {
      otpHash,
      expiresAt,
    };

    await Promise.all([
      this.cacheManager.set(cacheKey, cachePayload),
      this.emailService.sendVerificationCode(user.email, otp),
    ]);

    return {
      email: user.email,
      ok: true,
    };
  }

  private generateOtp(): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  }

  private getExpiration(): Date {
    return moment().add(10, 'minutes').toDate();
  }

  private checkExpiration(expiresAt: Date): boolean {
    return moment.utc(expiresAt).isBefore(moment().utc());
  }
}
