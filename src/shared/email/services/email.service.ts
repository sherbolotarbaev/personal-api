import { type Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  Logger,
  NotImplementedException,
} from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

// import { type ISecurityConfig, SecurityConfig } from '~/config';
import { type ISecurityConfig, SecurityConfig } from '../../../config'; // fix: vercel issue
import type {
  IHunterResponse,
  IVerificationCodeLimit,
} from '../common/interfaces';

// import { ErrorEnum } from '~/constants/error.constant';
import { ErrorEnum } from '../../../constants/error.constant'; // fix: vercel issue

import moment from 'moment';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private readonly hunterApiKey: string;

  constructor(
    @Inject(SecurityConfig.KEY)
    private readonly securityConfig: ISecurityConfig,
    private readonly httpService: HttpService,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    this.hunterApiKey = this.securityConfig.hunterApiKey;
  }

  public async verifyEmail(email: string): Promise<boolean> {
    try {
      const {
        data: { data },
      } = await firstValueFrom(
        this.httpService.get<IHunterResponse>(
          `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${this.hunterApiKey}`,
        ),
      );

      return (
        data.status === 'valid' &&
        data.regexp === true &&
        data.result === 'deliverable'
      );
    } catch (error) {
      this.logger.error('Failed to verify email:', error);
      throw new NotImplementedException(ErrorEnum.EMAIL_VERIFICATION_FAILED);
    }
  }

  public async sendEmail(
    email: string,
    type: 'text' | 'html',
    subject: string,
    content: string,
  ): Promise<boolean> {
    this.logger.log(`Sending email to ${email}...`);
    if (type === 'text') {
      return this.mailerService.sendMail({
        to: email,
        subject,
        text: content,
      });
    } else {
      return this.mailerService.sendMail({
        to: email,
        subject,
        html: content,
      });
    }
  }

  public async checkVerificationCodeLimit(email: string): Promise<{
    hasLimit: boolean;
    timeRemaining: number;
  }> {
    const cacheKey = `verification-code-limit:${email}`;
    const userInfo = await this.cacheManager.get<IVerificationCodeLimit>(
      cacheKey,
    );
    const currentTime = moment().unix();

    if (!userInfo || userInfo.expiry < currentTime) {
      await this.cacheManager.set(cacheKey, {
        count: 1,
        expiry: moment().add(5, 'minute').unix(),
      });

      return { hasLimit: false, timeRemaining: 0 };
    }

    const timeRemaining = userInfo.expiry - currentTime;

    if (userInfo.count >= 3) {
      return { hasLimit: true, timeRemaining };
    }

    await this.cacheManager.set(cacheKey, {
      count: userInfo.count + 1,
      expiry: userInfo.expiry,
    });

    return { hasLimit: false, timeRemaining };
  }

  public async sendVerificationCode(
    email: string,
    code: string,
  ): Promise<{
    email: string;
    code: string;
  }> {
    const subject = 'Sign in code';
    const template = './verification-code';

    try {
      this.logger.log(`Sending verification email to ${email}...`);
      await this.mailerService.sendMail({
        to: email,
        subject,
        template,
        context: {
          code,
        },
      });
    } catch (error) {
      this.logger.error('Failed to send verification code:', error);
      throw new NotImplementedException(
        ErrorEnum.VERIFICATION_CODE_SEND_FAILED,
      );
    }

    return {
      email,
      code,
    };
  }
}
