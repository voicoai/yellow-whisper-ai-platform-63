
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { CallHistory } from "@/components/dashboard/CallHistory";
import { CallAnalytics } from "@/components/dashboard/CallAnalytics";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <DashboardStats />
        
        <CallAnalytics />
        
        <div className="grid grid-cols-1 gap-6">
          <CallHistory />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
