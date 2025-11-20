import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    const deps = await prisma.departement.createMany({
        data:[
            {
                depName:'Direction'
            },
            {
                depName:'SAQ+LOG'
            },
            {
                depName:'Admin'
            },
            {
                depName:'IT'
            },
            {
                depName:'Reporting'
            },
            {
                depName:'FLEET'
            },
            {
                depName:'RIGGERS'
            },
            {
                depName:'Energie'
            }
        ]
    })
    return deps
}

main().then(
    data => {
        console.log(data)
    }
)


