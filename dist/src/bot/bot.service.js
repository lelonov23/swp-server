"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BotService = exports.BotService = class BotService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async signup(dto) {
        try {
            const group = await this.prisma.group.findUnique({
                where: {
                    name: dto.group
                }
            });
            const user = await this.prisma.user.create({
                data: {
                    chatId: dto.chatId,
                    group: {
                        connect: {
                            id: group.id
                        }
                    }
                }
            });
            return user;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ForbiddenException('Credentials taken');
            }
        }
    }
    async getTimetable(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    chatId: id
                },
                include: {
                    group: true,
                }
            });
            const groupevents = await this.prisma.groupEvent.findMany({
                where: {
                    group: user.group
                }
            });
            const events = await Promise.all(groupevents.map(async (groupevent) => {
                const event = await this.prisma.event.findUnique({
                    where: {
                        id: groupevent.eventId
                    },
                    include: {
                        lecturer: true
                    }
                });
                return event;
            }));
            return events;
        }
        catch (error) {
            throw new error;
        }
    }
    async user(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    chatId: id
                }
            });
            if (user) {
                return {
                    user: true
                };
            }
            return {
                user: false
            };
        }
        catch (error) {
            throw new error;
        }
    }
};
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BotService);
//# sourceMappingURL=bot.service.js.map