import type { CookieSerializeOptions } from '@fastify/cookie';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { COOKIE_CONFIG } from './constants';
export declare const extractDomain: (hostname: string) => string;
export declare const setCookie: (request: FastifyRequest, response: FastifyReply, key: keyof typeof COOKIE_CONFIG, value: string | undefined, customOptions?: Partial<CookieSerializeOptions>) => FastifyReply;
export declare const setRawCookie: (response: FastifyReply, setCookieValue: string) => FastifyReply;
