import { PrismaClient } from "../generated/prisma";
import brcypt from 'bcrypt'

const prisma = new PrismaClient()

const main = async () => {
    const hashed = await brcypt.hash('ramaroson', 12)
    // console.log(hashed)
    const user = await prisma.user.create({
        data:{
            email:'ramarosoncathia@gmail.com',
            password:hashed,
            post:'Responsable Projet',
            userName:'NdremaPoun',
            depId:'660b78c4-c19f-4616-8efb-96da03f2c0b6',
            avatarFile:'avatar1.jpeg'
        }
    })
    return user
}

main().then(
    data => {
        console.log(data)
    }
)