"use client";

import { useEffect, useState } from "react";
import particlesOptions from "@libs/particlesConfig";
import { loadSlim } from "tsparticles-slim";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import {
  animate,
  useMotionValue,
  useTransform,
  motion,
} from "framer-motion";
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

type FilterOption = "last10" | "today" | "yesterday" | "lastWeek" | "lastMonth";

export default function AccountDetails() {
  const [accountData, setAccountData] = useState<AccountData>({
    id: "",
    phone: "",
    balance: 0,
  });

  const [balanceHistory, setBalanceHistory] = useState<BalanceHistory[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<BalanceHistory[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("last10");

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
        const sorted = data.data.sort(
          (a: BalanceHistory, b: BalanceHistory) =>
            new Date(a.time).getTime() - new Date(b.time).getTime()
        );
        setBalanceHistory(sorted);
        applyFilter(selectedFilter, sorted);
      }

      setIsLoading(false);
    };

    fetchAccountData();
  }, [count]);

  const applyFilter = (filter: FilterOption, data = balanceHistory) => {
    const now = new Date();
    let filtered: BalanceHistory[] = [];

    switch (filter) {
      case "last10":
        filtered = [...data.slice(-10)];
        break;
      case "today":
        filtered = data.filter(
          (entry) =>
            new Date(entry.time).toDateString() === now.toDateString()
        );
        break;
      case "yesterday":
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        filtered = data.filter(
          (entry) =>
            new Date(entry.time).toDateString() === yesterday.toDateString()
        );
        break;
      case "lastWeek":
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        filtered = data.filter(
          (entry) => new Date(entry.time) >= lastWeek
        );
        break;
      case "lastMonth":
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        filtered = data.filter(
          (entry) => new Date(entry.time) >= lastMonth
        );
        break;
      default:
        filtered = [...data];
    }

    setFilteredHistory(filtered);
  };

  useEffect(() => {
    applyFilter(selectedFilter);
  }, [selectedFilter, balanceHistory]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1F]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0A0F1F] text-white overflow-hidden px-4 py-8">
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
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        className="w-full max-w-5xl"
      >
        <div className="w-full p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-fuchsia-600 to-pink-400 animate-borderGlow">
          <div className="rounded-[inherit] p-8 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] shadow-[0_0_25px_#3B82F6] ring-2 ring-blue-500/10">
            <h1 className="text-4xl font-bold text-center mb-10 drop-shadow-md text-white">
              Account Overview
            </h1>

            <div className="space-y-10 mb-10">
              {/* User Info */}
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between border-b border-gray-700 pb-1">
                  <span className="text-gray-400 text-sm">Phone</span>
                  <span className="font-medium text-sm">{accountData.phone}</span>
                </div>
                <div className="flex flex-row items-center justify-between pt-1">
                  <span className="text-gray-400">Available Balance</span>
                  <motion.span className="text-green-400 font-semibold text-xl">
                    ₹ {displayBalance}
                  </motion.span>
                </div>
              </div>

              {/* Graph Below - More space added */}
              <div className="mt-10">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-md text-blue-400 font-semibold">
                    Balance History
                  </h2>
                  <select
                    value={selectedFilter}
                    onChange={(e) =>
                      setSelectedFilter(e.target.value as FilterOption)
                    }
                    className="bg-[#0F172A] border border-blue-700 text-sm rounded px-2 py-1 text-white"
                  >
                    <option value="last10">Last 10</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="lastWeek">Last Week</option>
                    <option value="lastMonth">Last Month</option>
                  </select>
                </div>

                {filteredHistory.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={filteredHistory}>
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
                        contentStyle={{
                          backgroundColor: "#1E293B",
                          border: "none",
                        }}
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
                  <p className="text-sm text-slate-400">
                    No transaction history found for this filter.
                  </p>
                )}
              </div>
            </div>

            <p className="text-sm text-center text-slate-500">
              Data updates every time you perform a transaction.
            </p>
          </div>
        </div>
      </Tilt>
    </div>
  );
}
