"use client"

import { HorizontalAppbar } from "../../views/HorizontalAppbar";
import { VerticalAppbar } from "../../views/VerticalAppbar";
import { useState, useEffect } from "react";


export default function Layout({ children }: { children: React.ReactNode }) {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (showMobileSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMobileSidebar]);

  return (
    <div className="bg-[#0A0F1F] min-h-screen">
      {/* Top Bar for Mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-30 bg-[#101828] flex items-center justify-between px-4 py-3 shadow-lg border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMobileSidebar(true)}
            className="p-2 rounded-md hover:bg-[#181F2A] focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Open menu"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-2xl font-extrabold text-white tracking-tight">
            Echo<span className="text-blue-500">Pay</span>
          </span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-xl shadow border border-blue-300">Logout</button>
      </div>

      {/* Horizontal Appbar for Desktop */}
      <div className="hidden md:block fixed top-0 left-0 w-full z-30">
        <HorizontalAppbar />
      </div>

      {/* Slide-out Sidebar for Mobile */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40" onClick={() => setShowMobileSidebar(false)} />
          {/* Drawer */}
          <div className="relative w-64 bg-[#181F2A] h-full shadow-xl p-6 flex flex-col gap-4 animate-slideInLeft">
            <button
              onClick={() => setShowMobileSidebar(false)}
              className="absolute top-3 right-3 p-2 rounded hover:bg-[#222] text-gray-300"
              aria-label="Close menu"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <VerticalAppbar href={"/account-details"} icon={<BalanceIcon />} title="Account Details" />
            <VerticalAppbar href={"/transfer"} icon={<TransferIcon />} title="Transfer" />
            <VerticalAppbar href={"/transactions"} icon={<TransactionsIcon />} title="Transactions" />
            <VerticalAppbar href={"/p2p"} icon={<P2PTransferIcon />} title="P2P" />
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex pt-16 md:pt-20">
        {/* Sidebar for Desktop Screens */}
        <div className="hidden md:flex fixed top-20 left-0 w-72 bg-[#0A0F1F] border-r border-slate-300 h-[calc(100vh-5rem)] mr-4 pt-20 z-20 ">
          <div>
            <VerticalAppbar href={"/account-details"} icon={<BalanceIcon />} title="Account Details" />
            <VerticalAppbar href={"/transfer"} icon={<TransferIcon />} title="Transfer" />
            <VerticalAppbar href={"/transactions"} icon={<TransactionsIcon />} title="Transactions" />
            <VerticalAppbar href={"/p2p"} icon={<P2PTransferIcon />} title="P2P Transfer" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-2 sm:px-6 md:px-10 pt-4 pb-8 md:ml-72">
          {children}
        </div>
      </div>
    </div>
  );
}



 function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="w-6 h-6">
    <path  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

 function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="w-6 h-6">
    <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}

 function P2PTransferIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="w-6 h-6">
        <path d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
}

function BalanceIcon(){
   return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
   <path  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"/>
 </svg>
}

