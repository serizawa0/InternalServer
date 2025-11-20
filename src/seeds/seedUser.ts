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
            userName:'serizawa',
            depId:'389ba7c8-18ba-455e-be76-0c228ce016d6'
        }
    })
    return user
}

main().then(
    data => {
        console.log(data)
    }
)