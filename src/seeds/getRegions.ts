import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    const regions = await prisma.region.findMany({
        include:{
            District:{
                select:{
                    distName:true,
                    Commune:{
                      select:{
                        comName:true
                      }   
                    }
                }
            }
        }
    })
    return regions
}

main().then(
    data => {
        console.log(data)
    }
)