import { DashboardHome } from "./DashboardHome";
import { DashboardTransfer } from "./DashboardTransfer";
import { DashboardTransactions } from "./DashboardTransactions";
import { DashboardP2PTransfer } from "./DashboardP2PTransfer";

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
      case "p2p-transfer":
        return <DashboardP2PTransfer />;
      default:
        return <DashboardHome />;
    }
  };

  return <div className="w-full">{renderContent()}</div>;
}
