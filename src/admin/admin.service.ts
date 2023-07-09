import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) {}

    async years() {
        const years = await this.prisma.year.findMany({})
        return years
    }

    async groups(id: number) {
        const groups = await this.prisma.group.findMany({
            where: {
                yearId: id
            }
        })
        return groups
    }

    async event(id: number) {
        const group = await this.prisma.group.findUnique({
            where: {
                id: id
            },
            include: {
                events: true,
            }
        })

        return group.events
    }
}
