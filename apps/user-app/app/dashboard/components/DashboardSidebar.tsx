interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function DashboardSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {
  return (
    <div className="bg-white shadow-md h-[calc(100vh-80px)] sticky top-0 flex flex-col">
      {/* Top spacing */}
      <div className="flex-1"></div>
      
      {/* Centered Navigation */}
      <div className="px-4 py-8">
        <nav className="space-y-3">
          <button
            onClick={() => setActiveTab("home")}
            className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-200 ${
              activeTab === "home" 
                ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-500 shadow-sm" 
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">🏠</span>
              <span>Home</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("transfer")}
            className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-200 ${
              activeTab === "transfer" 
                ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-500 shadow-sm" 
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">💸</span>
              <span>Transfer</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`w-full text-left px-6 py-4 rounded-lg transition-all duration-200 ${
              activeTab === "transactions" 
                ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-500 shadow-sm" 
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">📊</span>
              <span>Transactions</span>
            </div>
          </button>
        </nav>
      </div>
      
      {/* Bottom spacing */}
      <div className="flex-1"></div>
    </div>
  );
}
