import { type ISecurityConfig } from '../../../config';
import { type IPinfo } from 'node-ipinfo';
export declare class LocationService {
    private readonly securityConfig;
    private readonly logger;
    private readonly iPinfo;
    constructor(securityConfig: ISecurityConfig);
    getLocation(ip: string): Promise<IPinfo>;
}
