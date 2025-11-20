import { mainModule } from "process";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    const famille = await prisma.famille.findMany({
        include:{
            ArtCat:{
                select:{
                    catName:true,
                    abr:true
                }
            }
        }
    })
    return famille
}

main().then(
    data => {
        console.log(data)
    }
)