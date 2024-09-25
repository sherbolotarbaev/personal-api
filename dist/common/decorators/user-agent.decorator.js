"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAgent = void 0;
const common_1 = require("@nestjs/common");
const user_agent_1 = require("../../utils/user-agent");
exports.UserAgent = (0, common_1.createParamDecorator)((_data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return (0, user_agent_1.userAgent)(request);
});
//# sourceMappingURL=user-agent.decorator.js.map