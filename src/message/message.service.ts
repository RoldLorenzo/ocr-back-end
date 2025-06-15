import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Message, MessageDto } from './dto';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async sendMessage(dto: MessageDto) {
    const message = await this.prisma.message.create({
      data: {
        chatId: dto.chatId,
        role: 'user',
        text: dto.text,
        ...(dto.image && { image: dto.image }),
      },
    });

    let messages: Message[] = dto.previousMessages ? dto.previousMessages : [];

    messages.push({
      role: 'user',
      content: [
        {
          type: 'text',
          text: dto.text,
        },
      ],
    });

    if (dto.image)
      messages[0].content.push({
        type: 'image_url',
        image_url: { url: dto.image },
      });

    const ai_message = await this.aiService.sendMessagesToAI(messages);

    if (!ai_message.choices)
      throw new InternalServerErrorException(
        'Alguma coisa deu errado ao enviar a mensagem até o assistente',
      );

    const response = ai_message.choices[0].message.content;

    await this.prisma.message.create({
      data: {
        chatId: dto.chatId,
        role: 'assistant',
        text: response,
      },
    });

    return {
      sent: message,
      response,
    };
  }
}
