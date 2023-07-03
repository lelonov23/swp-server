import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUserDto } from './dto';

@Controller('bot')
export class BotController {
    constructor(private botService: BotService) {}

    @Post("user-signup")
    signup(@Body() dto: BotUserDto) {
        return this.botService.signup(dto)
    }

    @Get('timetable/:id')
    getTimetable(@Param('id') id: string) {
        return this.botService.getTimetable(id)
    }

    @Get('user/:id')
    user(@Param('id') id: string) {
        return this.botService.user(id)
    }
 }
