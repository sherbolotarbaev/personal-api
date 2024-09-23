import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  mixin,
  NotFoundException,
  Type,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

// import { isNull } from '~/utils/validation';
import { isNull } from '../../../../utils/validation'; // fix: vercel issue
// import { IOAuthConfig, OAuthConfig } from '~/config';
import { type IOAuthConfig, OAuthConfig } from '../../../../config'; // fix: vercel issue

import type { OAuthProvidersEnum } from '../enums';
import type { IClient } from '../interfaces';

export const OAuthFlagGuard = (
  provider: OAuthProvidersEnum,
): Type<CanActivate> => {
  @Injectable()
  class OAuthFlagGuardClass implements CanActivate {
    constructor(
      @Inject(OAuthConfig.KEY) private readonly oauthConfig: IOAuthConfig,
    ) {}

    public canActivate(context: ExecutionContext): boolean {
      const client: IClient | null = this.oauthConfig[provider];

      if (isNull(client)) {
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        throw new NotFoundException(`Cannot ${request.method} ${request.url}.`);
      }

      return true;
    }
  }

  return mixin(OAuthFlagGuardClass);
};
