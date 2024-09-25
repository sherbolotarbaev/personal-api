/// <reference types="node" />
import type { IncomingHttpHeaders } from 'http';
import type { IUserAgent } from './interfaces';
export declare function isBot(input: string): boolean;
export declare function userAgentFromString(input: string | undefined): IUserAgent;
export declare function userAgent({ headers, }: {
    headers: IncomingHttpHeaders;
}): IUserAgent;
