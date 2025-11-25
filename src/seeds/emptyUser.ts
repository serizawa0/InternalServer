import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient()

const main = async () => {
    await prisma.user.deleteMany()
    return 'okey'
}
main().then(
    data => {
        console.log('Table User vidée avec succès')
    }
)