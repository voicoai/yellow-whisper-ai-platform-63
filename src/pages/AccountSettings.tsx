
import { AppLayout } from "@/components/layout/AppLayout";
import { SpendingWidget } from "@/components/dashboard/SpendingWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, CreditCard, Bell, Settings, Mail, Shield } from "lucide-react";

const AccountSettings = () => {
  return (
    <AppLayout>
      <div className="space-y-8 max-w-4xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and billing information
          </p>
        </div>
        
        <Tabs defaultValue="billing" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50">
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal details and account information
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <Separator />
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <Shield className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Security Settings</CardTitle>
                      <CardDescription>
                        Manage your password and security preferences
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Enable Two-Factor Authentication
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="billing" className="mt-6">
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Billing Information</CardTitle>
                      <CardDescription>
                        Manage your subscription and payment methods
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">Current Plan</div>
                      <div className="text-sm text-muted-foreground">Professional Plan</div>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
                          <span className="text-sm">•••• •••• •••• 4242</span>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between">
                      <Button variant="outline">Download Invoice</Button>
                      <Button>Update Payment Method</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <SpendingWidget />
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose how you want to be notified about important updates
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1">
                      <div className="font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Notifications
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Receive updates about your account via email
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1">
                      <div className="font-medium">Marketing Communications</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified about new features and promotions
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1">
                      <div className="font-medium">Security Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Important security notifications and alerts
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-1">
                      <div className="font-medium">System Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Notifications about system maintenance and updates
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AccountSettings;
