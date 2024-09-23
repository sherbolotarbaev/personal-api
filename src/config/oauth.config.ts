import { ConfigType, registerAs } from '@nestjs/config';

import { env } from '../global/env';

export const oauthRegToken = 'oauth';

export const OAuthConfig = registerAs(oauthRegToken, () => ({
  google: {
    id: env('GOOGLE_CLIENT_ID'),
    secret: env('GOOGLE_CLIENT_SECRET'),
  },
  github: {
    id: env('GITHUB_CLIENT_ID'),
    secret: env('GITHUB_CLIENT_SECRET'),
  },
}));

export type IOAuthConfig = ConfigType<typeof OAuthConfig>;
