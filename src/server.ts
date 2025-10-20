import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Middleware pour JSON
app.use(express.json());

// Route de test
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Serveur Node.js + TypeScript fonctionne !");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
