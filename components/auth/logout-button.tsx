"use client";

import { Logout } from "@/action/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
  function onClick() {
    Logout();
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
