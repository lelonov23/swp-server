import { ForbiddenException, Injectable } from '@nestjs/common';
import { BotUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserIdDto } from './dto';

@Injectable()
export class BotService {
    constructor(private prisma: PrismaService) {}

    async signup(dto: BotUserDto) {
        try{
            const group = await this.prisma.group.findUnique({
                where: {
                    name: dto.group
                }
            })
            const user = await this.prisma.user.create({
                data: {
                    chatId: dto.chatId,
                    group: {
                        connect: {
                            id: group.id
                        }
                    }
                }
            })
            return user;
        } catch(error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException(
                    'Credentials taken',
                )
            }
        }
    }

    async getTimetable(id: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    chatId: id
                },
                include: {
                    group: true,
                }
            })
            const groupevents = await this.prisma.groupEvent.findMany({
                where: {
                    group: user.group
                }
            })
            
            const events = await Promise.all(groupevents.map(async (groupevent) => {
                const event = await this.prisma.event.findUnique({
                    where: {
                        id: groupevent.eventId
                    },
                    include: {
                        lecturer: true
                    }
                })
                return event
            })) 

            return events

        } catch (error) {
            throw new error
        }
    }

    async user(id: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    chatId: id
                }
            })

            if (user) {
                return {
                    user: true
                }
            }
            return {
                user: false
            }

        } catch (error) {
            throw new error
        }
    }
    async usersSubscribed() {
        try {
            const users = await this.prisma.user.findMany({
                where: {
                    isNotified: true,
                }
            })
            return users.map(user => user.chatId)
        } catch (error) {
            throw new error
        }
    }

    async switch(dto: UserIdDto) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    chatId: dto.chatId,
                },
                data: {
                    isNotified: false,
                }
            })
        } catch (error) {
            if (error.code == 'P2025') {
                throw new ForbiddenException(
                    'No such user found',
                )
            }
        }
        
    }
}
