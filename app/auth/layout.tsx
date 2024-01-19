import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // export default function AuthLayout(children: React.ReactNode) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      {children}
    </div>
  );
}
