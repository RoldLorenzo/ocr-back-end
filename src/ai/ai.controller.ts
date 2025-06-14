import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    const data = await this.aiService.sendImageToAI(base64Image);

    return { message: data.choices[0].message.content };
  }
}
