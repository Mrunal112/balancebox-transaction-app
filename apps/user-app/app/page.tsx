"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LandingClient } from "./LandingClient";
import { LoadingScreen } from "@balancebox/ui/loading";

export default function Page(): JSX.Element {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session.status, router]);

  if (session.status === "loading") {
    return <LoadingScreen />;
  }

  if (session.status === "authenticated") {
    return <LoadingScreen title="Redirecting..." message="Taking you to your dashboard" />;
  }

  return <LandingClient />;
}
