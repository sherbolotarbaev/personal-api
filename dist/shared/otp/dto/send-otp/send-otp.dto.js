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
exports.SendOtpDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const z = __importStar(require("nestjs-zod/z"));
const SendOtpSchema = z.object({
    email: z
        .string({
        required_error: 'Email is required and cannot be empty.',
    })
        .email({ message: 'Invalid email address.' }),
}, {
    required_error: 'Request body is required and cannot be empty.',
});
class SendOtpDto extends (0, nestjs_zod_1.createZodDto)(SendOtpSchema) {
}
exports.SendOtpDto = SendOtpDto;
//# sourceMappingURL=send-otp.dto.js.map