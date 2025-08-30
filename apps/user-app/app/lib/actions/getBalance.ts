"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@balancebox/db/client";

export async function getBalance() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      amount: 0,
      locked: 0
    };
  }

  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(userId)
    },
    select: {
      amount: true,
      locked: true
    }
  });

  // Return default values if no balance record exists, and convert from paise to rupees
  return balance ? {
    amount: balance.amount / 100,
    locked: balance.locked / 100
  } : {
    amount: 0,
    locked: 0
  };
}
