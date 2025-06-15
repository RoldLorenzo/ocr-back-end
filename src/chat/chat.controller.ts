import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { GetUser } from 'src/user/decorator';
import { ChatService } from './chat.service';
import {
  ChatRenameDto,
  CreateChatDto,
  GetChatDto,
  SendMessageDto,
} from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  createChat(
    @GetUser('id') userId: number,
    @Body() createChatDto: CreateChatDto,
  ) {
    return this.chatService.createChat(userId, createChatDto);
  }

  @Post('message')
  sendMessage(
    @GetUser('id') userId: number,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.chatService.sendMessage(userId, sendMessageDto);
  }

  @Get()
  getChats(@GetUser('id') userId: number) {
    return this.chatService.getChats(userId);
  }

  @Get('messages')
  getMessagesFromChat(
    @GetUser('id') userId: number,
    @Body() getChatDto: GetChatDto,
  ) {
    return this.chatService.getMessagesFromChat(userId, getChatDto);
  }

  @Patch()
  renameChat(@GetUser('id') userId, @Body() chatRenameDto: ChatRenameDto) {
    return this.chatService.renameChat(userId, chatRenameDto);
  }

  @Delete()
  deleteChat(@GetUser('id') userId, @Body() getChatDto: GetChatDto) {
    return this.chatService.deleteChat(userId, getChatDto);
  }
}
