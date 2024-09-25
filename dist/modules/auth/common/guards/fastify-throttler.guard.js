"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastifyThrottlerGuard = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
let FastifyThrottlerGuard = exports.FastifyThrottlerGuard = class FastifyThrottlerGuard extends throttler_1.ThrottlerGuard {
    getRequestResponse(context) {
        const http = context.switchToHttp();
        return {
            req: http.getRequest(),
            res: http.getResponse(),
        };
    }
};
exports.FastifyThrottlerGuard = FastifyThrottlerGuard = __decorate([
    (0, common_1.Injectable)()
], FastifyThrottlerGuard);
//# sourceMappingURL=fastify-throttler.guard.js.map