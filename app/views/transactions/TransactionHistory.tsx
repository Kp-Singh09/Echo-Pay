"use client";

import { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import particlesOptions from "@libs/particlesConfig";
import Tilt from "react-parallax-tilt";

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
  const [showParticles, setShowParticles] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth >= 768) {
      setShowParticles(true);
    }

    const fetchTransactions = async () => {
      const response = await fetch("/api/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "POST",
          dataBody: { id: localStorage.getItem("user_id") },
          type: "transactions",
          header: "",
          auth: true,
        }),
      });

      if (response.ok && response.status === 200) {
        const data = await response.json();
        setOnRampTransactions(data.data.onRampTransactions);
        setP2PTransactions(data.data.p2pTransactions);
        setIsLoading(false);
      } else {
        alert("Error fetching transactions");
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-32 px-4 sm:px-16 relative min-h-screen flex items-start sm:items-center justify-center bg-[#0A0F1F] text-white overflow-hidden">
      {mounted && showParticles && (
        <Particles
          id="tsparticles"
          init={loadSlim}
          options={particlesOptions}
          className="absolute inset-0 z-0 pointer-events-none"
        />
      )}

      <Tilt
        glareEnable
        glareMaxOpacity={0.2}
        scale={1}
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        transitionSpeed={250}
        className="w-full max-w-6xl z-10"
      >
        <div className="w-full p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-fuchsia-600 to-pink-400 animate-borderGlow">
          <div className="rounded-[inherit] p-6 sm:p-10 pb-4 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] shadow-[0_0_25px_#3B82F6] ring-2 ring-blue-500/10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-white drop-shadow-sm">
              Transactions History
            </h1>

            {/* Tabs */}
            <div className="w-full flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 mb-10">
  {/* First row: Added Money */}
  <button
    onClick={() => setActiveTab("addedMoney")}
    className={`px-6 py-3 rounded-xl text-base sm:text-lg font-medium ${
      activeTab === "addedMoney"
        ? "bg-[#0A0F1F] text-white shadow-md border-2 border-[#181F2A] ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F]"
        : "bg-transparent text-slate-300 border-2 border-[#181F2A] hover:bg-[#181F2A]/40 transition"
    }`}
  >
    Added Money
  </button>

  {/* Second row: Sent + Received */}
  <div className="flex gap-4">
    {["sent", "received"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-6 py-3 rounded-xl text-base sm:text-lg font-medium ${
          activeTab === tab
            ? "bg-[#0A0F1F] text-white shadow-md border-2 border-[#181F2A] ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F]"
            : "bg-transparent text-slate-300 border-2 border-[#181F2A] hover:bg-[#181F2A]/40 transition"
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
</div>


            {/* Tab Contents */}
            {activeTab === "addedMoney" && (
              <TransactionCard title="OnRamp Transactions" data={onRampTransactions} type="onRamp" />
            )}
            {activeTab === "sent" && (
              <TransactionCard
                title="Sent Transactions"
                data={p2pTransactions.filter(
                  (txn) => txn.sender === localStorage.getItem("user_number")
                )}
                type="p2pSent"
              />
            )}
            {activeTab === "received" && (
              <TransactionCard
                title="Received Transactions"
                data={p2pTransactions.filter(
                  (txn) => txn.receiver === localStorage.getItem("user_number")
                )}
                type="p2pReceived"
              />
            )}
          </div>
        </div>
      </Tilt>
    </div>
  );
}

type TransactionCardProps = {
  title: string;
  data: any[];
  type: "onRamp" | "p2pSent" | "p2pReceived";
};

function TransactionCard({ title, data, type }: TransactionCardProps) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full bg-[#181F2A]/90 rounded-2xl shadow-2xl p-6 sm:p-8 mb-8 backdrop-blur-md ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F]">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">{title}</h2>
      <div className="border-t border-gray-700 pt-6">
        {paginatedData.length > 0 ? (
          paginatedData.map((txn, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6 last:mb-0 border-b border-gray-700 pb-4"
            >
              <div className="flex-1 min-w-0">
                <div className="text-base sm:text-lg font-semibold mb-1">
                  {type === "onRamp"
                    ? txn.bank || "From Bank"
                    : type === "p2pSent"
                    ? `To: ${txn.receiver}`
                    : `From: ${txn.sender}`}
                </div>
                <div className="text-gray-400 text-sm sm:text-base truncate">
                  {new Date(txn.timeStamp).toLocaleString()}
                </div>
              </div>

              <div className="flex flex-row justify-between sm:justify-end gap-4 w-full sm:w-auto">
                <div className="text-lg sm:text-2xl font-semibold text-white">
                  {type === "p2pSent" ? `- ₹${txn.amount}` : `+ ₹${txn.amount}`}
                </div>
                <div
                  className={`text-sm sm:text-xl font-semibold ${
                    txn.status === "success" ? "text-green-400" : "text-red-700"
                  }`}
                >
                  {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400">No transactions found.</div>
        )}

        {data.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-2 sm:gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 text-sm bg-[#0F172A] border border-blue-500 rounded disabled:opacity-30"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-sm text-blue-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 text-sm bg-[#0F172A] border border-blue-500 rounded disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
