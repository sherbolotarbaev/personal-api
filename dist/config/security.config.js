"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityConfig = exports.securityRegToken = void 0;
const config_1 = require("@nestjs/config");
const env_1 = require("../global/env");
exports.securityRegToken = 'security';
exports.SecurityConfig = (0, config_1.registerAs)(exports.securityRegToken, () => ({
    googleClientId: (0, env_1.env)('GOOGLE_CLIENT_ID'),
    googleClientSecret: (0, env_1.env)('GOOGLE_CLIENT_SECRET'),
    googleCallbackUrl: `${(0, env_1.env)('BASE_URL')}/google/callback`,
    githubClientId: (0, env_1.env)('GITHUB_CLIENT_ID'),
    githubClientSecret: (0, env_1.env)('GITHUB_CLIENT_SECRET'),
    githubCallbackUrl: `${(0, env_1.env)('BASE_URL')}/github/callback`,
    cookieSecret: (0, env_1.env)('COOKIE_SECRET'),
    hunterApiKey: (0, env_1.env)('HUNTER_API_KEY'),
    ipInfoApiKey: (0, env_1.env)('IP_INFO_API_KEY'),
    telegramBotApiKey: (0, env_1.env)('TELEGRAM_BOT_API_KEY'),
    telegramBotChatId: (0, env_1.env)('TELEGRAM_BOT_CHAT_ID'),
    supabaseUrl: (0, env_1.env)('SUPABASE_URL'),
    supabaseSecretKey: (0, env_1.env)('SUPABASE_SECRET_KEY'),
}));
//# sourceMappingURL=security.config.js.map