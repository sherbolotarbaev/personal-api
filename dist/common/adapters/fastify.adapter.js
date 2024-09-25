"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastifyApp = void 0;
const common_1 = require("@nestjs/common");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const user_agent_1 = require("../../utils/user-agent");
const app = new platform_fastify_1.FastifyAdapter({
    trustProxy: true,
    logger: false,
});
exports.fastifyApp = app;
app.getInstance().addHook('onRequest', (request, reply, done) => {
    const { origin } = request.headers;
    if (!origin)
        request.headers.origin = request.headers.host;
    const { url } = request;
    if (url.match(/favicon.ico$/) || url.match(/manifest.json$/)) {
        reply.code(204).send();
        return;
    }
    done();
});
app.getInstance().addHook('onResponse', (request, reply, done) => {
    const { method, originalUrl, headers } = request;
    const { statusCode } = reply;
    const ip = request.headers['x-real-ip'] ||
        request.headers['x-forwarded-for'] ||
        request.socket.remoteAddress ||
        '';
    const ipAddress = Array.isArray(ip) ? ip[0] : ip;
    const ua = (0, user_agent_1.userAgent)({ headers });
    const logger = new common_1.Logger(ipAddress);
    logger.log(`${method} ${originalUrl} ${statusCode} | ${ua.os.name} (${ua.os.version}) | Bot: ${ua.isBot}`);
    done();
});
//# sourceMappingURL=fastify.adapter.js.map