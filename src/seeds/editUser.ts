import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    await prisma.user.update({
        where:{
            id:'24604320-fcc8-4f79-a3fa-5776a4b51a1b'
        },
        data:{
           avatarFile:'avatar4.jpeg' 
        }
    })
    return 'okey'
}

main().then(
    data => {
        console.log('okey')
    }
)