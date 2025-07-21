"use client"

import { useEffect, useState } from "react";

interface AccountData {
    id: string;
    phone: string;
    balance: number;
}


export default function AccountDetails() {
    const [accountData, setAccountData] = useState<AccountData>({
        id: "",
        phone: "",
        balance: 0,
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAccountData = async () => {
            const response = await fetch("/api/details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    method: "POST",
                    dataBody: {id:localStorage.getItem("user_id")},
                    type: "account-details",
                    header: "",
                    auth: true,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setAccountData(data.data);
                setIsLoading(false);
            }
        };
        fetchAccountData();
    }, []);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0F1F]">
        <h1 className="text-4xl font-bold mb-10 text-[var(--foreground)] tracking-tight drop-shadow-sm">
          Account Details
        </h1>
        <div className="w-full max-w-md bg-[#181F2A]/90 rounded-2xl shadow-2xl p-8 backdrop-blur-md ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--foreground)]">Details</h2>
          <div className="divide-y divide-gray-700">
            <div className="flex justify-between py-4">
              <span className="text-lg text-gray-300">Your Id</span>
              <span className="font-medium text-[var(--foreground)]">{accountData.id}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-lg text-gray-300">Your Phone No.</span>
              <span className="font-medium text-[var(--foreground)]">{accountData.phone}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-lg text-gray-300">Available Balance</span>
              <span className="font-semibold text-green-400 text-xl">₹ {accountData.balance}</span>
            </div>
          </div>
        </div>
      </div>
    )
}