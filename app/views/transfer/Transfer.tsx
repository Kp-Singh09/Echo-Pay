
"use client";

import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function Transfer() {
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("Demo Bank");

  // Snackbar states
  const [open, setOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");

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

    const response = await fetch("/api/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "POST",
        dataBody: { amount: amountNumber, bank, id: localStorage.getItem("user_id") },
        type: "transfer",
        header: "",
        auth: true,
      }),
    });

    const data = await response.json();

    if (response.ok && response.status === 200 && data.status === 200) {
      setSnackbarMsg(data.message);
      setSnackbarType("success");
      setAmount("");
      setBank("Demo Bank");
    } else if (response.ok && response.status === 200 && data.status === 400) {
      setSnackbarMsg(data.error || "Something went wrong!");
      setSnackbarType("error");
      setAmount("");
      setBank("Demo Bank");
    } else {
      setSnackbarMsg("Something went wrong!");
      setSnackbarType("error");
    }
    setOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0F1F] py-22">
      <h1 className="text-4xl font-bold mb-10 text-[var(--foreground)] tracking-tight drop-shadow-sm">Transfer</h1>
      <div className="w-full max-w-xl bg-[#181F2A]/90 rounded-2xl shadow-2xl p-10 backdrop-blur-md ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F]">
        <h2 className="text-3xl font-semibold mb-6 text-[var(--foreground)]">Add Money</h2>
        <hr className="mb-6 border-gray-700" />
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-medium text-gray-300 mb-2">Amount</label>
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
              <option value="Demo Bank">Demo Bank</option>
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
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl px-12 py-3 rounded-xl shadow-lg transition"
            >
              Add Money
            </button>
          </div>
        </form>
      </div>

      {/* ✅ MUI Snackbar */}
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
  );
}
