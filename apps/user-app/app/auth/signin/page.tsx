"use client";

import { signIn } from "next-auth/react";
import { useState } from "react"



const SignIn = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect:false,
      phone,
      password,
      callbackUrl: "/account-details", 
    });


    if (result?.error) {
      setError("Invalid phone number or password.");
    } else {
      setError(null); 
      window.location.href = "/account-details"; 
    }
   
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-md  p-6 bg-slate-100 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Sign In or Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label className="block text-lg font-medium text-gray-950">
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 bg-slate-100 mt-2 text-md border rounded-lg "
              placeholder="1231231231"
              required
            />
          </div>

          <div className="mt-4">
            <label  className="block text-lg font-medium text-gray-950">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2  bg-slate-100 mt-2 text-md border rounded-lg"
              placeholder="Your Password"
              required
            />
          </div>

          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}

          <div className="flex justify-center  mt-8">
            <button
              type="submit"
              className=" px-4 py-2 text-sm font-medium text-white bg-gray-950 rounded-lg hover:bg-gray-700"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;