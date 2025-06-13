import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('signup')
    signup(@Body() body: any) {
        console.log('Signup received: ', body)
        return {message: "Signup Successful"};
    }

    @Post('login')
    login(@Body() body: any) {
        console.log('Login received: ', body)
        return {message: "Login Successful"};
    }
}
