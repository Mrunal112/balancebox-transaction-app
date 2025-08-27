import { Button } from "@balancebox/ui/button";
import { onRampTransaction } from "../../lib/actions/createOnRampTransaction";
import { getRecentTransaction } from "../../lib/actions/getRecentTransaction";
import { useState, useEffect } from "react";

export function DashboardTransfer() {
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState("hdfc");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions when component loads
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const recentTransactions = await getRecentTransaction();
        setTransactions(recentTransactions);
        console.log("Fetched transactions:", recentTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleAddMoney = async () => {
    await onRampTransaction(amount, provider);
    const recentTransactions = await getRecentTransaction();
    setTransactions(recentTransactions);
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Transfer Money</h2>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Add Money Section */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Add Money</h3>
          <div className="space-y-4">
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
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Amount"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank
              </label>
              <div className="relative">
                <select
                  className="w-full px-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                  onChange={(e) => setProvider(e.target.value)}
                >
                  <option value="hdfc">HDFC Bank</option>
                  <option value="sbi">SBI Bank</option>
                  <option value="icici">ICICI Bank</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <Button
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
              onClick={handleAddMoney}
            >
              Add Money
            </Button>
          </div>
        </div>

        {/* Balance Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Balance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Unlocked balance</span>
              <span className="font-semibold">₹200 INR</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Total Locked Balance</span>
              <span className="font-semibold">₹0 INR</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t pt-4">
              <span className="text-gray-700 font-medium">Total Balance</span>
              <span className="font-bold text-lg">₹200 INR</span>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-3">Recent Transactions</h4>
            {loading ? (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500">Loading transactions...</p>
              </div>
            ) : transactions.length > 0 ? (
              <div className="space-y-2">
                {transactions.map((transaction, index) => (
                  <div key={transaction.id || index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">
                          {transaction.status === "Success" ? "Received" : "Processing"} INR
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.startTime).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className={`font-semibold ${
                        transaction.status === "Success" ? "text-green-600" : "text-yellow-600"
                      }`}>
                        {transaction.status === "Success" ? "+" : ""} ₹{transaction.amount / 100}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500">No transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
