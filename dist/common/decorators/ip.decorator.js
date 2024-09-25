"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ip = void 0;
const common_1 = require("@nestjs/common");
exports.Ip = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const ip = request.headers['x-forwarded-for'] ||
        request.headers['x-real-ip'] ||
        request.socket.remoteAddress ||
        '';
    const ipAddress = Array.isArray(ip) ? ip[0] : ip;
    return ipAddress;
});
//# sourceMappingURL=ip.decorator.js.map