import { CanActivate, Type } from '@nestjs/common';
import type { OAuthProvidersEnum } from '../enums';
export declare const OAuthFlagGuard: (provider: OAuthProvidersEnum) => Type<CanActivate>;
