"use server";

import { prisma } from "@/utils/prisma";


export async function createUser(values: any) {
    try {
      const { nom, email, password, type } = values;
      const user = await prisma.user.findFirst({
        where: { email: email },
      });
      if (user) {
        return { success: false, message: 'User already exists'}
    }
      const res = await prisma.user.create({
        data: {
          name: nom,
          email: email,
          password: password,
          numtel: 0,
          type: type,
        },
      });

      if (!res)
      {
        return { success: false, message: 'An error occurred while creating the user.' };
      }

      return { success: true, message: 'User created successfully.' };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
