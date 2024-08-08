"use server";

import { prisma } from "@/utils/prisma";


export async function createTodo(values: any) {
    try {
      const { nom, email, password, type } = values;
      const res = await prisma.user.create({
        data: {
          name: nom,
          email: email,
          password: password,
          numtel: 0,
          type: type,
        },
      });
      
    //   return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
