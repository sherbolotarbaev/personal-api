"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = exports.appRegToken = void 0;
const config_1 = require("@nestjs/config");
const env_1 = require("../global/env");
exports.appRegToken = 'app';
exports.AppConfig = (0, config_1.registerAs)(exports.appRegToken, () => ({
    nodeEnvironment: (0, env_1.env)('NODE_ENV'),
    name: (0, env_1.env)('NAME'),
    port: (0, env_1.envNumber)('PORT', 3000),
    baseUrl: (0, env_1.env)('BASE_URL'),
    frontBaseUrl: (0, env_1.env)('FRONT_END_BASE_URL'),
}));
//# sourceMappingURL=app.config.js.map