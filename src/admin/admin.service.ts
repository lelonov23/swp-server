import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventDto, UpdateEventDto } from './dto';
import { EventType } from '@prisma/client';

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
                events: {
                    include: {
                        event: {
                            include: {
                                lecturer: true
                            }
                        }
                    }
                }
            }
        })

        return group.events.map((event) => event.event)
    }

    async createEvent(dto: EventDto) {
        try {
            const existingLect = await this.prisma.lecturer.findUnique({
                where: {
                    name: dto.lecturer
                }
            })
            const event = await this.prisma.event.create({
                data: {
                    title: dto.title,
                    date: dto.date,
                    groups: {
                        create: await Promise.all(dto.groups.map(async (group) => {
                            let existingGroup = await this.prisma.group.findUnique({
                                where: {
                                    name: group,
                                }
                            })
                            return {
                                group: {
                                    connect: {
                                        id: existingGroup.id,
                                    }
                                }
                            }
                        }))
                    },
                    lecturer: dto.lecturer != 'not defined' ? {
                        connect: {
                            id: existingLect.id
                        },
                    } : {},
                    type: dto.type == 'LECTURE' ? EventType.LECTURE : dto.type == 'LAB' ? EventType.LAB : EventType.TUTORIAL
                }
            })
            return event
        } catch (error) {
            return error
        }
    }

    async updateEvent(dto: UpdateEventDto) {
        try {
            const existingLect = await this.prisma.lecturer.findUnique({
                where: {
                    name: dto.lecturer
                }
            })
            const event = await this.prisma.event.update({
                where: {
                    id: parseInt(dto.id),
                },
                data: {
                    title: dto.title,
                    room: dto.room,
                    lecturer: {
                        connect: {
                            id: existingLect.id,
                        }
                    },
                    type: dto.type == 'LECTURE' ? EventType.LECTURE : dto.type == 'LAB' ? EventType.LAB : EventType.TUTORIAL
                }
            })
            return event
        } catch(error) {
            return error
        }
    }

    async deleteEvent(dto: UpdateEventDto) {
        try {
            const eventgroups = await this.prisma.groupEvent.deleteMany({
                where: {
                    eventId: parseInt(dto.id)
                }
            })

            const event = await this.prisma.event.delete({
                where: {
                    id: parseInt(dto.id),
                }
            })
            return event
        } catch(error) {
            return error
        }
    }

    async getLecturers() {
        return await this.prisma.lecturer.findMany({});
    }
}
