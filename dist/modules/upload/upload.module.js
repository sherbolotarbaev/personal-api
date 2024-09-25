"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const fastify_multer_1 = require("@nest-lab/fastify-multer");
const common_1 = require("@nestjs/common");
const controllers_1 = require("./controllers");
const services_1 = require("./services");
let UploadModule = exports.UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [fastify_multer_1.FastifyMulterModule],
        providers: [services_1.UploadService],
        controllers: [controllers_1.UploadController],
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map