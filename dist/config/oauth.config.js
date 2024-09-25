"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthConfig = exports.oauthRegToken = void 0;
const config_1 = require("@nestjs/config");
const env_1 = require("../global/env");
exports.oauthRegToken = 'oauth';
exports.OAuthConfig = (0, config_1.registerAs)(exports.oauthRegToken, () => ({
    google: {
        id: (0, env_1.env)('GOOGLE_CLIENT_ID'),
        secret: (0, env_1.env)('GOOGLE_CLIENT_SECRET'),
    },
    github: {
        id: (0, env_1.env)('GITHUB_CLIENT_ID'),
        secret: (0, env_1.env)('GITHUB_CLIENT_SECRET'),
    },
}));
//# sourceMappingURL=oauth.config.js.map