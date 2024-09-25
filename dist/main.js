"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const fastify_adapter_1 = require("./common/adapters/fastify.adapter");
const zod_pipe_1 = require("./common/pipes/zod.pipe");
const config_2 = require("./config");
const app_module_1 = require("./app.module");
const compress_1 = __importDefault(require("@fastify/compress"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const cors_1 = __importDefault(require("@fastify/cors"));
const csrf_protection_1 = __importDefault(require("@fastify/csrf-protection"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, fastify_adapter_1.fastifyApp, {
        bufferLogs: true,
        snapshot: true,
    });
    const configService = app.get((config_1.ConfigService));
    const { port, name, frontBaseUrl } = configService.get(config_2.appRegToken, {
        infer: true,
    });
    const { cookieSecret } = configService.get(config_2.securityRegToken, {
        infer: true,
    });
    const logger = new common_1.Logger(name);
    await app.register(cookie_1.default, {
        secret: cookieSecret,
    });
    await app.register(helmet_1.default);
    await app.register(csrf_protection_1.default);
    await app.register(cors_1.default, {
        origin: frontBaseUrl,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    await app.register(compress_1.default);
    app.useGlobalPipes(new zod_pipe_1.ZodValidationPipe());
    try {
        await app.listen(port, '0.0.0.0');
        const url = await app.getUrl();
        logger.log(`🦖 server is running on ${url}`);
    }
    catch (error) {
        logger.error(error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map