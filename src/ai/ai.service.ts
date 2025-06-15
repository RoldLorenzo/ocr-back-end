import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AiService {
  modelURL = 'https://openrouter.ai/api/v1/chat/completions';
  messageBody = {
    model: 'google/gemma-3-27b-it:free',
    messages: [
      {
        role: 'system',
        content:
          'Você é um assistente que deve ler imagens de invoices, reconhecer o que está escrito e responder perguntas sobre elas',
      },
    ],
  };

  constructor(private configService: ConfigService) {}

  async sendImageToAI(base64Image: string) {
    const response = await axios.post(this.modelURL, this.messageBody, {
      headers: {
        Authorization: `Bearer ${this.configService.get<string>('API_KEY')}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }
}
