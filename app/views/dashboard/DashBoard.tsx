"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";




const glass = "backdrop-blur-lg bg-white/10 border border-blue-400/20 shadow-2xl";
const glowBtn = "bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold rounded-full px-5 md:px-7 py-2.5 md:py-3 text-sm md:text-base shadow-lg hover:shadow-blue-400/50 transition-all duration-200 ring-2 ring-blue-400/40 ring-offset-2 ring-offset-[#0A0F1F]";

const letterAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5 }
  })
};

const features = [
  { icon: "📊", label: "Spending Summary" },
  { icon: "🆘", label: "24/7 Support" },
  { icon: "👨‍💼", label: "Business Tools" },
  { icon: "🔔", label: "Notifications" },
  { icon: "🔃", label: "P2P Transaction" },
  { icon: "➕", label: "Top-Up Money" },
  { icon: "📄", label: "Transaction History" },
  { icon: "🔒", label: "Security" },
  { icon: "💬", label: "FAQ" },
];

export default function Dashboard() {
  const router = useRouter();
  const letterControls = useAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const x = useMotionValue(0);

  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const sequence = async () => {
      await letterControls.start((i) => letterAnimation.visible(i));
      timeout = setTimeout(() => letterControls.start("hidden"), 400);
    };
    sequence();
    letterControls.set("hidden");
    const interval = setInterval(sequence, 400 + 0.13 * "Trusted by Users.".length * 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [letterControls]);

  // Animate the x motion value for the scroller
  useEffect(() => {
    const controls = animate(x, -1000, {
      repeat: Infinity,
      duration: 20,
      ease: "linear",
    });
    return controls.stop;
  }, [x]);

  const toggleFAQ = (idx: number) =>
    setOpenIndex(openIndex === idx ? null : idx);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.7, scale: 1 }} transition={{ duration: 2 }} className="absolute left-[-10vw] top-[-10vh] w-[40vw] h-[40vw] bg-blue-700/40 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.5, scale: 1 }} transition={{ duration: 2, delay: 0.5 }} className="absolute right-[-10vw] top-[20vh] w-[30vw] h-[30vw] bg-blue-400/30 rounded-full blur-2xl" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.4, scale: 1 }} transition={{ duration: 2, delay: 1 }} className="absolute left-[30vw] bottom-[-10vh] w-[40vw] h-[20vw] bg-blue-900/30 rounded-full blur-2xl" />
      </div>

      <motion.main initial={{ scale: 0.97, opacity: 0.7 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: "spring", stiffness: 80 }} className="min-h-screen pt-28 bg-[#0A0F1F] text-white relative bg-[length:80px_80px] bg-[linear-gradient(transparent_79px,#232733_80px),linear-gradient(90deg,transparent_79px,#232733_80px)]">
        
        {/* NAVBAR */}

        
        <motion.nav
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
  className={`fixed top-0 left-0 z-50 w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-8 py-4 shadow-2xl transition-colors duration-300 ${
    scrolled ? "bg-[#0A0F1F]" : "bg-transparent"
  } gap-4`}
>

          <div className="flex items-center h-16">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-80 w-auto" viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMid meet">
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

        <motion.button
          whileHover={{ scale: 1.08, boxShadow: "0 0 16px #60a5fa" }}
          whileTap={{ scale: 0.97 }}
          className={`${glowBtn} hidden md:block`}
          onClick={() => router.push('/login')}
        >
          Login
        </motion.button>
    </motion.nav>


        {/* HERO SECTION */}
        <section className="pt-10 md:pt-16 px-4 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6 md:space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[#F1F5F9] drop-shadow-xl">
              {"Trusted by Users.".split("").map((char, i) => (
                <motion.span key={i} custom={i} animate={letterControls} variants={letterAnimation}>{char}</motion.span>
              ))}
              <br />
              <span className="text-blue-400">Powered by Security.</span>
            </h1>
            <p className="text-base md:text-lg text-[#CBD5E1]">Experience fast, reliable, and secure digital payments with futuristic security.</p>
            <motion.button whileHover={{ scale: 1.07, boxShadow: "0 0 24px #60a5fa" }} whileTap={{ scale: 0.96 }} className={`${glowBtn} text-base mx-auto flex items-center md:mx-0 mt-6 md:mt-0`} onClick={() => router.push('/login')}>Get Started</motion.button>
          </motion.div>
          <div className="flex justify-center items-center w-full">
            <motion.div initial={{ opacity: 1, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: [1, 1.08, 1] }} transition={{ opacity: { duration: 0.6 }, y: { duration: 0.6 }, scale: { duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" } }} whileHover={{ scale: 1.07, boxShadow: "0 0 48px #60a5fa" }} className="rounded-3xl border-4 border-blue-900/60 bg-gradient-to-br from-[#1a2740] to-[#22345a] p-2 shadow-2xl max-w-xs w-full">
              <Image src="/paytm-1.png" alt="Illustration representing payment services" width={500} height={370} className="w-full h-auto rounded-2xl" />
            </motion.div>
          </div>
        </section>



<section className="mt-16 px-4 sm:px-6 flex justify-center">
  <div className="w-full max-h-[240px] overflow-hidden pt-4"> 
    <motion.div
      className="flex gap-10 w-max pb-4"
      style={{ x }}
    >
      {[...features, ...features, ...features].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: (index % features.length) * 0.18,
            type: "spring",
            stiffness: 80,
            damping: 12,
          }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            border: "1px solid rgba(59, 130, 246, 0.7)",
          }}
          whileTap={{ scale: 0.96 }}
          className="min-w-[180px] flex-shrink-0 snap-start flex flex-col items-center justify-center p-5 rounded-2xl border border-blue-400/20 transition-transform cursor-pointer bg-[#0f172a]"
        >
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-700/30 shadow-lg text-3xl text-blue-300 mb-2">
            {item.icon}
          </span>
          <span className="text-white font-semibold text-center">{item.label}</span>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>








        {/* IMAGE BANNER */}
        <div className="flex justify-center items-center w-full h-auto mt-16 mb-16">
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} whileHover={{ scale: 1.02, boxShadow: "0 0 48px #60a5fa" }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.5 }} className="rounded-3xl border-4 border-blue-900/60 bg-gradient-to-br from-[#1a2740] to-[#22345a] p-2 shadow-2xl w-auto max-w-6xl">
            <img src="/paytm-2.jpg" alt="Illustration representing payment services" className="rounded-2xl w-auto h-auto max-h-128" />
          </motion.div>
        </div>

        {/* FAQ SECTION */}
        <section className="max-w-3xl mx-auto mt-12 mb-20 px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { question: "What is EchoPay?", answer: "EchoPay is a secure digital payment platform that allows you to send, receive, and manage money easily and safely." },
              { question: "How do I create a EchoPay account?", answer: "Simply click on the 'Get Started' button and follow the registration steps to set up your EchoPay account." },
              { question: "How can I add money to my EchoPay wallet?", answer: "You can add money using your dummy bank account from the 'Add Money' section." },
              { question: "How do I send money to someone using EchoPay?", answer: "Go to the 'P2P Transaction' section, enter the recipient's details, and the amount you wish to send." },
              { question: "How do I view my transaction history?", answer: "Navigate to the 'Transaction History' section to see all your past transactions in detail." },
              { question: "How do I view my profile?", answer: "Go to the 'Home' section to see your profile details." }
            ].map((item, idx) => (
              <div key={idx}>
                <button onClick={() => toggleFAQ(idx)} className={`w-full bg-[#0f172a] text-left px-5 py-4 rounded-lg border border-blue-400/40 text-lg font-semibold focus:outline-none flex justify-between items-center transition-all duration-200 ${openIndex === idx ? 'ring-2 ring-blue-400' : ''}`}>
                  <span>{item.question}</span><span className="ml-4 text-blue-300">{openIndex === idx ? '▲' : '▼'}</span>
                </button>
                {openIndex === idx && <div className="px-5 py-3 bg-[#0f172a] text-[#cbd5e1] border-l-4 border-blue-400/40 rounded-b-lg animate-fade-in">{item.answer}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-gray-400 text-sm py-4 px-4">
          <p>© 2025 EchoPay. All rights reserved.</p>
          <p>Powered by EchoPay</p>
        </footer>
      </motion.main>
    </>
  );
}
