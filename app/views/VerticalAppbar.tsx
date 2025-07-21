"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const VerticalAppbar = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-blue-500" : "text-white"} cursor-pointer  p-2 pl-8`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-2" style={{color: selected ? "#3b82f6" : "white"}}>
            {icon}
        </div>
        <div className={`font-bold text-xl ${selected ? "text-blue-500" : "text-white"}`}>
            {title}
        </div>
    </div>
}