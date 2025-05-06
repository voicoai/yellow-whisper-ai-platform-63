
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { CallHistory } from "@/components/dashboard/CallHistory";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <DashboardStats />
        
        <div className="grid grid-cols-1 gap-6">
          <CallHistory />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
