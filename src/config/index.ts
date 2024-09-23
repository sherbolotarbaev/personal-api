import { type IAppConfig, AppConfig, appRegToken } from './app.config';

import { type IJwtConfig, JwtConfig, jwtRegToken } from './jwt.config';

import {
  type ISecurityConfig,
  SecurityConfig,
  securityRegToken,
} from './security.config';

import { type IOAuthConfig, OAuthConfig, oauthRegToken } from './oauth.config';

import { type IRedisConfig, RedisConfig, redisRegToken } from './redis.config';

import {
  type IMailerConfig,
  MailerConfig,
  mailerRegToken,
} from './mailer.config';

export * from './app.config';
export * from './jwt.config';
export * from './mailer.config';
export * from './oauth.config';
export * from './redis.config';
export * from './security.config';

export interface AllConfigType {
  [appRegToken]: IAppConfig;
  [jwtRegToken]: IJwtConfig;
  [securityRegToken]: ISecurityConfig;
  [oauthRegToken]: IOAuthConfig;
  [redisRegToken]: IRedisConfig;
  [mailerRegToken]: IMailerConfig;
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;

export default {
  AppConfig,
  JwtConfig,
  SecurityConfig,
  OAuthConfig,
  RedisConfig,
  MailerConfig,
};
