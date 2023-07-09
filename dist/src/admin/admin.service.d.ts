import { PrismaService } from 'src/prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    years(): Promise<import(".prisma/client").Year[]>;
    groups(id: number): Promise<import(".prisma/client").Group[]>;
    event(id: number): Promise<(import(".prisma/client").Event & {
        lecturer: import(".prisma/client").Lecturer;
    })[]>;
}
