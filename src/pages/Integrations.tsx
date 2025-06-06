
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Webhook, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Integrations = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">Connect your agent to external services</p>
        </div>
        
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-white border border-gray-200 p-1 text-gray-600 shadow-sm w-auto">
            <TabsTrigger 
              value="available"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FDDF5C] data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:bg-gray-50"
            >
              Available Integrations
            </TabsTrigger>
            <TabsTrigger 
              value="created"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FDDF5C] data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:bg-gray-50"
            >
              Created Integrations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <IntegrationCard 
                title="Cal.com" 
                description="Allow agents to schedule appointments"
                icon={<Calendar className="h-6 w-6 text-blue-500" />}
              />
              <IntegrationCard 
                title="Make.com" 
                description="Trigger automated workflows"
                icon={<Settings className="h-6 w-6 text-purple-500" />}
              />
              <IntegrationCard 
                title="n8n" 
                description="Connect to your automation nodes"
                icon={<Settings className="h-6 w-6 text-green-500" />}
              />
              <IntegrationCard 
                title="Webhook" 
                description="Send data to external APIs"
                icon={<Webhook className="h-6 w-6 text-orange-500" />}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="created" className="space-y-6">
            <div className="bg-voico-yellow-50 rounded-md border border-voico-yellow-200 p-4 mb-6">
              <h3 className="font-medium text-voico-blue-800">No integrations created yet</h3>
              <p className="text-sm text-gray-700 my-2">Create your first integration by selecting from the available integrations tab.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

// Helper component for integration cards
const IntegrationCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full">Connect</Button>
      </CardContent>
    </Card>
  );
};

export default Integrations;
