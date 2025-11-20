import { PrismaClient } from "../generated/prisma";

const prisma =  new PrismaClient()

const main = async () => {
    await prisma.consommableCat.create({
        data:{
            nomCat:'Fournitures électriques',
            Consommable:{
                create:[
                    {
                        libele:'Câble',
                        quantite:50,
                        unite:'m'
                    },
                    {
                        libele:'Ampoule 50W',
                        quantite:20,
                        unite:'pcs'
                    }
                ]
            }
        }
    })
    const consommables = await prisma.consommableCat.findMany({
        include:{
            Consommable:true
        }
    })
    return consommables
}

main().then(
    data => {
        console.log(data)
    }
)