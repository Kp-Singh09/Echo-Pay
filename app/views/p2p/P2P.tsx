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
}: {
  active?: boolean;
  payload?: any;
}) => {
  if (active && payload && payload.length > 0) {
    const { receiver, totalAmount } = payload[0].payload;
    return (
      <div className="bg-white/90 border border-gray-300 shadow-md rounded p-2 text-sm text-black">
        <div>
          <strong>Receiver:</strong> {receiver}
        </div>
        <div>
          <strong>Amount Sent:</strong> ₹{totalAmount}
        </div>
      </div>
    );
  }

  return null;
};

// Color palette for chart segments
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
      await fetchSummary(); // ✅ Refresh chart data
    } else {
      setSnackbarMsg(data.error || "Something went wrong!");
      setSnackbarType("error");
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0A0F1F] py-22 overflow-hidden">
      <Particles
        id="tsparticles"
        init={loadSlim}
        className="absolute inset-0 z-0 pointer-events-none"
        options={particlesOptions}
      />

      <h1 className="text-4xl font-bold mb-10 text-white tracking-tight drop-shadow-sm relative z-10">
        P2P Transfer
      </h1>

      {/* P2P Form */}
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.2}
        scale={1.02}
        transitionSpeed={250}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        className="w-full max-w-xl"
      >
        <div className="relative z-10 w-full p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-fuchsia-600 to-pink-400 animate-borderGlow">
          <div className="rounded-[inherit] p-10 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] shadow-[0_0_25px_#3B82F6] ring-2 ring-blue-500/10">
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
        </div>
      </Tilt>

      {/* Pie Chart */}
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.2}
        scale={1.02}
        transitionSpeed={250}
        tiltMaxAngleX={1}
        tiltMaxAngleY={1}
        className="w-full max-w-xl"
      >
        <div className="relative z-10 w-full max-w-4xl mt-12 p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-fuchsia-600 to-pink-400 animate-borderGlow">
          <div className="rounded-[inherit] p-6 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] shadow-[0_0_25px_#3B82F6] ring-2 ring-blue-500/10">
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
                    label={({ name, percent }) =>
                      `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    {sentSummary.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-slate-400">
                No P2P transactions made yet.
              </p>
            )}
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
