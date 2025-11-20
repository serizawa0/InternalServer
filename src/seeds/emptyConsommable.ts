import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    await prisma.consommableCat.deleteMany()
    return 'okey'
}

main().then(
    data => {
        console.log('Stock consommables vidée avec succès')
    }
)