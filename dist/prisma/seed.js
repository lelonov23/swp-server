"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const CoreCourses_json_1 = require("./json/CoreCourses.json");
const prisma = new client_1.PrismaClient();
async function main() {
    const y1 = await prisma.year.upsert({
        where: { name: 'BS - Year 1' },
        update: {},
        create: {
            name: 'BS - Year 1',
        },
    });
    const y2 = await prisma.year.upsert({
        where: { name: 'BS - Year 2' },
        update: {},
        create: {
            name: 'BS - Year 2',
        },
    });
    const y3 = await prisma.year.upsert({
        where: { name: 'BS - Year 3' },
        update: {},
        create: {
            name: 'BS - Year 3',
        },
    });
    const y4 = await prisma.year.upsert({
        where: { name: 'BS - Year 4' },
        update: {},
        create: {
            name: 'BS - Year 4',
        },
    });
    const my1 = await prisma.year.upsert({
        where: { name: 'MS - Year 1' },
        update: {},
        create: {
            name: 'MS - Year 1',
        },
    });
    const cs1 = await prisma.group.upsert({
        where: { name: 'B22-CS-01' },
        update: {},
        create: {
            name: 'B22-CS-01',
            year: {
                connect: {
                    id: y1.id
                }
            }
        },
    });
    const cs2 = await prisma.group.upsert({
        where: { name: 'B22-CS-02' },
        update: {},
        create: {
            name: 'B22-CS-02',
            year: {
                connect: {
                    id: y1.id
                }
            }
        },
    });
    const cs3 = await prisma.group.upsert({
        where: { name: 'B22-CS-03' },
        update: {},
        create: {
            name: 'B22-CS-03',
            year: {
                connect: {
                    id: y1.id
                }
            }
        },
    });
    const cs4 = await prisma.group.upsert({
        where: { name: 'B22-CS-04' },
        update: {},
        create: {
            name: 'B22-CS-04',
            year: {
                connect: {
                    id: y1.id
                }
            }
        },
    });
    const cs5 = await prisma.group.upsert({
        where: { name: 'B22-CS-05' },
        update: {},
        create: {
            name: 'B22-CS-05',
            year: {
                connect: {
                    id: y1.id
                }
            }
        },
    });
    const cs6 = await prisma.group.upsert({
        where: { name: 'B22-CS-06' },
        update: {},
        create: {
            name: 'B22-CS-06', year: {
                connect: {
                    id: y1.id
                }
            }
        },
    });
    const dsai1 = await prisma.group.upsert({
        where: { name: 'B22-DSAI-01' },
        update: {},
        create: {
            name: 'B22-DSAI-01',
            year: {
                connect: {
                    id: y1.id
                }
            }
        },
    });
    const dsai2 = await prisma.group.upsert({
        where: { name: 'B22-DSAI-02' },
        update: {},
        create: {
            name: 'B22-DSAI-02',
            year: {
                connect: {
                    id: y1.id
                }
            }
        },
    });
    const dsai3 = await prisma.group.upsert({
        where: { name: 'B22-DSAI-03' },
        update: {},
        create: {
            name: 'B22-DSAI-03',
            year: {
                connect: {
                    id: y1.id
                }
            }
        },
    });
    const dsai4 = await prisma.group.upsert({
        where: { name: 'B22-DSAI-04' },
        update: {},
        create: {
            name: 'B22-DSAI-04',
            year: {
                connect: {
                    id: y1.id
                }
            }
        },
    });
    for (const object of CoreCourses_json_1.data) {
        let existingLect = await prisma.lecturer.findUnique({
            where: {
                name: object.lecturer
            }
        });
        if (!existingLect && object.lecturer != 'not defined') {
            existingLect = await prisma.lecturer.create({
                data: {
                    name: object.lecturer
                }
            });
        }
        const event = await prisma.event.create({
            data: {
                title: object.title,
                type: object.title.includes('(lab)') ? client_1.EventType.LAB : object.title.includes('(tut)') ? client_1.EventType.TUTORIAL : client_1.EventType.LECTURE,
                date: new Date(),
                lecturer: object.lecturer != 'not defined' ? {
                    connect: {
                        id: existingLect.id
                    },
                } : {},
                groups: {
                    create: await Promise.all(object.group.map(async (group) => {
                        let existingGroup = await prisma.group.findUnique({
                            where: {
                                name: group,
                            }
                        });
                        if (!existingGroup) {
                            existingGroup = await prisma.group.create({
                                data: {
                                    name: group,
                                    year: {
                                        connect: {
                                            id: y1.id,
                                        }
                                    }
                                }
                            });
                        }
                        return {
                            group: {
                                connect: {
                                    id: existingGroup.id,
                                }
                            }
                        };
                    }))
                }
            }
        });
    }
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map