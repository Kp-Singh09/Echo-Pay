    "use client";

    import { HorizontalAppbar } from "../../views/HorizontalAppbar";
    import { VerticalAppbar } from "../../views/VerticalAppbar";
    import { useState, useEffect } from "react";

    export default function Layout({ children }: { children: React.ReactNode }) {
      const [showMobileSidebar, setShowMobileSidebar] = useState(false);

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
            <div className="w-full flex items-center ">
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="p-2 rounded-md hover:bg-[#181F2A] focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Open menu"
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>


              <div className="flex items-center h-16 w-full ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-60 w-full flex-items-center" viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid meet">
              <path fill="white" d="M219 438h8l5 5 1 3 10-1 5 3 6 14 5 14v2h12l2 2-1 4-1 1h-9l2 4 13 2 5 5 1 5v25l-2 4-5-1-1-1-1-29-23-1v36h31l6 2 4 4v44l-4 5-2 1h-35v46l24-1v-37l2-3 5 1 1 3v33l-2 7-3 3-3 1H78l-5-3-2-3V490l3-8 6-4 35-1 69-26Zm2 7-70 26-40 15-8 3v1h19l69-26 35-13-1-6Zm17 8-72 27-24 9v1h114l-3-10-10-26ZM82 485l-3 3v3l9-3 5-2v-1Zm-3 13-1 1v135l2 2h164v-46l-30-1-9-5-5-6-2-6v-20l4-8 7-6 9-3 26-1v-36Zm137 44-6 3-5 6-1 3v16l4 8 8 5h68l1-1v-39l-1-1Z"/>
              <path fill="white" d="M527 472h13l3 3 1 7 1 28 8-7 10-3h12l10 3 8 6 6 7 3 9 1 6v49l-2 4-2 1h-11l-5-2-1-2-1-46-3-10-4-4-3-1h-12l-8 4-4 5-2 7-2 46-3 3h-13l-4-3-1-14v-90l3-5Z"/>
              <path fill="#60a5fa" d="M719 473h47l12 3 8 4 8 7 5 10 2 13-1 11-6 12-7 7-8 5-6 2h-11l-6-1h-12l-7 1-1 5v17l1 6v8l-3 2h-14l-4-3V475Zm23 15-4 2-3 6v29l2 6 3 1h7l21-3 6-4 4-5 2-5v-11l-5-8-8-5-12-3Z"/>
              <path fill="#60a5fa" d="M325 479h83l1 1v7l-6 9-7 6-7 3-16 2h-12l-17-2-10-5-8-8-4-10Z"/>
              <path fill="white" d="M465 500h14l12 3 11 6 8 7 1 5-4 4-8 4-5-1-9-6-7-2h-9l-8 3-5 4-4 8-1 5v8l4 10 5 6 11 4h7l9-3 9-7h6l8 5 1 1-1 7-7 7-12 6-7 2-8 1h-9l-10-2-11-6-8-7-6-10-3-11v-13l3-12 5-10 8-8 12-6Z"/>
              <path fill="white" d="M650 500h12l13 2 10 4 8 6 5 6 4 8 3 12-1 15-5 13-7 10-11 7-14 4h-14l-14-4-9-6-5-4-6-10-3-11v-18l3-10 7-11 7-6 10-5Zm8 18-10 3-7 6-4 8-1 4v11l4 9 5 6 8 4h14l9-5 6-7 2-6 1-10-2-9-6-8-5-4-7-2Z"/>
              <path fill="#60a5fa" d="M840 500h13l9 3 9 6 1 1 2-6 2-2h12l4 2 1 3v73l-2 4-4 1h-10l-3-2v-7l-8 6-10 4-6 1h-10l-13-4-6-4-7-7-7-14-1-4v-18l4-13 6-10 8-7 12-5Zm8 18-10 3-7 6-4 8-1 4v10l3 9 6 7 9 4h13l10-6 5-8 2-7v-10l-4-10-5-5-4-3-8-2Z"/>
              <path fill="#60a5fa" d="M970 501h11l4 2 1 3v56l-2 16-5 14-7 11-8 8-10 6-13 4-16 1-5-2-1-1v-16l1-1 16-1 12-3 9-6 5-8 2-6-9 6-8 2h-16l-9-4-8-7-4-8-2-8v-55l3-2h14l3 2 2 50 5 10 5 2h12l6-3 4-5 2-9 1-44 2-3Z"/>
              <path fill="#60a5fa" d="M361 522h37l3 2-1 7-6 8-8 6-5 2-7 1h-42l-1-1 1-9 7-9 10-5Z"/>
              <path fill="white" d="m222 549 8 1 6 5 2 5-1 8-4 5-4 2h-9l-7-6-1-2v-9l4-6Zm-1 8-2 3v5l3 3 7-1 2-5-3-5Z"/>
              <path fill="#60a5fa" d="M349 564h34l9 2 10 6 7 9 1 5-3 4h-81l-3-1-1-3 3-8 5-6 10-6Z"/>
              <path fill="white" d="M376 615h12l7 2 1 5-2 1h-16l-1 7 2 3h15l1 4-1 1h-15v14l-2 2-4-1-1-2-1-16v-13l2-5Z"/>
              <path fill="#60a5fa" d="m689 616 3 1v7l-5-1v-5Z"/>
              <path fill="white" d="m428 617 5 1v35h-5l-1-2v-33Z"/>
              <path fill="white" d="M439 617h5v36h-5l-1-2v-25Z"/>
              <path fill="white" d="m484 616 8 2 4 5 1 5h-5l-3-5h-9l-2 1v5l8 3 9 4 3 4v8l-5 5-5 1h-8l-6-3-3-3-1-7 6 1 2 5h11l2-1v-5l-10-4-7-3-3-4v-6l3-5 4-2Z"/>
              <path fill="white" d="m575 617 5 1 1 18 7-8 2-1h6l-2 4-5 5 1 6 7 9-1 2-6-1-6-8h-3l-1 9h-5l-1-3v-31Z"/>
              <path fill="#60a5fa" d="M614 617h11l10 3 6 7 1 2v14l-7 8-13 4-8-1-3-6-1-24 2-6Zm6 5-3 2-1 9 1 14 2 2h7l7-3 4-5 1-7-3-8-5-3Z"/>
              <path fill="#60a5fa" d="M647 617h5l1 1v5l-5 1-1-1Z"/>
              <path fill="#60a5fa" d="M741 617h5l1 2v33l-5 1-1-1Z"/>
              <path fill="#60a5fa" d="M834 617h5l1 3v30l-1 3h-5l-1-2v-12Z"/>
              <path fill="#60a5fa" d="m846 617 5 1v35h-5l-1-1v-34Z"/>
              <path fill="#60a5fa" d="M762 617h5l4 13 2 12h2l1-8 4-15 4-2 3 2 5 18v4h2l2-10 3-13 1-1h5l-1 9-6 24-2 3h-6l-4-13-2-8-2 4-4 15-1 2h-6l-3-7-6-23Z"/>
              <path fill="white" d="M505 620h5v7h6v4l-5 1v16l6 2-1 3-4 1-6-3-1-2v-18h-3v-4h3Z"/>
              <path fill="#60a5fa" d="M700 620h4v7h6l1 4-1 1h-6l1 2 1 13 5 2v4l-5 1-6-3-1-8v-11l-3-1v-4h4l-1-6Z"/>
              <path fill="#60a5fa" d="m886 620 5 1v6h6l1 3-1 2h-6l1 16 5 1v4l-4 1-5-2-2-3v-18l-4-1 1-3h3Z"/>
              <path fill="white" d="m402 626 3 1 1 2 1 19 7-1 2-9v-10l1-1h5l1 3v20l-1 3-6-1-5 2-6-1-4-4-1-2v-20Z"/>
              <path fill="white" d="M527 627h11l4 4 1 11v9l-1 2h-7l-7 1-5-2-2-2v-8l4-4 3-1h9l-1-5h-9l-1 4h-4v-5Zm3 14-4 2-1 4 2 2h8l3-3-1-5Z"/>
              <path fill="white" d="M554 627h10l5 4 1 6-5-1-1-3h-8l-3 5 1 7 1 2h7l3-3h6l-4 8-6 2-8-1-5-5-1-2v-11l4-6Z"/>
              <path fill="#60a5fa" d="m648 627 5 1v24l-5 1Z"/>
              <path fill="#60a5fa" d="M664 627h17v29l-4 6-2 1h-10l-5-3-2-5h5l1 3 10-2 2-6-1 1-4 2-7-1-5-4-2-6 1-9 4-5Zm3 4-4 3-1 9 5 5 7-1 2-3v-10l-3-3Z"/>
              <path fill="#60a5fa" d="M688 627h4v26l-5-1v-24Z"/>
              <path fill="#60a5fa" d="M721 627h10l4 3 1 3v19l-5 1-10 1-5-2-1-2v-9l4-3 4-1h8v-5l-9 1-2 3-5-1 2-6Zm2 14-3 2v5l1 1h7l4-5-1-3Z"/>
              <path fill="#60a5fa" d="M812 627h11l4 3 1 4v18l-3 2-2-2-6 2-7-1-4-5 1-7 4-3 4-1h8l-2-4h-7l-2 3h-5l1-6Zm4 14-5 3 1 4 1 1h7l3-2v-6Z"/>
              <path fill="#60a5fa" d="M863 627h9l6 5 1 2v7l-1 1-17 1 3 4h7l2-2h5l-1 5-4 3-7 1-7-3-3-3-1-3v-10l4-6Zm2 4-5 4v2h13l-1-5Z"/>
              <path fill="white" d="M451 635h13l2 1v5h-15l-1-5Z"/>
            </svg>
        </div>



            </div>
          </div>

          {/* Horizontal Appbar for Desktop */}
          <div className="hidden md:block fixed top-0 left-0 w-full z-30">
            <HorizontalAppbar />
          </div>

          {/* Slide-out Sidebar for Mobile */}
          {showMobileSidebar && (
  <div className="fixed inset-0 z-40 flex">
    <div
      className="fixed inset-0 bg-black/40"
      onClick={() => setShowMobileSidebar(false)}
    />
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

      {/* 👇 Pass the close handler here */}
      <VerticalAppbar
        href="/account-details"
        icon={<BalanceIcon />}
        title="Account Details"
        onClick={() => setShowMobileSidebar(false)}
      />
      <VerticalAppbar
        href="/topup"
        icon={<TransferIcon />}
        title="TopUp"
        onClick={() => setShowMobileSidebar(false)}
      />
      <VerticalAppbar
        href="/transactions"
        icon={<TransactionsIcon />}
        title="Transactions"
        onClick={() => setShowMobileSidebar(false)}
      />
      <VerticalAppbar
        href="/p2p"
        icon={<P2PTransferIcon />}
        title="P2P"
        onClick={() => setShowMobileSidebar(false)}
      />

      <button
        className="mt-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-xl shadow border border-blue-300"
        onClick={() => {
          setShowMobileSidebar(false);
          console.log("Logged out");
        }}
      >
        Logout
      </button>
    </div>
  </div>
)}


          {/* Main Layout */}
          <div className="flex pt-16 md:pt-20">
            <div className="hidden md:flex fixed top-20 left-0 w-72 bg-[#0A0F1F] border-r border-slate-300 h-[calc(100vh-5rem)] mr-4 pt-20 z-20">
              <div>
                <VerticalAppbar href={"/account-details"} icon={<BalanceIcon />} title="Account Details" />
                <VerticalAppbar href={"/topup"} icon={<TransferIcon />} title="Top Up" />
                <VerticalAppbar href={"/transactions"} icon={<TransactionsIcon />} title="Transactions" />
                <VerticalAppbar href={"/p2p"} icon={<P2PTransferIcon />} title="P2P Transfer" />
              </div>
            </div>

            <div className="flex-1 px-2 sm:px-6 md:px-10 pt-4 pb-8 md:ml-72">
              {children}
            </div>
          </div>
        </div>
      );
    }

    // Icon Components
    function P2PTransferIcon() {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      );
    }

    function TransactionsIcon() {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    }

    function TransferIcon() {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      );
    }

    function BalanceIcon() {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z" />
        </svg>
      );
    }
