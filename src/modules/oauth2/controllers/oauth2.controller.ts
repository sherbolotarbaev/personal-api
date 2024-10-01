import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { AppConfig, IAppConfig } from '../../../config';
import { extractDomain, setCookie } from '../../../utils/cookie';
import { Public } from '../../auth/common/decorators';
import { OAuthProvidersEnum } from '../common/enums';
import { OAuthFlagGuard } from '../common/guards';

import { CallbackQueryDto } from '../dto';
import { OAuth2Service } from '../services';

@Public()
@Controller('oauth2')
export class OAuth2Controller {
  constructor(
    private readonly oauth2Service: OAuth2Service,
    @Inject(AppConfig.KEY)
    private readonly appConfig: IAppConfig,
  ) {}

  @Get('google')
  @HttpCode(HttpStatus.OK)
  async google(
    @Res() response: FastifyReply,
    @Query('next') next?: string,
  ): Promise<FastifyReply> {
    return this.startRedirect(response, OAuthProvidersEnum.GOOGLE, next);
  }

  @Get('google/callback')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.GOOGLE))
  async googleCallback(
    @Query() cbQuery: CallbackQueryDto,
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
  ): Promise<FastifyReply> {
    return this.handleCallback(
      request,
      response,
      OAuthProvidersEnum.GOOGLE,
      cbQuery,
    );
  }

  @Get('github')
  @HttpCode(HttpStatus.OK)
  async github(
    @Res() response: FastifyReply,
    @Query('next') next?: string,
  ): Promise<FastifyReply> {
    return this.startRedirect(response, OAuthProvidersEnum.GITHUB, next);
  }

  @Get('github/callback')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.GITHUB))
  async githubCallback(
    @Query() cbQuery: CallbackQueryDto,
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
  ): Promise<FastifyReply> {
    return this.handleCallback(
      request,
      response,
      OAuthProvidersEnum.GITHUB,
      cbQuery,
    );
  }

  private async startRedirect(
    response: FastifyReply,
    provider: OAuthProvidersEnum,
    next?: string,
  ): Promise<FastifyReply> {
    const url = await this.oauth2Service.getAuthorizationUrl(provider, next);
    return response.status(HttpStatus.TEMPORARY_REDIRECT).redirect(url);
  }

  private async handleCallback(
    request: FastifyRequest,
    response: FastifyReply,
    provider: OAuthProvidersEnum,
    cbQuery: CallbackQueryDto,
  ): Promise<FastifyReply> {
    if (cbQuery.error) {
      return response
        .status(HttpStatus.FOUND)
        .redirect(
          `${this.appConfig.frontBaseUrl}/sign-in?error=${cbQuery.error}`,
        );
    }

    const { userData, next } = await this.oauth2Service.getUserData(
      provider,
      cbQuery,
    );

    const domain = extractDomain(request.hostname.split(':')[0]);
    const { accessToken } = await this.oauth2Service.callback(
      provider,
      userData.email,
      userData.name || userData.given_name,
      userData.surname || userData.family_name,
      userData.picture || userData.avatar_url,
      domain,
    );

    setCookie(request, response, 'session', accessToken);

    const redirectUrl = `${this.appConfig.frontBaseUrl}${next || '/'}`;
    return response.status(HttpStatus.FOUND).redirect(redirectUrl);
  }
}
