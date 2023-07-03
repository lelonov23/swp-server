import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    BotModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
})
export class AppModule {}
