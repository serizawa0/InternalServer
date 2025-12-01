import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    const chats = await prisma.chat.findMany()
    return chats
}

main().then(
    data => {
        console.log(data)
    }
)