import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return { message: 'Signup Successful' };
  }

  @Post('login')
  login() {
    return { message: 'Login Successful' };
  }
}
