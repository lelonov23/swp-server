import { PrismaClient, EventType } from '@prisma/client'

import { data } from './json/CoreCourses.json';
import { y_data } from './json/yg_data_json.json'

const prisma = new PrismaClient()
async function main() {

  for (const object of y_data) {
    //years
    const existingYear = await prisma.year.upsert({
      where: { name: object.year[0] },
      update: {},
      create: {
        name: object.year[0],
      },
    })
    
    //groups
    for (const group of object.groups) {
      const cs1 = await prisma.group.upsert({
        where: { name: group },
        update: {},
        create: {
          name: group,
          year: {
            connect: {
              id: existingYear.id
            }
          }
        },
      })
    }
  }
  for (const object of data) {
    let existingLect = await prisma.lecturer.findUnique({
        where: {
            name: object.lecturer
        }
    })
    if(!existingLect && object.lecturer != 'not defined') {
        existingLect = await prisma.lecturer.create({
            data: {
                name: object.lecturer
            }
        })
    }

    const event = await prisma.event.create({
        data: {
            title: object.title,
            type: object.type == 'lab' ? EventType.LAB : object.type == 'tut' ? EventType.TUTORIAL : EventType.LECTURE,
            date: object.date,
            room: object.room + '',
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
                    })
                    return {
                        group: {
                            connect: {
                                id: existingGroup.id,
                            }
                        }
                    }
                }))
            }
        }
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })