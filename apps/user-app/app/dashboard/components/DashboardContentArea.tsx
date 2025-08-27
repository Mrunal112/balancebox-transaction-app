import { DashboardHome } from "./DashboardHome";
import { DashboardTransfer } from "./DashboardTransfer";
import { DashboardTransactions } from "./DashboardTransactions";

interface DashboardContentAreaProps {
  activeTab: string;
}

export function DashboardContentArea({ activeTab }: DashboardContentAreaProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome />;
      case "transfer":
        return <DashboardTransfer />;
      case "transactions":
        return <DashboardTransactions />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="w-full">
      {renderContent()}
    </div>
  );
}
