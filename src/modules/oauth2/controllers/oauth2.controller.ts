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

// import { Public } from '~/modules/auth/common/decorators';
import { Public } from '../../auth/common/decorators'; // fix: vercel issue
// import { setCookie } from '~/utils/cookie';
import { setCookie } from '../../../utils/cookie'; // fix: vercel issue

// import { type IAppConfig, AppConfig } from '~/config';
import { type IAppConfig, AppConfig } from '../../../config'; // fix: vercel issue

import { OAuthProvidersEnum } from '../common/enums';
import { OAuthFlagGuard } from '../common/guards';
import type { IGitHubUser, IGoogleUser } from '../common/interfaces';

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
  async google(@Res() response: FastifyReply): Promise<FastifyReply> {
    return this.startRedirect(response, OAuthProvidersEnum.GOOGLE);
  }

  @Get('google/callback')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.GOOGLE))
  async googleCallback(
    @Query() cbQuery: CallbackQueryDto,
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
  ): Promise<FastifyReply> {
    const provider = OAuthProvidersEnum.GOOGLE;
    const {
      given_name: name,
      family_name: surname,
      email,
    } = await this.oauth2Service.getUserData<IGoogleUser>(provider, cbQuery);
    return this.callbackAndRedirect(
      request,
      response,
      provider,
      email,
      name,
      surname,
    );
  }

  @Get('github')
  @HttpCode(HttpStatus.OK)
  async github(@Res() response: FastifyReply): Promise<FastifyReply> {
    return this.startRedirect(response, OAuthProvidersEnum.GITHUB);
  }

  @Get('github/callback')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.GITHUB))
  async githubCallback(
    @Query() cbQuery: CallbackQueryDto,
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
  ): Promise<FastifyReply> {
    const provider = OAuthProvidersEnum.GITHUB;
    const { name, login, email } =
      await this.oauth2Service.getUserData<IGitHubUser>(provider, cbQuery);
    return this.callbackAndRedirect(
      request,
      response,
      provider,
      email,
      name?.split(' ')[0] || login,
      name?.split(' ')[1] || ' ',
    );
  }

  private async startRedirect(
    response: FastifyReply,
    provider: OAuthProvidersEnum,
  ): Promise<FastifyReply> {
    const url = await this.oauth2Service.getAuthorizationUrl(provider);
    return response.status(HttpStatus.TEMPORARY_REDIRECT).redirect(url);
  }

  private async callbackAndRedirect(
    request: FastifyRequest,
    response: FastifyReply,
    provider: OAuthProvidersEnum,
    email: string,
    name: string,
    surname: string,
  ): Promise<FastifyReply> {
    const { accessToken } = await this.oauth2Service.callback(
      provider,
      email,
      name,
      surname,
    );

    setCookie(request, response, 'session', accessToken);

    return response
      .status(HttpStatus.FOUND)
      .redirect(this.appConfig.frontBaseUrl);
  }
}
