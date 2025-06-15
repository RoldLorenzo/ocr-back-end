import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MessageService } from 'src/message/message.service';
import { AiService } from 'src/ai/ai.service';

@Module({
  providers: [ChatService, MessageService, AiService],
  controllers: [ChatController],
})
export class ChatModule {}
