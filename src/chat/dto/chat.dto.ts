import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ChatRenameDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class DeleteChatDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
