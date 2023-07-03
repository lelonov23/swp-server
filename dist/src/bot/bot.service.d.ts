import { BotUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BotService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(dto: BotUserDto): Promise<import(".prisma/client").User>;
    getTimetable(id: string): Promise<(import(".prisma/client").Event & {
        lecturer: import(".prisma/client").Lecturer;
    })[]>;
    user(id: string): Promise<{
        user: boolean;
    }>;
}
