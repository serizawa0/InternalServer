import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    const tokens = await prisma.token.findMany()
    return tokens
}
main().then(
    data => {
        console.log(data)
    }
)