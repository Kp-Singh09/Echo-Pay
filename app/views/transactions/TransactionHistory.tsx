"use client"
import { useState, useEffect } from "react";

interface OnRampTransaction {
    timeStamp: string;
    amount: number;
    bank: string;
    status: string;
}

interface P2PTransaction {
    timeStamp: string;
    amount: number;
    status: string;
    sender: string;
    receiver: string;
}

export default function TransactionHistory() {
    const [activeTab, setActiveTab] = useState("addedMoney");
    const [onRampTransactions, setOnRampTransactions] = useState<OnRampTransaction[]>([]);
    const [p2pTransactions, setP2PTransactions] = useState<P2PTransaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await fetch("/api/details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    method: "POST",
                    dataBody: { id: localStorage.getItem("user_id") },
                    type: "transactions",
                    header: "",
                    auth: true,
                }),
            });
            if(response.ok && response.status === 200){    
                const data = await response.json();
                setOnRampTransactions(data.data.onRampTransactions);
                setP2PTransactions(data.data.p2pTransactions);
                setIsLoading(false);
            }
            else{
                alert("Error fetching transactions");
                setIsLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    if(isLoading){
        return <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    }

        return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-[#0A0F1F] pt-22">
      <h1 className="text-4xl font-bold mb-10 text-[var(--foreground)] tracking-tight drop-shadow-sm">Transactions History</h1>
      {/* Tabs */}
      <div className="flex gap-6 mb-10">
        <button className={`px-8 py-3 rounded-xl text-lg font-medium ${activeTab === "addedMoney" ? "bg-[#0A0F1F] text-white shadow-md border-2 border-[#181F2A] ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F] focus:outline-none" : "bg-transparent text-[var(--foreground)] border-2 border-[#181F2A] hover:bg-[#181F2A]/40 transition"}`} onClick={() => setActiveTab("addedMoney")}>Added Money</button>
        <button className={`px-8 py-3 rounded-xl text-lg font-medium ${activeTab === "sent" ? "bg-[#0A0F1F] text-white shadow-md border-2 border-[#181F2A] ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F] focus:outline-none" : "bg-transparent text-[var(--foreground)] border-2 border-[#181F2A] hover:bg-[#181F2A]/40 transition"}`} onClick={() => setActiveTab("sent")}>Sent</button>
        <button className={`px-8 py-3 rounded-xl text-lg font-medium ${activeTab === "received" ? "bg-[#0A0F1F] text-white shadow-md border-2 border-[#181F2A] ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F] focus:outline-none" : "bg-transparent text-[var(--foreground)] border-2 border-[#181F2A] hover:bg-[#181F2A]/40 transition"}`} onClick={() => setActiveTab("received")}>Received</button>
      </div>

      {/* Transaction Cards by Tab */}
      {activeTab === "addedMoney" && (
        <div className="w-full max-w-4xl bg-[#181F2A]/90 rounded-2xl shadow-2xl p-10 mb-8 backdrop-blur-md ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--foreground)]">OnRamp Transactions</h2>
          <div className="border-t border-gray-700 pt-6">
            {onRampTransactions.length > 0 ? (
              onRampTransactions.map((txn, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 last:mb-0">
                  {/* Bank and Time */}
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-semibold text-[var(--foreground)] mb-1">{txn.bank ? txn.bank : 'From Bank'}</div>
                    <div className="text-gray-400 text-base truncate">{new Date(txn.timeStamp).toLocaleString()}</div>
                  </div>
                  {/* Amount */}
                  <div className="flex-1 min-w-0 flex justify-center">
                    <div className="text-2xl font-semibold text-white">+ Rs {txn.amount}</div>
                  </div>
                  {/* Status */}
                  <div className="flex-1 min-w-0 flex justify-end">
                    <div className={`text-xl font-semibold ${txn.status === 'success' ? 'text-green-400' : 'text-red-700'}`}>{txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400">No OnRamp transactions found.</div>
            )}
          </div>
        </div>
      )}

      {activeTab === "sent" && (
        <div className="w-full max-w-4xl bg-[#181F2A]/90 rounded-2xl shadow-2xl p-10 mb-8 backdrop-blur-md ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--foreground)]">Sent Transactions</h2>
          <div className="border-t border-gray-700 pt-6">
            {p2pTransactions.filter(txn => txn.sender === localStorage.getItem('user_number')).length > 0 ? (
              p2pTransactions.filter(txn => txn.sender === localStorage.getItem('user_number')).map((txn, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 last:mb-0">
                  {/* Receiver and Time */}
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-semibold text-[var(--foreground)] mb-1">To: {txn.receiver}</div>
                    <div className="text-gray-400 text-base truncate">{new Date(txn.timeStamp).toLocaleString()}</div>
                  </div>
                  {/* Amount */}
                  <div className="flex-1 min-w-0 flex justify-center">
                    <div className="text-2xl font-semibold text-white">- Rs {txn.amount}</div>
                  </div>
                  {/* Status */}
                  <div className="flex-1 min-w-0 flex justify-end">
                    <div className={`text-xl font-semibold ${txn.status === 'success' ? 'text-green-400' : 'text-red-700'}`}>{txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400">No Sent transactions found.</div>
            )}
          </div>
        </div>
      )}

      {activeTab === "received" && (
        <div className="w-full max-w-4xl bg-[#181F2A]/90 rounded-2xl shadow-2xl p-10 mb-8 backdrop-blur-md ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--foreground)]">Received Transactions</h2>
          <div className="border-t border-gray-700 pt-6">
            {p2pTransactions.filter(txn => txn.receiver === localStorage.getItem('user_number')).length > 0 ? (
              p2pTransactions.filter(txn => txn.receiver === localStorage.getItem('user_number')).map((txn, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 last:mb-0">
                  {/* Sender and Time */}
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-semibold text-[var(--foreground)] mb-1">From: {txn.sender}</div>
                    <div className="text-gray-400 text-base truncate">{new Date(txn.timeStamp).toLocaleString()}</div>
                  </div>
                  {/* Amount */}
                  <div className="flex-1 min-w-0 flex justify-center">
                    <div className="text-2xl font-semibold text-white">+ Rs {txn.amount}</div>
                  </div>
                  {/* Status */}
                  <div className="flex-1 min-w-0 flex justify-end">
                    <div className={`text-xl font-semibold ${txn.status === 'success' ? 'text-green-400' : 'text-red-700'}`}>{txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400">No Received transactions found.</div>
            )}
          </div>
        </div>
      )}
    </div>
    )
}