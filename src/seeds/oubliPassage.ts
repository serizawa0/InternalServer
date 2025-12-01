import { startOfDay } from "date-fns";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async (userId:string, date:Date) => {
    const passage = await prisma.passage.create({
        data:{
            date:startOfDay(date),
            type:'entrée',
            workerId:userId
        }
    })
    await prisma.passage.update({
        where:{
            id:passage.id
        },
        data:{
            createdAt:new Date('2025-11-25T03:15:00')
        }
    })
    return 'okey'
}

main('036144d5-44f4-4f4c-ac57-bccb82b888da', new Date('2025-11-25')).then(
    data => {
        console.log(data)
    }
)