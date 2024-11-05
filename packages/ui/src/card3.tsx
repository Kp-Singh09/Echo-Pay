import React from "react";

export function Card3({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="w-7/12 h-auto border p-6 bg-slate-100 rounded-xl shadow-2xl">
      <h1 className="text-2xl border-b pb-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}
