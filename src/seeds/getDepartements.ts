import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () =>  {
    const deps = await prisma.departement.findMany()
    return deps
}

main().then(
    data => console.log(data)
)