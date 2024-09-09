"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { CreateLivreurSchema } from "@/schemas";
import { UserRole } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { CreateLivreur } from "@/lib/mail";
import { fetchUserRole } from "@/lib/fetchUserRole";

function generateRandomPassword(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

export const GetLivreur = async () => {
  const role = await fetchUserRole();

  if (role !== UserRole.ADMIN) return { error: "accès refusé" };

  const livreur = await db.user.findMany({
    where: {
      role: "AGENT",
    },
  });
  if (livreur.length === 0) return { error: "Aucun livreur diponible" };

  return { livreur };
};

export const LivreurCreated = async (
  values: z.infer<typeof CreateLivreurSchema>,
  callbackUrl?: string | null
) => {
  const role = await fetchUserRole();

  if (role !== UserRole.ADMIN) return { error: "accès refusé" };

  const validatedFields = CreateLivreurSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser?.email) {
    return { error: "A user with this email already exist" };
  }
  const password = generateRandomPassword();
  console.log(password);

  const hashedPassword = await bcrypt.hash(password, 10);
  const create = await db.user.create({
    data: {
      name: values.name,
      email: values.email,
      password: hashedPassword,
      role: "AGENT",
    },
  });
  if (!create) return { error: "Fail to create livreur" };
  await CreateLivreur(values.email, password);
  return { succes: "Livreur créer avec succès" };
};

// livreur1: CA!!JhmQEsaC
// carmeljohnson14@gmail.com: hESp3z1xee5E
