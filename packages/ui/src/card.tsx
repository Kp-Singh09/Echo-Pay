import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border p-6 bg-slate-100 rounded-xl w-[450px] h-[350px] shadow-2xl"
    >
      <h1 className="text-2xl border-b pb-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}
