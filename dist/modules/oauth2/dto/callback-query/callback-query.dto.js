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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackQueryDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const z = __importStar(require("nestjs-zod/z"));
const CallbackQuerySchema = z.object({
    code: z.string({
        required_error: 'Query parameter `code` is required and cannot be empty.',
        message: 'Query parameter `code` must be a string.',
    }),
    state: z.string({
        required_error: 'Query parameter `state` is required and cannot be empty.',
        message: 'Query parameter `state` must be a string.',
    }),
});
class CallbackQueryDto extends (0, nestjs_zod_1.createZodDto)(CallbackQuerySchema) {
}
exports.CallbackQueryDto = CallbackQueryDto;
//# sourceMappingURL=callback-query.dto.js.map