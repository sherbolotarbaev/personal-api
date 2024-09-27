import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../../auth/common/decorators';
import { RoleGuard } from '../../auth/common/guards';

import { UserService } from '../services';

@UseGuards(RoleGuard)
@Roles('ADMIN')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return this.userService.findAll();
  }
}
