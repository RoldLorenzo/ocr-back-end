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
import { ChatRenameDto, DeleteChatDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  createChat(@GetUser('id') userId: number) {
    return this.chatService.createChat(userId);
  }

  @Get()
  getChats(@GetUser('id') userId: number) {
    return this.chatService.getChats(userId);
  }

  @Patch()
  renameChat(@GetUser('id') userId, @Body() chatRenameDto: ChatRenameDto) {
    return this.chatService.renameChat(userId, chatRenameDto);
  }

  @Delete()
  deleteChat(@GetUser('id') userId, @Body() deleteChatDto: DeleteChatDto) {
    return this.chatService.deleteChat(userId, deleteChatDto);
  }
}
