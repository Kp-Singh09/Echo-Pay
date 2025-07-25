"use client";

import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import particlesOptions from "@libs/particlesConfig";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Tooltip for Pie Chart
const CustomTooltip = ({
  active,
  payload,
  sentSummary = [],
}: {
  active?: boolean;
  payload?: any;
  sentSummary?: { receiver: string; totalAmount: number }[];
}) => {
  if (active && payload && payload.length > 0 && sentSummary.length > 0) {
    const { receiver, totalAmount } = payload[0].payload;
    const total = sentSummary.reduce((sum, cur) => sum + cur.totalAmount, 0);
    const percent = ((totalAmount / total) * 100).toFixed(2);
    return (
      <div className="bg-white/90 border border-gray-300 shadow-md rounded p-2 text-sm text-black">
        <div>
          <strong>Receiver:</strong> {receiver}
        </div>
        <div>
          <strong>Amount Sent:</strong> ₹{totalAmount}
        </div>
        <div>
          <strong>Percent:</strong> {percent}%
        </div>
      </div>
    );
  }
  return null;
};

const COLORS = [
  "#3B82F6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#6366F1",
  "#EF4444",
];

export default function P2P() {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const [open, setOpen] = useState(false);
  const [sentSummary, setSentSummary] = useState<
    { receiver: string; totalAmount: number }[]
  >([]);
  const [isMobile, setIsMobile] = useState(false);

  const fetchSummary = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const response = await fetch("/api/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "POST",
        dataBody: { id: userId },
        type: "p2p-sent-summary",
        header: "",
        auth: true,
      }),
    });

    const data = await response.json();
    if (response.ok && data.status === 200) {
      setSentSummary(data.data);
    }
  };

  useEffect(() => {
    fetchSummary();

    // Detect mobile screen
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // check initially
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amountNumber = Number(amount);
    if (amountNumber <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    const response = await fetch("/api/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "POST",
        dataBody: {
          amount: amountNumber,
          phoneNumber,
          id: localStorage.getItem("user_id"),
        },
        type: "p2p",
        header: "",
        auth: true,
      }),
    });

    const data = await response.json();

    if (response.ok && data.status === 200) {
      setSnackbarMsg(data.message);
      setSnackbarType("success");
      setAmount("");
      setPhoneNumber("");
      await fetchSummary();
    } else {
      setSnackbarMsg(data.error || "Something went wrong!");
      setSnackbarType("error");
    }
    setOpen(true);
  };
const [showLabel, setShowLabel] = useState(false);

useEffect(() => {
  const checkLabelVisibility = () => {
    const width = window.innerWidth;
    setShowLabel((width >= 450 && width <= 767) || width >= 870);
  };

  checkLabelVisibility(); // Initial check
  window.addEventListener("resize", checkLabelVisibility);

  return () => window.removeEventListener("resize", checkLabelVisibility);
}, []);

  const handleClose = () => setOpen(false);

  return (
    <div className="relative min-h-screen pl-4 sm:pl-12 pr-4 sm:pr-12 flex flex-col items-center justify-center bg-[#0A0F1F] bg-[length:80px_80px] bg-[linear-gradient(transparent_79px,#232733_80px),linear-gradient(90deg,transparent_79px,#232733_80px)] py-22 overflow-hidden">
      {!isMobile && (
        <Particles
          id="tsparticles"
          init={loadSlim}
          className="absolute inset-0 z-0 pointer-events-none"
          options={particlesOptions}
        />
      )}

      <h1 className="text-4xl font-bold mb-10 text-white tracking-tight drop-shadow-sm relative z-10">
        P2P Transfer
      </h1>

      {/* Combined Card */}
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.2}
        scale={1.02}
        transitionSpeed={250}
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        className="w-full max-w-7xl px-4"
      >
        <div className="relative w-full p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-fuchsia-600 to-pink-400 animate-borderGlow">
          <div className="rounded-[inherit] p-8 lg:p-12 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] shadow-[0_0_25px_#3B82F6] ring-2 ring-blue-500/10">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left: Form */}
              <div className="flex-1">
                <h2 className="text-3xl font-semibold mb-6 text-white">
                  Send Money
                </h2>
                <hr className="mb-6 border-gray-700" />
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-2">
                      Amount
                    </label>
                    <input
                      type="text"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-[#181F2A] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-[#181F2A] text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                    />
                  </div>
                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl px-12 py-3 rounded-xl shadow-lg transition"
                    >
                      Pay
                    </button>
                  </div>
                </form>
              </div>

              {/* Right: Pie Chart */}
              <div className="flex-1">
                <h2 className="text-white mb-4 text-xl font-semibold">
                  P2P Sent Distribution
                </h2>
                {sentSummary.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sentSummary}
                        dataKey="totalAmount"
                        nameKey="receiver"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={showLabel? ({ totalAmount }) => `₹${totalAmount}` : undefined}
                      >
                        {sentSummary.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip sentSummary={sentSummary} />} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-sm text-slate-400">
                    No P2P transactions made yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Tilt>

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarType as AlertColor}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
