import type { CookieSerializeOptions } from '@fastify/cookie';
export declare const DEFAULT_COOKIE_OPTIONS: Partial<CookieSerializeOptions>;
export declare const COOKIE_CONFIG: {
    session: {
        key: string;
        opts: {
            maxAge: number;
        };
    };
};
