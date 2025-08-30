"use client";

import { useState, useEffect } from "react";
import { getBalance } from "../../lib/actions/getBalance";

export function DashboardP2PTransfer() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [balance, setBalance] = useState<{ amount: number; locked: number }>({ amount: 0, locked: 0 });
  const [showBalance, setShowBalance] = useState(false);
  const [fetchingBalance, setFetchingBalance] = useState(false);

  // Fetch balance when component loads
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userBalance = await getBalance();
        setBalance(userBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  const fetchBalanceOnDemand = async () => {
    try {
      setFetchingBalance(true);
      const userBalance = await getBalance();
      setBalance(userBalance);
      setShowBalance(true);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError("Failed to fetch balance. Please try again.");
    } finally {
      setFetchingBalance(false);
    }
  };

  const handleSendMoney = async () => {
    // Clear previous messages
    setError("");
    setSuccess("");

    // Validate phone number
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    // Validate amount
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    if (amount < 1) {
      setError("Minimum transfer amount is ₹1");
      return;
    }

    // Check if user has sufficient balance
    if (amount > balance.amount) {
      setError(`Insufficient balance. Available: ₹${balance.amount}`);
      return;
    }

    try {
      setLoading(true);
      
      // TODO: Implement P2P transfer logic
      // await sendP2PTransfer(phoneNumber, amount);
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(`₹${amount} sent successfully to ${phoneNumber}`);
      
      // Reset form
      setPhoneNumber("");
      setAmount(0);
      
      // Refresh balance
      const updatedBalance = await getBalance();
      setBalance(updatedBalance);
      
    } catch (error) {
      console.error("Error sending money:", error);
      setError("Failed to send money. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = digits.slice(0, 10);
    
    // Format as XXX-XXX-XXXX if more than 6 digits
    if (limited.length > 6) {
      return `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6)}`;
    } else if (limited.length > 3) {
      return `${limited.slice(0, 3)}-${limited.slice(3)}`;
    }
    
    return limited;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError(""); // Clear error when user types
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Send Money</h2>

      <div className="max-w-md mx-auto">
        {/* Send Money Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Transfer to Phone Number</h3>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  📱
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123-456-7890"
                  onChange={handlePhoneChange}
                  maxLength={12} // Including dashes
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter 10-digit phone number</p>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 px-2">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  value={amount || ""}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Amount"
                  onChange={(e) => {
                    setError(""); // Clear error when user types
                    setSuccess(""); // Clear success message
                    setAmount(Number(e.target.value));
                  }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1 flex items-center">
                <span>Available Balance: </span>
                {showBalance ? (
                  <span className="ml-1">₹{balance.amount}</span>
                ) : (
                  <button
                    onClick={fetchBalanceOnDemand}
                    className="ml-1 text-blue-600 hover:text-blue-800 underline focus:outline-none italic"
                    disabled={fetchingBalance}
                  >
                    {fetchingBalance ? "checking..." : "check balance"}
                  </button>
                )}
                {showBalance && (
                  <button
                    onClick={() => setShowBalance(false)}
                    className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Send Button */}
            <button
              className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              onClick={handleSendMoney}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Money"}
            </button>

            {/* Quick Transfer Amounts */}
            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-semibold mb-3 text-gray-700">Quick Transfer</h4>
              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000, 2000, 5000, 10000].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => {
                      setAmount(quickAmount);
                      setError("");
                      setSuccess("");
                    }}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={quickAmount > balance.amount}
                  >
                    ₹{quickAmount}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}