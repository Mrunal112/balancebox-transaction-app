"use client"
import { useSession } from "next-auth/react";
import { LoadingScreen } from "@balancebox/ui/loading";

interface SessionWrapperProps {
  children: React.ReactNode;
}

export function SessionWrapper({ children }: SessionWrapperProps) {
  const session = useSession();

  if (session.status === "loading") {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
