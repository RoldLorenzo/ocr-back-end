import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export interface MessageContent {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: {
    url: string;
  };
}

export interface Message {
  role: 'system' | 'user';
  content: MessageContent[];
}

export class MessageDto {
  @IsNotEmpty()
  @IsInt()
  chatId: number;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  previousMessages?: Message[];
}
