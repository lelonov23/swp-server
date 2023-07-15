import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUserDto } from './dto';
import { UserIdDto } from './dto/userId.dto';

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

    @Get('users/subscribed')
    usersSubsribed() {
        return this.botService.usersSubscribed()
    }

    @Post('user/flip-sub')
    switch(@Body() dto: UserIdDto) {
        return this.botService.switch(dto)
    }

    @Get('user/isNotified/:id')
    isNotified(@Param('id') id: string) {
        return this.botService.isNotified(id)
    }
 }
