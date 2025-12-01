import { PrismaClient } from "../generated/prisma";

const prisma  = new PrismaClient()

const main = async () => {
    await prisma.departement.deleteMany()
    return 'Table Departements vidée avec succès'
}
main().then(
    data => {
        console.log(data)
    }
)