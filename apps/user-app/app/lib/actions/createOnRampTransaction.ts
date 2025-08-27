"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@balancebox/db/client";

export async function onRampTransaction(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  if (!userId) {
    return {
      message: "User not logged in",
    };
  }

  await prisma.onRampTransaction.create({
    data: {
      userId : Number(userId),
      amount: amount * 100,
      provider,
      status: "Processing",
      startTime: new Date(),
      token,
    },
  });

  return {
    message: "Transaction created successfully",
  };
}
