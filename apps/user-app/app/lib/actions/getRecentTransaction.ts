"use server"
import prisma from "@balancebox/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function getRecentTransaction() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id;

  const transaction = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(user),
    },
    orderBy: {
      startTime: "desc",
    },
    take: 5,
  });

  return transaction;
}
