"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";

import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import { Social } from "@/components/auth/social";
import { BackButton } from "./back-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="h-full flex flex-col justify-center items-center">
        {/* <Header label={headerLabel} /> */}
        <CardTitle className={cn("text-3xl font-semibold", font.className)}>
          🔐 Auth
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {headerLabel}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}></BackButton>
      </CardFooter>
    </Card>
  );
}
