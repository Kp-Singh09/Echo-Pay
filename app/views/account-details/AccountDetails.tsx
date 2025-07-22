"use client";

import { useEffect, useState } from "react";
import particlesOptions from "@libs/particlesConfig";
import { loadSlim } from "tsparticles-slim";
import Tilt from 'react-parallax-tilt';
import Particles from "react-tsparticles";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface AccountData {
  id: string;
  phone: string;
  balance: number;
}

interface BalanceHistory {
  time: string;
  balance: number;
}

export default function AccountDetails() {
  const [accountData, setAccountData] = useState<AccountData>({
    id: "",
    phone: "",
    balance: 0,
  });

  const [balanceHistory, setBalanceHistory] = useState<BalanceHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const count = useMotionValue(0);
  const animatedBalance = useTransform(count, (latest) => latest.toFixed(2));
  const [displayBalance, setDisplayBalance] = useState("0.00");

  useEffect(() => {
    return animatedBalance.on("change", (latest) => {
      setDisplayBalance(latest);
    });
  }, [animatedBalance]);

  useEffect(() => {
    const fetchAccountData = async () => {
      const userId = localStorage.getItem("user_id");

      const detailsRes = await fetch("/api/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "POST",
          dataBody: { id: userId },
          type: "account-details",
          header: "",
          auth: true,
        }),
      });

      if (detailsRes.ok) {
        const data = await detailsRes.json();
        setAccountData(data.data);
        animate(count, data.data.balance, { duration: 1.5 });
      }

      const historyRes = await fetch("/api/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "POST",
          dataBody: { id: userId },
          type: "balance-history",
          header: "",
          auth: true,
        }),
      });

      if (historyRes.ok) {
        const data = await historyRes.json();
        setBalanceHistory(data.data);
      }

      setIsLoading(false);
    };

    fetchAccountData();
  }, [count]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0A0F1F] text-white overflow-hidden px-4 py-8">
      <Particles
        id="tsparticles"
        init={loadSlim}
        className="absolute inset-0 z-0 pointer-events-none"
        options={particlesOptions}
      />


      <Tilt
  glareEnable={true}
  glareMaxOpacity={0.2}
  scale={1.02}
  transitionSpeed={250}
  tiltMaxAngleX={10}
  tiltMaxAngleY={10}
  className="w-full max-w-md"
>


      {/* Account Card */}
      <div className="relative z-10 w-full max-w-md p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-fuchsia-600 to-pink-400 animate-borderGlow">
        <div className="rounded-[inherit] p-8 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] shadow-[0_0_25px_#3B82F6] ring-2 ring-blue-500/10">
          <h1 className="text-4xl font-bold text-center mb-8 drop-shadow-md text-white">
            Account Details
          </h1>

          <div className="space-y-6">
            <div className="flex justify-between border-b border-gray-700 pb-3">
              <span className="text-gray-400">Phone</span>
              <span className="font-medium">{accountData.phone}</span>
            </div>
            <div className="flex justify-between pt-3 items-center">
              <span className="text-gray-400">Available Balance</span>
              <motion.span className="text-green-400 font-semibold text-xl">
                ₹ {displayBalance}
              </motion.span>
            </div>
          </div>
        </div>
      </div>
</Tilt>


 <Tilt
  glareEnable={true}
  glareMaxOpacity={0.2}
  scale={1.02}
  transitionSpeed={250}
  tiltMaxAngleX={2}
  tiltMaxAngleY={2}
  className="w-full"
>

        <div className="relative z-10 w-full max-w-4xl mt-12 p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-fuchsia-600 to-pink-400 animate-borderGlow">
    <div className="rounded-[inherit] p-6 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] shadow-[0_0_25px_#3B82F6] ring-2 ring-blue-500/10">
    <h2 className="text-lg text-blue-400 font-semibold mb-4">Balance History</h2>
    {balanceHistory.length > 0 ? (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={balanceHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="time"
            tickFormatter={(time) =>
              new Date(time).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
              })
            }
            stroke="#94A3B8"
          />
          <YAxis stroke="#94A3B8" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1E293B", border: "none" }}
            labelFormatter={(time) =>
              new Date(time).toLocaleString("en-IN")
            }
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    ) : (
      <p className="text-sm text-slate-400">No transaction history found.</p>
    )}
      </div>
        </div>

</Tilt>
    </div>

  );
}
