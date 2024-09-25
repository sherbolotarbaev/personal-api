"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_CONFIG = exports.DEFAULT_COOKIE_OPTIONS = void 0;
const env_1 = require("../../global/env");
exports.DEFAULT_COOKIE_OPTIONS = {
    httpOnly: true,
    signed: false,
    secure: !env_1.isDev,
    domain: !env_1.isDev ? '.sherbolotarbaev.co' : 'localhost',
    sameSite: !env_1.isDev ? 'none' : 'lax',
    path: '/',
};
exports.COOKIE_CONFIG = {
    session: {
        key: 'session',
        opts: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    },
};
//# sourceMappingURL=constants.js.map