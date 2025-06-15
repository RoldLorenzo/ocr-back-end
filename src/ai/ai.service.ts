import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Message } from 'src/message/dto';

@Injectable()
export class AiService {
  private readonly modelURL = 'https://openrouter.ai/api/v1/chat/completions';
  private readonly model = 'google/gemma-3-27b-it:free';

  constructor(private configService: ConfigService) {}

  async sendMessagesToAI(messages: Message[]) {
    console.log(messages);
    const response = await axios.post(
      this.modelURL,
      {
        model: this.model,
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${this.configService.get<string>('API_KEY')}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }
}
