"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type VerticalAppbarProps = {
  href: string;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void; // ✅ Add optional onClick
};

export const VerticalAppbar = ({ href, title, icon, onClick }: VerticalAppbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  const handleClick = () => {
    router.push(href);
    if (onClick) onClick(); // ✅ Call onClick after navigation
  };

  return (
    <div
      className={`flex ${selected ? "text-blue-500" : "text-white"} cursor-pointer pt-8 pl-8`}
      onClick={handleClick}
    >
      <div className="pr-2" style={{ color: selected ? "#3b82f6" : "white" }}>
        {icon}
      </div>
      <div className={`font-bold text-xl ${selected ? "text-blue-500" : "text-white"}`}>
        {title}
      </div>
    </div>
  );
};
