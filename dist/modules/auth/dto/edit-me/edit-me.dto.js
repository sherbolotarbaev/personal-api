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
exports.EditMeDto = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const z = __importStar(require("nestjs-zod/z"));
const EditMeSchema = z.object({
    name: z
        .string()
        .regex(/^[A-Za-zА-Яа-яЁё]+$/, {
        message: 'Name must contain only letters.',
    })
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .max(64, { message: 'Name cannot be longer than 64 characters.' })
        .optional(),
    surname: z
        .string()
        .regex(/^[A-Za-zА-Яа-яЁё]+$/, {
        message: 'Surname must contain only letters.',
    })
        .min(2, { message: 'Surname must be at least 2 characters long.' })
        .max(64, { message: 'Surname cannot be longer than 64 characters.' })
        .optional(),
    photo: z.string().optional(),
}, {
    required_error: 'Request body is required and cannot be empty.',
});
class EditMeDto extends (0, nestjs_zod_1.createZodDto)(EditMeSchema) {
}
exports.EditMeDto = EditMeDto;
//# sourceMappingURL=edit-me.dto.js.map