"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domain = void 0;
const common_1 = require("@nestjs/common");
const cookie_1 = require("../../../../utils/cookie");
exports.Domain = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return (0, cookie_1.extractDomain)(request.hostname.split(':')[0]);
});
//# sourceMappingURL=domain.decorator.js.map