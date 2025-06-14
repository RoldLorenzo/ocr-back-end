import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AiService {
  constructor(private configService: ConfigService) {}

  async sendImageToAI(base64Image: string) {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemma-3-27b-it:free',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'O que diz o texto nessa imagem?',
              },
              {
                type: 'image_url',
                image_url: {
                  url: base64Image,
                },
              },
            ],
          },
        ],
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
