import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { FastifyRequest } from 'fastify';

// import { ErrorEnum } from '~/constants/error.constant';
import { ErrorEnum } from '../../../../constants/error.constant'; // fix: vercel issue
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const user = request.user;

    if (!user) {
      return true;
    }

    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      throw new ForbiddenException(ErrorEnum.ACCESS_DENIED);
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException(ErrorEnum.ACCESS_DENIED);
    }

    return true;
  }
}
