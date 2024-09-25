"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_1 = require("./app.config");
const jwt_config_1 = require("./jwt.config");
const security_config_1 = require("./security.config");
const oauth_config_1 = require("./oauth.config");
const redis_config_1 = require("./redis.config");
const mailer_config_1 = require("./mailer.config");
__exportStar(require("./app.config"), exports);
__exportStar(require("./jwt.config"), exports);
__exportStar(require("./mailer.config"), exports);
__exportStar(require("./oauth.config"), exports);
__exportStar(require("./redis.config"), exports);
__exportStar(require("./security.config"), exports);
exports.default = {
    AppConfig: app_config_1.AppConfig,
    JwtConfig: jwt_config_1.JwtConfig,
    SecurityConfig: security_config_1.SecurityConfig,
    OAuthConfig: oauth_config_1.OAuthConfig,
    RedisConfig: redis_config_1.RedisConfig,
    MailerConfig: mailer_config_1.MailerConfig,
};
//# sourceMappingURL=index.js.map