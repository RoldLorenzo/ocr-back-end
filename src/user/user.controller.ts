import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '@prisma/client';
import { GetUser } from './decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
