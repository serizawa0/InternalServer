import { endOfDay, startOfDay } from "date-fns";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

const listeUsers = async (date:Date) => {
    const selected = await prisma.worker.findMany({
        where:{
            Passage:{
                some:{
                    date:{
                        gte:startOfDay(date),
                        lte:endOfDay(date)
                    }
                }
            },
            // id:'64ce1e7b-d92d-4564-8bf1-28bf77b46757'
        },
    })
    return selected
}

export function msToTime(duration: number): string {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor(duration / (1000 * 60 * 60));

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
}

const comptage = async (userId:string, date:Date) => {
    let totalMS = 0
    let lastEntry:Date|null = null
    const d = startOfDay(date)
    const passages = await prisma.passage.findMany({
        where:{
            date:d,
            workerId:userId
        },
        orderBy:{
            createdAt:"asc"
        }
    })
    for(const p of passages){
        // if(p.type ==='entrée'){
        //     if(!lastEntry)
        //         lastEntry = p.createdAt
        // }
        // else if(p.type  === 'sortie'){
        //     if(lastEntry){
        //         totalMS+= p.createdAt.getTime() - lastEntry.getTime()
        //         lastEntry = null
        //     }
        // }
        if(p.type==='entrée'){
            if(!lastEntry){
                lastEntry = p.createdAt
            }
        }
        else if(p.type === 'sortie'){
            if(lastEntry){
                totalMS+= p.createdAt.getTime() - lastEntry.getTime()
                lastEntry = null
            }
        }
    }
    return totalMS
}


export const countWorkTime = async (data:Date) => {
    // const selected = startOfDay(data);
    // const passages = await prisma.passage.findMany({
    //     where:{
    //         date:selected,
    //         workerId:userId
    //     },
    //     orderBy:{
    //         createdAt:"asc"
    //     },
    //     include:{
    //         Worker:true
    //     }
    // })
    // if(passages.length%2!=0){
    //     return 'impair'
    // }
    // else{
    //     return 'pair'
    // }

    console.log(new Date(data))
    const liste = listeUsers(data)
    const durations = await Promise.all(
        (await liste).map( async (user) => {
            return { userId:user.id, duration: await comptage(user.id, data) }
        } )
    )

    return durations
}

