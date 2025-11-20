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
            createdAt:new Date('2025-11-17T06:40:00')
        }
    })
    return 'okey'
}

main('ee4fae79-3c2a-4e7e-84b9-76e9d45a1379', new Date('2025-11-17')).then(
    data => {
        console.log(data)
    }
)