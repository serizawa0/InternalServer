import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    await prisma.famille.create({
        data:{
            famName:'Equipements et Outillages',
            abr:'EQO',
            ArtCat:{
                create:[
                    {
                        catName:'Outils manuels',
                        abr:'EQO-OM'
                    },
                    {
                        catName:'Outils électriques',
                        abr:'EQO-OE'
                    },
                    {
                        catName:'Équipements de sécurité',
                        abr:'EQO-ES'
                    }
                ]
            }
        }
    })
    const famille = await prisma.famille.findMany({
        include:{
            ArtCat:true
        }
    })
    return famille
}

main().then(
    data => {
        console.log(data)
    }
)