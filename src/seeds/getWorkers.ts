import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    const workers = await prisma.worker.findMany({
        include:{
            Categorie:true
        }
    })
    console.log(workers)
    return true
}

main().then(data => {
    console.log(data)
})