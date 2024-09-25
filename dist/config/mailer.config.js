"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerConfig = exports.mailerRegToken = void 0;
const config_1 = require("@nestjs/config");
const env_1 = require("../global/env");
exports.mailerRegToken = 'mailer';
exports.MailerConfig = (0, config_1.registerAs)(exports.mailerRegToken, () => ({
    host: (0, env_1.env)('SMTP_HOST'),
    port: (0, env_1.envNumber)('SMTP_PORT'),
    auth: {
        user: (0, env_1.env)('SMTP_USER'),
        pass: (0, env_1.env)('SMTP_PASS'),
    },
}));
//# sourceMappingURL=mailer.config.js.map