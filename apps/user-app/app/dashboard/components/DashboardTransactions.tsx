export function DashboardTransactions() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium">Payment to John</p>
              <p className="text-sm text-gray-600">Today, 2:30 PM</p>
            </div>
            <p className="font-semibold text-red-600">-₹500</p>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium">Received from Alice</p>
              <p className="text-sm text-gray-600">Yesterday, 4:15 PM</p>
            </div>
            <p className="font-semibold text-green-600">+₹1,200</p>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-medium">Bank Transfer</p>
              <p className="text-sm text-gray-600">Dec 25, 10:00 AM</p>
            </div>
            <p className="font-semibold text-green-600">+₹5,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
