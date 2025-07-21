"use client"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const glowBtn = "bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold rounded-full px-7 py-3 shadow-lg hover:shadow-blue-400/50 transition-all duration-200 ring-2 ring-blue-400/40 ring-offset-2 ring-offset-[#0A0F1F]";

export function HorizontalAppbar() {
  const router = useRouter();

  return (
   <div className="bg-[#0A0F1F]" style={{borderBottom: "1px solid white"}}>
      <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full flex items-center justify-between px-8 py-3 shadow-2xl mb-2 bg-transparent pt-6"
        >
          <div className="text-4xl md:text-5xl font-extrabold flex items-center gap-2">
            <span className="text-white drop-shadow-lg">
              Echo<span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Pay</span>
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 16px #60a5fa" }}
            whileTap={{ scale: 0.97 }}
            className={glowBtn}
            onClick={() => router.push('/')}
          >
            Logout
          </motion.button>
        </motion.nav>
   </div>
  );
}

