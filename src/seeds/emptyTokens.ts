import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    await prisma.token.deleteMany()
    return 'Table Tokens vidée avec succès'
}

main().then(
    data => {
        console.log(data)
    }
)