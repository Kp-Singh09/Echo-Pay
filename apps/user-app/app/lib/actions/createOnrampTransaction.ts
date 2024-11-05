"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { Prisma } from "@prisma/client";

export async function createOnRampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        };
    }
    const token = (Math.random() * 1000).toString();

    if (provider === "Demo Bank") {
        await prisma.$transaction(async (prisma: Prisma.TransactionClient) => {
            await prisma.onRampTransaction.create({
                data: {
                    provider,
                    status: "Success", 
                    startTime: new Date(),
                    token: token,
                    userId: Number(session.user.id),
                    amount: amount * 100
                }
            });
            await prisma.balance.update({
                where: {
                    userId: Number(session.user.id)
                },
                data: {
                    amount: {
                        increment: amount * 100
                    }
                }
            });
        });

        return {
            message: "Money added successfully"
        };
    } else {
        await prisma.onRampTransaction.create({
            data: {
                provider,
                status: "Pending",
                startTime: new Date(),
                token: token,
                userId: Number(session.user.id),
                amount: amount * 100
            }
        });

        return {
            message: "Transaction initiated"
        };
    }
}
