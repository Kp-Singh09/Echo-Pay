"use client";
import { useState } from 'react';
import { Card2 } from "@repo/ui/card2";

export const SentTransactions2 = ({
    transactions
}: {
    transactions: {
        amount: number,
        timestamp: Date,
        toUserId: number,
        fromUserId: number
    }[]
}) => {
    const [showAll, setShowAll] = useState(false);

    
    const sortedTransactions = [...transactions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    const visibleTransactions = showAll ? sortedTransactions : sortedTransactions.slice(0, 4);

    const handleToggleView = () => {
        setShowAll(!showAll);
    };

    if (!transactions.length) {
        return (
            <Card2 title="Received Transactions">
                <div className="text-center pb-8 pt-8">
                    No received transactions
                </div>
            </Card2>
        );
    }

    return (
        <Card2 title="Received Transactions">
            <div className="pt-2">
                {visibleTransactions.map((t, index) => (
                    <div className="flex justify-between mb-2" key={index}>
                        <div>
                            <div className="text-md">
                                From user ID: {t.fromUserId}
                            </div>
                            <div className="text-slate-600 text-sm">
                                {t.timestamp.toLocaleString()}
                            </div>
                        </div>
                        <div className="flex flex-col text-lg justify-center">
                            + Rs {t.amount / 100}
                        </div>
                        <div className={`text-lg font-bold text-green-600`}>
                            Success
                        </div>
                    </div>
                ))}

                {transactions.length > 4 && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleToggleView}
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-950 rounded-lg hover:bg-gray-700"
                        >
                            {showAll ? "View Less" : "View More"}
                        </button>
                    </div>
                )}
            </div>
        </Card2>
    );
};
