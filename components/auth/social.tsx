"use client";
import { signIn } from "next-auth/react"; //not importing from @auth bcz its a client component
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export function Social() {
  const searchParam = useSearchParams();
  const callbackUrl = searchParam.get("callbackUrl");

  function onClick(provider: "google" | "github") {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="w-full flex items-center gap-x-2">
      <Button
        className="w-full "
        size="lg"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>

      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
}
