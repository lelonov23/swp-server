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
    }
}
