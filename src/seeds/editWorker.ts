import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    await prisma.worker.update({
        where:{
            id:'2f8b0adf-71d3-46f5-be64-83d32f02b83e'
        },
        data:{
            fullName:'RATOVONDRAHONA Nasandratra'
        }
    })
    return 'okey'
}

main().then(
    data => {
        console.log(data)
    }
)