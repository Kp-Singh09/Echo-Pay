"use client"
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useState } from "react";


export default function P2P() {
    const [amount, setAmount] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [snackbarType, setSnackbarType] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
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
                dataBody: { amount: amountNumber, phoneNumber, id: localStorage.getItem("user_id") },
                type: "p2p",
                header: "",
                auth: true,
            }),
        });
        const data = await response.json();

        if (response.ok && response.status === 200 && data.status === 200) {
          setSnackbarMsg(data.message);
          setSnackbarType("success");
          setAmount("");
          setPhoneNumber("");
        } else if (response.ok && response.status === 200 && data.status === 400) {
          setSnackbarMsg(data.error || "Something went wrong!");
          setSnackbarType("error");
          setAmount("");
          setPhoneNumber("");
        } else {
          setSnackbarMsg("Something went wrong!");
          setSnackbarType("error");
        }
        setOpen(true);
      };

    const handleClose = () => setOpen(false);

        return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0F1F] py-22">
        <h1 className="text-4xl font-bold mb-10 text-[var(--foreground)] tracking-tight drop-shadow-sm">P2P Transfer</h1>
        <div className="w-full max-w-xl bg-[#181F2A]/90 rounded-2xl shadow-2xl p-10 backdrop-blur-md ring-2 ring-blue-400/60 ring-offset-2 ring-offset-[#0A0F1F]">
            <h2 className="text-3xl font-semibold mb-6 text-[var(--foreground)]">Send Money</h2>
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
                    <label className="block text-lg font-medium text-gray-300 mb-2">Phone Number</label>
                    <input type="text"
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
        <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={snackbarType as AlertColor} sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
    )
}