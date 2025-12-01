import { PrismaClient } from "../generated/prisma";
import brcypt from 'bcrypt'

const prisma = new PrismaClient()

const main = async () => {
    const hashed = await brcypt.hash('serizawa', 12)
    // console.log(hashed)
    const user = await prisma.user.create({
        data:{
            email:'gbl.itmanagement@gmail.com',
            password:hashed,
            post:'Responsable',
            userName:'Serizawa',
            depId:'5cefb4e8-346c-433c-99c3-093c82aa5787',
            avatarFile:'avatar0.jpeg'
        }
    })
    return user
}

main().then(
    data => {
        console.log(data)
    }
)