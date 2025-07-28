"use client";

import { useEffect, useState } from "react";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import particlesOptions from "@libs/particlesConfig";
import Tilt from "react-parallax-tilt";
import { motion, animate, useMotionValue } from "framer-motion";

interface TopUpEntry {
  bank: string;
  amount: number;
  date: string;
}
const ShimmerLoader = () => (
  <>
    <div className="grid grid-cols-3 text-xs text-gray-500 uppercase pb-1 border-b border-gray-700 mb-2">
      <span>Bank</span>
      <span className="text-right">Amount</span>
      <span className="text-right">Date</span>
    </div>

    <ul className="space-y-2 animate-pulse min-h-[240px]">
      {Array.from({ length: 5 }).map((_, idx) => (
        <li key={idx} className="grid grid-cols-3 gap-4 py-2 items-center">
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded w-20 animate-shimmer" />
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded w-16 ml-auto animate-shimmer" />
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded w-24 ml-auto animate-shimmer" />
        </li>
      ))}
    </ul>

    <div className="flex justify-between items-center mt-4 opacity-40">
      <button className="px-3 py-1 bg-gray-700 text-gray-200 rounded">Previous</button>
      <span className="text-sm text-gray-400">Loading...</span>
      <button className="px-3 py-1 bg-gray-700 text-gray-200 rounded">Next</button>
    </div>
  </>
);

export default function TopUp() {
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("Demo Bank");
  const [open, setOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [history, setHistory] = useState<TopUpEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [bankFilter, setBankFilter] = useState("All");

  const animatedBalance = useMotionValue(0);
  const [displayBalance, setDisplayBalance] = useState(0);
  const [glowTrigger, setGlowTrigger] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768;
      setShowParticles(!isMobile);
    }
  }, []);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amountNumber = Number(amount);

    if (amountNumber <= 0) {
      setSnackbarMsg("Amount must be greater than 0");
      setSnackbarType("error");
      setOpen(true);
      return;
    }

    setLoading(true);

    const response = await fetch("/api/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "POST",
        dataBody: {
          amount: amountNumber,
          bank,
          id: localStorage.getItem("user_id"),
        },
        type: "transfer",
        header: "",
        auth: true,
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok && data.status === 200) {
      setSnackbarMsg(data.message);
      setSnackbarType("success");
      setAmount("");
      setBank("Demo Bank");

      const newBalance = Number(data.newBalance);

      animate(animatedBalance, newBalance, {
        duration: 1.5,
        onUpdate: (v) => setDisplayBalance(Math.round(v)),
      });

      setGlowTrigger(true);
      setTimeout(() => setGlowTrigger(false), 1500);

      setBalance(newBalance);
      fetchTopUpHistory();
    } else {
      setSnackbarMsg(data.error || "Something went wrong!");
      setSnackbarType("error");
    }

    setOpen(true);
  };

  const fetchTopUpHistory = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    setHistoryLoading(true);
    const response = await fetch("/api/details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "POST",
        dataBody: { id: userId },
        type: "topup-history",
        header: "",
        auth: true,
      }),
    });

    const data = await response.json();
    if (response.ok && data.status === 200 && Array.isArray(data.data)) {
      const cleaned = data.data.map((entry: any) => ({
        bank: entry.bank || "Unknown",
        amount: Number(entry.amount) || 0,
        date: entry.date || new Date().toISOString(),
      }));
      setHistory(cleaned);
      setCurrentPage(1);
    }
    setHistoryLoading(false);
  };

  useEffect(() => {
    fetchTopUpHistory();
  }, []);

  const filteredHistory =
    bankFilter === "All" ? history : history.filter((entry) => entry.bank === bankFilter);

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen mt-2 sm:mt-0 bg-[#0A0F1F] text-white relative bg-[length:80px_80px] bg-[linear-gradient(transparent_79px,#232733_80px),linear-gradient(90deg,transparent_79px,#232733_80px)]">
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0F1F] text-white relative py-22 overflow-hidden">
        {showParticles && (
          <Particles
            id="tsparticles"
            init={loadSlim}
            className="absolute inset-0 z-0 pointer-events-none"
            options={particlesOptions}
          />
        )}
  
        <h1 className="text-4xl font-bold mb-10 text-white tracking-tight drop-shadow-sm relative z-10">
          Top-Up
        </h1>
  
        <Tilt
          glareEnable
          glareMaxOpacity={0.2}
          scale={1.02}
          transitionSpeed={250}
          tiltMaxAngleX={1}
          tiltMaxAngleY={1}
          className="w-full max-w-xl"
        >
          <div className="relative z-10 w-full p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-fuchsia-600 to-pink-400 animate-borderGlow">
            <div className="rounded-[inherit] p-10 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] shadow-[0_0_25px_#3B82F6] ring-2 ring-blue-500/10">
              <h2 className="text-3xl font-semibold mb-6 text-white">Add Money</h2>
              <hr className="mb-6 border-gray-700" />
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">Amount</label>
                  <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    inputMode="numeric"
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-[#181F2A] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-300 mb-2">Bank</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-[#181F2A] text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                  >
                    <option value="SBI">SBI</option>
                    <option value="HDFC">HDFC</option>
                    <option value="ICICI">ICICI</option>
                    <option value="AXIS">AXIS</option>
                    <option value="PNB">PNB</option>
                  </select>
                </div>
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-6 py-2 rounded-lg shadow-lg transition disabled:opacity-50"
                  >
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Add Money"}
                  </button>
                </div>
              </form>
  
              {balance !== null && (
                <div className="mt-6 text-center">
                  <span className="text-white mr-2 font-medium">New Balance:</span>
                  <motion.span
                    key={glowTrigger ? "glow" : "normal"}
                    initial={{ scale: 0.9, opacity: 0.6, textShadow: "0 0 0px #22c55e" }}
                    animate={{
                      scale: 1.1,
                      opacity: 1,
                      textShadow: glowTrigger ? "0px 0px 8px #22c55e" : "none",
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-green-400 font-semibold text-xl"
                  >
                    ₹ {displayBalance.toLocaleString()}
                  </motion.span>
                </div>
              )}
  
              {/* ✅ Updated History Section */}
              <div className="mt-8 bg-[#0F172A] p-4 rounded-lg border border-blue-700/30">
                {historyLoading ? (
                  <ShimmerLoader />
                ) : paginatedHistory.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-md font-semibold text-white">Recent Top-Ups</h3>
                      <select
                        value={bankFilter}
                        onChange={(e) => setBankFilter(e.target.value)}
                        className="px-3 py-2 rounded bg-[#1e293b] text-white border border-blue-600 text-sm focus:outline-none"
                      >
                        <option value="All">All Banks</option>
                        <option value="SBI">SBI</option>
                        <option value="HDFC">HDFC</option>
                        <option value="ICICI">ICICI</option>
                        <option value="AXIS">AXIS</option>
                        <option value="PNB">PNB</option>
                      </select>
                    </div>
  
                    <div className="grid grid-cols-3 text-xs text-gray-500 uppercase pb-1 border-b border-gray-700 mb-2">
                      <span>Bank</span>
                      <span className="text-right">Amount</span>
                      <span className="text-right">Date</span>
                    </div>
                    <ul className="divide-y divide-gray-700 text-sm text-gray-300 min-h-[240px]">
                      {[...Array(itemsPerPage)].map((_, idx) => {
                        const entry = paginatedHistory[idx];
                        return entry ? (
                          <li key={idx} className="py-2 grid grid-cols-3 items-center">
                            <span>{entry.bank}</span>
                            <span className="text-right">₹{Number(entry.amount).toLocaleString()}</span>
                            <span className="text-right text-gray-500 text-xs">
                              {new Date(entry.date).toLocaleDateString()}
                            </span>
                          </li>
                        ) : (
                          <li key={idx} className="py-2 grid grid-cols-3 items-center opacity-30">
                            <span>&nbsp;</span>
                            <span className="text-right">&nbsp;</span>
                            <span className="text-right text-xs">&nbsp;</span>
                          </li>
                        );
                      })}
                    </ul>
  
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-700 text-gray-200 rounded disabled:opacity-40"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-400">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-700 text-gray-200 rounded disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">
                    No top-up history found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Tilt>
  
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity={snackbarType} sx={{ width: "100%" }}>
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
