import { BotService } from './bot.service';
import { BotUserDto } from './dto';
export declare class BotController {
    private botService;
    constructor(botService: BotService);
    signup(dto: BotUserDto): Promise<import(".prisma/client").User>;
    getTimetable(id: string): Promise<(import(".prisma/client").Event & {
        lecturer: import(".prisma/client").Lecturer;
    })[]>;
    user(id: string): Promise<{
        user: boolean;
    }>;
}
