
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { CallHistory } from "@/components/dashboard/CallHistory";
import { CallAnalytics } from "@/components/dashboard/CallAnalytics";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CallAnalytics />
          <CallHistory />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
