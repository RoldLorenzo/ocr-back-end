import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  base64Image: string;
}

export class SendMessageDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  text: string;
}

export class ChatRenameDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class GetChatDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
