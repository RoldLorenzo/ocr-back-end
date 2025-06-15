import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import {
  ChatRenameDto,
  CreateChatDto,
  GetChatDto,
  SendMessageDto,
} from './dto';
import { MessageService } from 'src/message/message.service';
import { Message, MessageContent, MessageDto } from 'src/message/dto';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private messageService: MessageService,
  ) {}

  async createChat(userId: number, dto: CreateChatDto) {
    const count = await this.prisma.chat.count({
      where: { userId },
    });

    const name = `chat-${count}`;

    const chat = await this.prisma.chat.create({
      data: { name, userId },
    });

    const initial_message: MessageDto = {
      chatId: chat.id,
      text: 'Qual o texto dessa imagem?',
      image: dto.base64Image,
    };
    await this.messageService.sendMessage(initial_message);

    return chat;
  }

  async sendMessage(userId: number, dto: SendMessageDto) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: dto.id },
    });

    if (!chat) return new NotFoundException('Chat não existe');

    if (chat.userId !== userId)
      return new ForbiddenException('Chat não pertence à esse usuário');

    const previousMessages = await this.prisma.message.findMany({
      where: { chatId: dto.id },
    });

    const convertedPreviousMessages: Message[] = previousMessages.map(
      (message) => {
        let content: MessageContent[] = [{ type: 'text', text: message.text }];

        if (message.image)
          content.push({
            type: 'image_url',
            image_url: { url: message.image },
          });

        return {
          role: message.role as 'user' | 'system',
          content,
        };
      },
    );

    let message: MessageDto = {
      chatId: dto.id,
      text: dto.text,
      previousMessages: convertedPreviousMessages,
    };
    return await this.messageService.sendMessage(message);
  }

  async getChats(userId: number) {
    return this.prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMessagesFromChat(userId: number, dto: GetChatDto) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: dto.id },
    });

    if (!chat) return new NotFoundException('Chat não existe');

    if (chat.userId !== userId)
      return new ForbiddenException('Chat não pertence à esse usuário');

    const messages = await this.prisma.message.findMany({
      where: { chatId: dto.id },
      orderBy: { createdAt: 'asc' },
    });

    return messages;
  }

  async renameChat(userId: number, dto: ChatRenameDto) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: dto.id },
    });

    if (!chat) return new NotFoundException('Chat não existe');

    if (chat.userId !== userId)
      return new ForbiddenException('Chat não pertence à esse usuário');

    return this.prisma.chat.update({
      where: { id: dto.id },
      data: { name: dto.name },
    });
  }

  async deleteChat(userId: number, dto: GetChatDto) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: dto.id },
    });

    if (!chat) return new NotFoundException('Chat não existe');

    if (chat.userId !== userId)
      return new ForbiddenException('Chat não pertence à esse usuário');

    return this.prisma.chat.delete({
      where: {
        id: dto.id,
      },
    });
  }
}
