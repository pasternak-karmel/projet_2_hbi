"use server";

import { currentRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};

export const adminYears = async () => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden Server Action!" };
  }

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const orders = await db.order.findMany();

  const trailingYearOrders = await db.order.findMany({
    where: {
      createdAt: {
        gte: oneYearAgo,
      },
    },
  });

  const grossRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

  const averageOrderValue =
    orders.length > 0 ? grossRevenue / orders.length : 0;

  const trailingYearRevenue = trailingYearOrders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

  return {
    grossRevenue,
    averageOrderValue,
    trailingYearRevenue,
  };
};
