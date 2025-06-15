import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { AiService } from 'src/ai/ai.service';

@Module({
  providers: [MessageService, AiService],
  exports: [MessageService],
})
export class MessageModule {}
