import type { FastifyReply, FastifyRequest } from 'fastify';
import { type IAppConfig } from '../../../config';
import { CallbackQueryDto } from '../dto';
import { OAuth2Service } from '../services';
export declare class OAuth2Controller {
    private readonly oauth2Service;
    private readonly appConfig;
    constructor(oauth2Service: OAuth2Service, appConfig: IAppConfig);
    google(response: FastifyReply): Promise<FastifyReply>;
    googleCallback(cbQuery: CallbackQueryDto, request: FastifyRequest, response: FastifyReply): Promise<FastifyReply>;
    github(response: FastifyReply): Promise<FastifyReply>;
    githubCallback(cbQuery: CallbackQueryDto, request: FastifyRequest, response: FastifyReply): Promise<FastifyReply>;
    private startRedirect;
    private callbackAndRedirect;
}
