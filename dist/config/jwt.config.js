"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtConfig = exports.jwtRegToken = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const config_1 = require("@nestjs/config");
const env_1 = require("../global/env");
const publicKey = (0, node_fs_1.readFileSync)((0, node_path_1.join)(__dirname, '..', '..', 'keys/public.pem'), 'utf-8');
const privateKey = (0, node_fs_1.readFileSync)((0, node_path_1.join)(__dirname, '..', '..', 'keys/private.pem'), 'utf-8');
exports.jwtRegToken = 'jwt';
exports.JwtConfig = (0, config_1.registerAs)(exports.jwtRegToken, () => ({
    access: {
        publicKey,
        privateKey,
        expiresIn: (0, env_1.envNumber)('JWT_ACCESS_TOKEN_EXPIRATION'),
    },
}));
//# sourceMappingURL=jwt.config.js.map