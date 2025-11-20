import { startOfDay } from "date-fns";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    const date = new Date('2025-11-19')
    const selectedDate = startOfDay(date)
    const passages = await prisma.passage.findMany({
        where:{
            date:selectedDate
        },
        include:{
            Worker:true
        }
    })
    return passages
}

main().then(
    data => {
        console.log(data)
    }
)