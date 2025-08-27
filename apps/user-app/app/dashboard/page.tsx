"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@balancebox/ui/appbar";
import { LoadingScreen } from "@balancebox/ui/loading";
import { SessionWrapper } from "../SessionWrapper";
import { useState } from "react";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { DashboardContentArea } from "./components/DashboardContentArea";

function DashboardContent(): JSX.Element {
  const session = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ callbackUrl: '/' }); // Redirect to homepage
    } catch (error) {
      setIsSigningOut(false);
    }
  };

  // Show signout loading screen
  if (isSigningOut) {
    return (
      <LoadingScreen 
        title="Signing out..." 
        message="Please wait while we sign you out" 
      />
    );
  }

  return (
   <div className="min-h-screen">
      {/* Appbar spans full width */}
      <Appbar 
        onSignin={signIn} 
        onSignout={handleSignOut} 
        user={session.data?.user}
      />
      
      {/* Content area with proper alignment */}
      <div className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex gap-6">
          {/* Left Sidebar - aligned with BalanceBox */}
          <div className="w-64 flex-shrink-0">
            <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content Area - extends to align with Sign out */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Welcome to BalanceBox Dashboard</h1>
            <DashboardContentArea activeTab={activeTab} />
          </div>
        </div>
      </div>
   </div>
  );
}

export default function DashboardPage(): JSX.Element {
  return (
    <SessionWrapper>
      <DashboardContent />
    </SessionWrapper>
  );
}
