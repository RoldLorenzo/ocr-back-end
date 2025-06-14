import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [AuthModule, AiModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
