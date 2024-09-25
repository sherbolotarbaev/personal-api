"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConfig = exports.redisRegToken = void 0;
const config_1 = require("@nestjs/config");
const env_1 = require("../global/env");
exports.redisRegToken = 'redis';
exports.RedisConfig = (0, config_1.registerAs)(exports.redisRegToken, () => ({
    host: (0, env_1.env)('REDIS_HOST'),
    port: (0, env_1.envNumber)('REDIS_PORT', 6379),
    username: (0, env_1.env)('REDIS_USER'),
    password: (0, env_1.env)('REDIS_PASS'),
}));
//# sourceMappingURL=redis.config.js.map