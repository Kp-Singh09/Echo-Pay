import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { SentTransactions } from "../../../components/p2ptransactions";
import { SentTransactions2 } from "../../../components/p2ptransactions2";
import { OnRampTransaction, p2pTransfer } from "@repo/db/money";
import Link from "next/link";


async function getOnRampTransactions(userId: number) {
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: userId,
        },
    });
    return txns.map((t: OnRampTransaction) => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
    }));
}


async function p2pSent(userId: number) {
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: userId,
        },
    });
    return txns.map((t: p2pTransfer) => ({
        timestamp: t.timestamp,
        amount: t.amount,
        toUserId: t.toUserId,
    }));
}


async function p2pReceived(userId: number) {
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: userId,
        },
    });
    return txns.map((t: p2pTransfer) => ({
        timestamp: t.timestamp,
        amount: t.amount,
        fromUserId: t.fromUserId,
    }));
}

export default async function TransactionsPage({ searchParams }: { searchParams: { tab?: string } }) {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    const activeTab = searchParams.tab || 'onRamp';

    let transactions: any[] = [];
 

    if (activeTab === 'onRamp') {
        transactions = await getOnRampTransactions(userId);
    } else if (activeTab === 'sent') {
        transactions = await p2pSent(userId);
    } else if (activeTab === 'received') {
        transactions = await p2pReceived(userId);
    }

    return (
        <div className="w-full">
            <div className="text-4xl text-gray-950 pt-8 mb-8 font-bold">
                Transactions
            </div>
            <div className="flex justify-center mb-4">
                <Link
                    href="?tab=onRamp"
                    className={`px-4 py-2 rounded-lg ${
                        activeTab === 'onRamp' ? 'bg-gray-950 text-slate-50' : ' border-2 border-gray-950'
                    }`}
                >
                    Added Money
                </Link>
                <Link
                    href="?tab=sent"
                    className={`ml-4 px-4 py-2 rounded-lg ${
                        activeTab === 'sent' ? 'bg-gray-950 text-slate-50' : ' border-2 border-gray-950'
                    }`}
                >
                    Sent
                </Link>
                <Link
                    href="?tab=received"
                    className={`ml-4 px-4 py-2 rounded-lg ${
                        activeTab === 'received' ? 'bg-gray-950 text-slate-50' : ' border-2 border-gray-950'
                    }`}
                >
                    Received
                </Link>
            </div>
            <div className="w-full flex flex-1 justify-center">
    {activeTab === 'onRamp' && (
      <div className="w-full pt-4 flex justify-center">
        <OnRampTransactions transactions={transactions} />
      </div>
    )}
    {(activeTab === 'sent') && (
      <div className="w-full pt-4 flex justify-center">
        <SentTransactions transactions={transactions} />
      </div>
    )}
      {(activeTab === 'received') && (
      <div className="w-full pt-4 flex justify-center">
        <SentTransactions2 transactions={transactions} />
      </div>
    )}
</div>

        </div>
    );
}

