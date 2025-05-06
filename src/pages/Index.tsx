
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { SpendingWidget } from "@/components/dashboard/SpendingWidget";
import { CallHistory } from "@/components/dashboard/CallHistory";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <SpendingWidget />
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2">
            <CallHistory />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
