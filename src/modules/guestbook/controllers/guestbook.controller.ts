import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { AuthUser, Public } from '~/modules/auth/common/decorators';

import { GetMessagesDto, MessageDto, ReactionDto } from '../dto';
import { GuestbookService } from '../services';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async newMessage(@Body() dto: MessageDto, @AuthUser() { id: userId }: IUser) {
    return this.guestbookService.newMessage(dto, userId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async editMessage(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MessageDto,
    @AuthUser() { id: userId }: IUser,
  ) {
    return this.guestbookService.editMessage(id, dto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteMessage(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() { id: userId }: IUser,
  ) {
    return this.guestbookService.deleteMessage(id, userId);
  }

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getMessages(@Query() queryDto: GetMessagesDto) {
    return this.guestbookService.getMessages(queryDto);
  }

  @Post(':id/reactions')
  @HttpCode(HttpStatus.CREATED)
  async addReaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReactionDto,
    @AuthUser() { id: userId }: IUser,
  ) {
    return this.guestbookService.addReaction(id, dto, userId);
  }

  @Delete(':id/reactions')
  @HttpCode(HttpStatus.OK)
  async removeReaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReactionDto,
    @AuthUser() { id: userId }: IUser,
  ) {
    return this.guestbookService.removeReaction(id, dto, userId);
  }
}
