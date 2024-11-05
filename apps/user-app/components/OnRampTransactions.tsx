"use client";
import { useState } from 'react';
import { Card2 } from "@repo/ui/card2";
import { OnRampStatus } from "@repo/db/OnRampStatus";

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: OnRampStatus,
    }[]
}) => {
    const [showAll, setShowAll] = useState(false);

    const sortedTransactions = [...transactions].sort((a, b) => b.time.getTime() - a.time.getTime());

    const visibleTransactions = showAll ? sortedTransactions : sortedTransactions.slice(0, 4);

    const handleToggleView = () => {
        setShowAll(!showAll);
    };

    if (!transactions.length) {
        return (
            <Card2 title="Received Transactions">
                <div className="text-center pb-8 pt-8">
                    No added transactions
                </div>
            </Card2>
        );
    }

    return (
        <Card2 title="Added Money Transactions">
            <div className="pt-2">
                {visibleTransactions.map(t => (
                    <div className="flex justify-between mb-2" key={t.time.toString()}>
                        <div>
                            <div className="text-md">
                                Received INR
                            </div>
                            <div className="text-slate-600 text-sm">
                                {t.time.toLocaleString()}
                            </div>
                        </div>
                        <div className="flex flex-col text-lg justify-center">
                            + Rs {t.amount / 100}
                        </div>
                        <div className={`text-lg font-bold ${getStatusColorClass(t.status)}`}>
                            {t.status}
                        </div>
                    </div>
                ))}

                {transactions.length > 4 && (
                    <div className="flex justify-center mt-8">
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

const getStatusColorClass = (status: OnRampStatus): string => {
    switch (status) {
        case OnRampStatus.Success:
            return "text-green-600";
        case OnRampStatus.Pending:
            return "text-yellow-600";
        case OnRampStatus.Failure:
            return "text-red-600";
        default:
            return "";
    }
};
