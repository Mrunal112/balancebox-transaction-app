export function DashboardHome() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-medium text-gray-700 mb-2">Total Balance</h3>
          <p className="text-2xl font-bold text-green-600">₹25,000</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-medium text-gray-700 mb-2">This Month</h3>
          <p className="text-2xl font-bold text-blue-600">₹8,500</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-medium text-gray-700 mb-2">Transactions</h3>
          <p className="text-2xl font-bold text-purple-600">47</p>
        </div>
      </div>
    </div>
  );
}
