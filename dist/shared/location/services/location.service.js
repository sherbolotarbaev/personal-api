"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var LocationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../../config");
const error_constant_1 = require("../../../constants/error.constant");
const node_ipinfo_1 = __importDefault(require("node-ipinfo"));
let LocationService = exports.LocationService = LocationService_1 = class LocationService {
    securityConfig;
    logger = new common_1.Logger(LocationService_1.name);
    iPinfo;
    constructor(securityConfig) {
        this.securityConfig = securityConfig;
        this.iPinfo = new node_ipinfo_1.default(this.securityConfig.ipInfoApiKey);
    }
    async getLocation(ip) {
        try {
            const data = await this.iPinfo.lookupIp(ip);
            return data;
        }
        catch (error) {
            this.logger.error('Failed to get location:', error);
            throw new common_1.NotImplementedException(error_constant_1.ErrorEnum.GET_LOCATION_FAILED);
        }
    }
};
exports.LocationService = LocationService = LocationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.SecurityConfig.KEY)),
    __metadata("design:paramtypes", [Object])
], LocationService);
//# sourceMappingURL=location.service.js.map