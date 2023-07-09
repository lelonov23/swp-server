import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    AuthModule, 
    BotModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    AdminModule
  ],
})
export class AppModule {}
