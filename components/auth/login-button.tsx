"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const route = useRouter();

  function onClickHandler() {
    console.log("onclick fired!!");
    route.push("/auth/login");
  }

  if (mode === "modal") {
    return <>its a modal</>;
  }

  return (
    <span onClick={onClickHandler} className="cursor-pointer">
      {children}
    </span>
  );
}
