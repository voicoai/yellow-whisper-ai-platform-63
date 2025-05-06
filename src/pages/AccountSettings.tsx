
import { AppLayout } from "@/components/layout/AppLayout";
import { SpendingWidget } from "@/components/dashboard/SpendingWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const AccountSettings = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        
        <Tabs defaultValue="billing" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Profile Settings</h2>
              <p className="text-muted-foreground">Manage your profile information here.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <div className="space-y-4">
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-4">Billing Information</h2>
                <p className="text-muted-foreground">Manage your billing information and subscription details.</p>
              </Card>
              
              <SpendingWidget />
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>
              <p className="text-muted-foreground">Manage your notification settings here.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AccountSettings;
