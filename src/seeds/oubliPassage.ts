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
            createdAt:new Date('2025-11-25T05:15:00')
        }
    })
    return 'okey'
}

main('ce920ee4-7d7b-4552-9d77-37f1c229f4c1', new Date('2025-11-25')).then(
    data => {
        console.log(data)
    }
)