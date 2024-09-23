import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ConfigType, registerAs } from '@nestjs/config';

import { envNumber } from '../global/env';

const publicKey = readFileSync(
  join(__dirname, '..', '..', 'keys/public.pem'),
  'utf-8',
);
const privateKey = readFileSync(
  join(__dirname, '..', '..', 'keys/private.pem'),
  'utf-8',
);

export const jwtRegToken = 'jwt';

export const JwtConfig = registerAs(jwtRegToken, () => ({
  access: {
    publicKey,
    privateKey,
    expiresIn: envNumber('JWT_ACCESS_TOKEN_EXPIRATION'),
  },
}));

export type IJwtConfig = ConfigType<typeof JwtConfig>;
