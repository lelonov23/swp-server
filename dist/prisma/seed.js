"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const CoreCourses_json_1 = require("./json/CoreCourses.json");
const prisma = new client_1.PrismaClient();
async function main() {
    const cs1 = await prisma.group.upsert({
        where: { name: 'B22-CS-01' },
        update: {},
        create: {
            name: 'B22-CS-01',
        },
    });
    const cs2 = await prisma.group.upsert({
        where: { name: 'B22-CS-02' },
        update: {},
        create: {
            name: 'B22-CS-02',
        },
    });
    const cs3 = await prisma.group.upsert({
        where: { name: 'B22-CS-03' },
        update: {},
        create: {
            name: 'B22-CS-03',
        },
    });
    const cs4 = await prisma.group.upsert({
        where: { name: 'B22-CS-04' },
        update: {},
        create: {
            name: 'B22-CS-04',
        },
    });
    const cs5 = await prisma.group.upsert({
        where: { name: 'B22-CS-05' },
        update: {},
        create: {
            name: 'B22-CS-05',
        },
    });
    const cs6 = await prisma.group.upsert({
        where: { name: 'B22-CS-06' },
        update: {},
        create: {
            name: 'B22-CS-06',
        },
    });
    const dsai1 = await prisma.group.upsert({
        where: { name: 'B22-DSAI-01' },
        update: {},
        create: {
            name: 'B22-DSAI-01',
        },
    });
    const dsai2 = await prisma.group.upsert({
        where: { name: 'B22-DSAI-02' },
        update: {},
        create: {
            name: 'B22-DSAI-02',
        },
    });
    const dsai3 = await prisma.group.upsert({
        where: { name: 'B22-DSAI-03' },
        update: {},
        create: {
            name: 'B22-DSAI-03',
        },
    });
    const dsai4 = await prisma.group.upsert({
        where: { name: 'B22-DSAI-04' },
        update: {},
        create: {
            name: 'B22-DSAI-04',
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