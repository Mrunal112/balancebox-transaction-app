import { Button } from "./button";
import { Appbar } from "./Appbar";

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {/* Appbar */}
      <Appbar 
        onSignin={onSignIn}
        onSignout={() => {}} // Not needed for landing page
        user={undefined} // No user on landing page
      />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Digital Wallet,
            <span className="text-blue-400"> Simplified</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-16 leading-relaxed">
            Send money, receive payments, and manage your finances with ease. 
            BalanceBox makes digital transactions simple, secure, and instant.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Feature 1 */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:bg-slate-800/70 border border-slate-700/50">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Instant Transfers</h3>
            <p className="text-gray-300">Send and receive money instantly with our secure payment system. No waiting, no delays.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:bg-slate-800/70 border border-slate-700/50">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Bank-Level Security</h3>
            <p className="text-gray-300">Your money and data are protected with enterprise-grade security and encryption.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:bg-slate-800/70 border border-slate-700/50">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
            <p className="text-gray-300">Experience blazing fast transactions and real-time balance updates across all devices.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-6xl mx-auto mb-16 border border-slate-700/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">₹50L+</div>
              <div className="text-gray-300">Transactions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">How BalanceBox Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Sign Up</h3>
              <p className="text-gray-300">Create your account in minutes with just your phone number</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Add Money</h3>
              <p className="text-gray-300">Link your bank account and add money to your wallet securely</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Start Sending</h3>
              <p className="text-gray-300">Send money to anyone, anywhere, instantly with just their phone number</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users who trust BalanceBox for their digital payments</p>
          <Button 
            onClick={onGetStarted}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            Create Free Account
          </Button>
        </div>
      </div>
    </div>
  );
}
