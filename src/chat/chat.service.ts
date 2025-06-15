import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { ChatRenameDto, DeleteChatDto } from './dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(userId: number) {
    const count = await this.prisma.chat.count({
      where: { userId },
    });

    const name = `chat-${count}`;

    const chat = await this.prisma.chat.create({
      data: { name, userId },
    });

    return chat;
  }

  async getChats(userId: number) {
    return this.prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
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

  async deleteChat(userId: number, dto: DeleteChatDto) {
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
