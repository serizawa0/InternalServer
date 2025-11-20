import express, { Request, Response } from "express";
import { PrismaClient } from "./generated/prisma";
import cors from 'cors'
import { startOfDay } from "date-fns";
import { countWorkTime } from "./functions/passagesFunctions";
import { login } from "./functions/userFunctions";

const app = express();
const PORT = 3600;

const prisma = new PrismaClient()

// Middleware pour JSON
app.use(express.json())
app.use(cors());

// Route de test
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Serveur Node.js + TypeScript fonctionne !");
});

app.get('/workers', async (req,res) => {
  const workers = await prisma.worker.findMany()
  res.json(workers)
})
app.get('/stock', async (req,res) => {
  const stock =  await prisma.famille.findMany({
    include:{
      ArtCat:{
        include:{
          Article:true
        }
      }
    }
  })
  res.json(stock)
})
app.post('/subEquipment', async (req,res) => {
  const { id, abr, artName, quantity, unite } = req.body
  const artC = await prisma.artCat.findFirst({
    where:{
      id
    }
  })
  if(artC){
    await prisma.article.create({
      data:{
        abr:artC.abr+'-'+abr,
        artName,
        quantite:quantity,
        unite,
        stock:quantity,
        artCatId:id
      }
    })
    res.json({data:'okey'})
  }
  else{
    res.json({data:'tsy okey'})
  }
})
app.post('/dellEquipment', async (req,res) => {
  const { id} = req.body
  await prisma.article.delete({
    where:{
      id
    }
  })
  res.json({data:'okey'})
})

app.post('/addArtCat', async (req,res) => {
  const { id, abr, catName } = req.body
  const family = await prisma.famille.findFirst({
    where:{
      id
    }
  })
  if(family){
    await prisma.artCat.create({
      data:{
        abr:family.abr+'-'+abr,
        catName,
        familleId:family.id
      }
    })
    res.json({data:'okey'})
  }
  else{
    res.json({data:'tsy okey'})
  }
})
app.post('/deleteArtCat', async (req,res) => {
  const { id } = req.body
  await prisma.artCat.delete({
    where:{
      id
    }
  })
  res.json({data:'okey'})
})


//Family
app.post('/addFamily', async (req,res) => {
  const { abr, famName } = req.body
  await prisma.famille.create({
    data:{
      abr,
      famName
    }
  })
  res.json({
    data:'okey'
  })
})

app.post('/deleteFamily', async (req,res) => {
  const { id } = req.body
  await prisma.famille.delete({
    where:{
      id
    }
  })
  res.json({data:'okey'})
})

//Consommables
app.get('/consommables', async (req,res) => {
  const consommables = await prisma.consommableCat.findMany({
    include:{
      Consommable:true
    }
  })
  res.json(consommables)
})

app.post('/addConsommable', async (req,res) => {
  const { consommableCatId, libele, quantite, unite } = req.body
  await prisma.consommable.create({
    data:{
      libele,
      quantite,
      unite,
      consommableCatId
    }
  })
  res.json({data:'okey'})
})

app.post('/deleteConsommable', async (req, res) => {
  const { id } = req.body
  await prisma.consommable.delete({
    where:{
      id
    }
  })
  res.json({data:'okey'})
})


//ConsommableCat
app.post('/addConsommableCat', async (req,res) => {
  const { nomCat } = req.body
  const isAlreadythere = await prisma.consommableCat.findFirst({
    where:{
      nomCat
    }
  })
  if(!isAlreadythere){
    const c = await prisma.consommableCat.create({
      data:{
        nomCat
      }
    })
    if(c){
      res.json({data:'okey'})
    }
    else{
      res.json({data:'tsy okey'})
    }
  }
  else{
    res.json({data:'efa ao'})
  }
})
app.post('/deleteConsommableCat', async (req,res) => {
  const { id } = req.body
  const isThere = await prisma.consommableCat.findFirst({
    where:{
      id
    }
  })
  if(isThere){
    await prisma.consommableCat.delete({
      where:{id}
    })
    res.json({data:'delete completed'})
  }
  else{
    res.json({data:'element not found'})
  }
})


//Passages
app.post('/passages', async (req,res) => {
  const date = req.body.date
  const passages = await prisma.passage.findMany({
    where:{
      date:startOfDay(date)
    },
    orderBy:{
      createdAt:"asc"
    },
    include:{
      Worker:{
        select:{
          id:true,
          fullName:true,
          Categorie:true,
          post:true,
          matricule:true
        }
      }
    }
  })
  res.json(passages)
})

app.post('/deletePassage', async (req,res) => {
  const id = req.body.id
  const passage = await prisma.passage.findFirst({
    where:{
      id
    }
  })
  if(passage){
    await prisma.passage.delete({
      where:{
        id:passage.id
      }
    })
    res.json({data:'okey'})
  }
  else{
    res.json({data:'passage introuvable'})
  }
})

app.post('/editPassage' ,async (req,res) => {
  const id = req.body.id
  const type = req.body.type
  await prisma.passage.update({
    where:{
      id
    },
    data:{
      type
    }
  })
  res.json({data:'okey'})  
})

app.post('/exportTime', async (req,res) => {
  const date = req.body.date
  const selectedDate = startOfDay(date)
  const c = await countWorkTime(selectedDate)
  const durations = await Promise.all(
    (await c).map( async (t) => {
        await prisma.dailyTimer.deleteMany({
          where:{
            id:t.userId,
            date:selectedDate
          }
        })
        const dT = await prisma.dailyTimer.create({
          data:{
            date:selectedDate,
            totalMs:t.duration,
            WorkerId:t.userId,
            differentiel:(t.duration-28800000)
          },
          include:{
            Worker:true
          }
        })
        return dT
    } )
  )
  res.json(JSON.parse(JSON.stringify({ data: durations }, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  )));
})



//Login
app.post('/login', async (req,res) => {
  const { userName, password } = req.body
  const result = await login(userName, password)
  if(!result.ok){
    res.json({
      data :'login denied'
    })
  }
  else{
    res.json({
      data:result.safeUser
    })
  }
})

// Démarrage du serveur
app.listen(PORT, '0.0.0.0' ,() => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
