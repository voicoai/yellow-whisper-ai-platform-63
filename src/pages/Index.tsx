
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { CallHistory } from "@/components/dashboard/CallHistory";
import { CallAnalytics } from "@/components/dashboard/CallAnalytics";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="glass-card p-8 text-center bg-gradient-to-r from-white/5 to-white/10 border border-primary/20">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
            Welcome to VOICO
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered voice assistant platform. Monitor performance, manage agents, and optimize your telephony operations.
          </p>
        </div>

        {/* Stats Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
          <DashboardStats />
        </div>

        {/* Analytics Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Analytics</h2>
          <CallAnalytics />
        </div>
        
        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Recent Activity</h2>
          <CallHistory />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
