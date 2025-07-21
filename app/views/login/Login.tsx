"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";

export default function Login() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Snackbar states
  const [open, setOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "POST",
        dataBody: {
          number: number,
          password: password,
        },
        type: "login",
        header: "",
        auth: true,
      }),
    });

    const data = await response.json();

    console.log(data);
    console.log(response);
    if (response.ok && response.status === 200) {
      if (data.status === 200) {
        localStorage.setItem("user_id", data.data.user_id);
        localStorage.setItem("user_number", data.data.number);
        setSnackbarMsg("Login successful!");
        setSnackbarType("success");
        setOpen(true);
        setTimeout(() => {
          router.push("/account-details");
        }, 1200); 
      } else if (data.status === 400) {
        setSnackbarMsg(data.error || "Invalid credentials!");
        setSnackbarType("error");
        setOpen(true);
        setPassword("");
        setNumber("");
      }
    } else {
      setSnackbarMsg("Something went wrong!");
      setSnackbarType("error");
      setOpen(true);
    }
  };

  return (
    <>
      <div className="min-h-screen flex bg-[#0A0F1F]">
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
          <div className="w-full max-w-md text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                <span className="text-white drop-shadow-lg">
                  Welcome to Echo
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Pay</span>
                </span>
              </h1>
            </div>
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20">
                <p className="text-lg text-white italic mb-2">
                  "Digital payments are not just a convenience, they're a revolution in financial inclusion."
                </p>
                <p className="text-blue-300 text-sm">- Financial Innovation</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20">
                <p className="text-lg text-white italic mb-2">
                  "Every transaction is a step towards a more connected and empowered India."
                </p>
                <p className="text-blue-300 text-sm">- Digital India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="min-w-[320px] max-w-sm w-full p-8 rounded-2xl border border-blue-400/20 shadow-lg bg-white/10 backdrop-blur-lg flex flex-col gap-6"
            style={{ boxShadow: "0 4px 32px 0 rgba(30,64,175,0.25)" }}
          >
            <h2 className="text-2xl font-bold text-center text-white mb-2">Login / Signup</h2>

            <div className="flex flex-col gap-2">
              <label htmlFor="number" className="text-white font-semibold">Phone Number</label>
              <input
                id="number"
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="p-3 rounded-lg bg-transparent border border-blue-400/40 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-white font-semibold">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-lg bg-transparent border border-blue-400/40 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold rounded-full px-7 py-3 shadow-lg hover:shadow-blue-400/50 transition-all duration-200 ring-2 ring-blue-400/40 ring-offset-2 ring-offset-[#0A0F1F] mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* ✅ MUI Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={snackbarType} sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
