import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

export async function login(userName: string, password: string) {
  const user = await prisma.user.findUnique({
    where:{
        userName
    }
  });

  if (!user) {
    return { ok: false, error: "Utilisateur introuvable" };
  }

  const valid = await bcrypt.compare(password, user.password);
  const { password: _, ...safeUser } = user;
  if (!valid) {
    return { ok: false, error: "Mot de passe incorrect" };
  }

  return { ok: true, safeUser };
}
