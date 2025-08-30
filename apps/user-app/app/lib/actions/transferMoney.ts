"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@balancebox/db/client";

export const transferMoney = async (amount: number, toPhoneNumber: string) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  // Check authentication first
  if (!userId) {
    return { success: false, message: "User not authenticated" };
  }

  // Find recipient by phone number
  const findUser = await prisma.user.findUnique({
    where: {
      number: toPhoneNumber,
    },
  });

  if (!findUser) {
    return { success: false, message: "Recipient not found. Please check the phone number." };
  }

  // Check if user is trying to send money to themselves
  if (Number(userId) === findUser.id) {
    return { success: false, message: "You cannot send money to yourself." };
  }

  let transactionId: number | null = null;

  try {
    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        fromUserId: Number(userId),
        toUserId: findUser.id,
        amount: amount * 100,
        status: "Processing",
      },
    });

    transactionId = transaction.id;

    // Perform the money transfer
    const result = await prisma.$transaction(async (tx) => {
      // Lock both sender's and recipient's balance to prevent race conditions
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" IN (${Number(userId)}, ${findUser.id}) FOR UPDATE`;

      // Check sender's balance within the transaction
      const senderBalance = await tx.balance.findFirst({
        where: { userId: Number(userId) },
      });

      if (!senderBalance || senderBalance.amount < amount * 100) {
        // Update transaction status to failed within the transaction
        if (transactionId) {
          await tx.transaction.update({
            where: { id: transactionId },
            data: { status: "Failure" },
          });
        }
        throw new Error("Insufficient balance");
      }

      // Perform the transfer
      await tx.balance.update({
        where: { userId: Number(userId) },
        data: { amount: { decrement: amount * 100 } },
      });

      await tx.balance.update({
        where: { userId: findUser.id },
        data: { amount: { increment: amount * 100 } },
      });

      // Update transaction status to success
      if (transactionId) {
        await tx.transaction.update({
          where: { id: transactionId },
          data: { status: "Success" },
        });
      }

      return { success: true, message: "Transfer successful", transactionId };
    });

    return result;

  } catch (error) {
    console.error("Transfer failed:", error);
    
    // Update transaction status to failed (best effort)
    if (transactionId) {
      try {
        await prisma.transaction.update({
          where: { id: transactionId },
          data: { status: "Failure" },
        });
      } catch (updateError) {
        console.error("Failed to update transaction status:", updateError);
      }
    }
    
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Transfer failed" 
    };
  }
};
