"use server";

import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const adminGetOrder = async () => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { error: "Yu're not allowed to be here!" };
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!orders || orders.length === 0) {
    return;
  }
  return { success: "Allowed Server Action!" };
};
