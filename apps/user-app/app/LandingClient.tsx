"use client";

import { LandingPage } from "@balancebox/ui/landing";
import { signIn } from "next-auth/react";

export function LandingClient() {
  const handleGetStarted = () => {
    signIn();
  };
  
  const handleSignIn = () => {
    signIn();
  };
  
  return (
    <LandingPage 
      onGetStarted={handleGetStarted}
      onSignIn={handleSignIn}
    />
  );
}
