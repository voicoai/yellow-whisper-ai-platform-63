
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function AgentForm() {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="prompt">Prompt</TabsTrigger>
        <TabsTrigger value="voice">Voice</TabsTrigger>
        <TabsTrigger value="limits">Limits</TabsTrigger>
        <TabsTrigger value="integrations">Integrations</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>Agent Information</CardTitle>
            <CardDescription>Configure the basic settings for your AI agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input id="name" placeholder="Customer Support" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role Description</Label>
                <Input id="role" placeholder="Handles general inquiries" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="greeting">Greeting Message</Label>
              <Textarea 
                id="greeting"
                placeholder="Hello! This is [Company] AI assistant. How can I help you today?"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Assigned Phone Number</Label>
                <Select>
                  <SelectTrigger id="phone">
                    <SelectValue placeholder="Select a phone number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1555123456">+1 (555) 123-4567</SelectItem>
                    <SelectItem value="+1555234567">+1 (555) 234-5678</SelectItem>
                    <SelectItem value="+1555345678">+1 (555) 345-6789</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <div className="flex items-center space-x-3 pt-2">
                  <Switch id="status" />
                  <Label htmlFor="status">Active</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="prompt">
        <Card>
          <CardHeader>
            <CardTitle>Prompt Engineering</CardTitle>
            <CardDescription>Define how your agent thinks and responds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="system-prompt">System Prompt</Label>
              <Textarea 
                id="system-prompt"
                placeholder="You are a helpful customer support agent for [Company]. You handle inquiries about products, returns, and general questions..."
                rows={8}
                className="font-mono text-sm"
              />
            </div>
            
            <div className="p-4 bg-voico-yellow-50 rounded-md border border-voico-yellow-200">
              <h4 className="font-medium text-voico-blue-800 mb-2">AI Prompt Enhancement</h4>
              <p className="text-sm text-gray-700 mb-4">Let our AI improve your prompt for better results.</p>
              <Button className="bg-voico-blue-800 hover:bg-voico-blue-700">Enhance Prompt</Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="enhanced-prompt">Enhanced Prompt Preview</Label>
              <Textarea 
                id="enhanced-prompt"
                rows={8}
                className="font-mono text-sm bg-gray-50"
                readOnly
                value="You are a helpful customer support agent for [Company]. You are friendly, knowledgeable, and focused on solving customer issues efficiently. When handling product inquiries, always ask for specific product details before providing information. For returns, verify purchase date and order number. If you don't know something, admit it and offer to connect the customer with a human representative..."
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="voice">
        <VoiceConfig />
      </TabsContent>
      
      <TabsContent value="limits">
        <Card>
          <CardHeader>
            <CardTitle>Limits and Constraints</CardTitle>
            <CardDescription>Set boundaries for your agent's operation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="max-duration">Maximum Call Duration</Label>
                <div className="flex items-center space-x-3">
                  <Input id="max-duration" type="number" defaultValue="10" />
                  <span>minutes</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Calls longer than this will be automatically ended</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="languages">Supported Languages</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="languages">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="en-de">English & German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Agent Capabilities</Label>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  <Switch id="can-transfer" />
                  <Label htmlFor="can-transfer">Can transfer to human</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Switch id="can-sms" />
                  <Label htmlFor="can-sms">Can send SMS follow-ups</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Switch id="can-book" />
                  <Label htmlFor="can-book">Can book calendar appointments</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect your agent to external services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Calendar Integration</Label>
              <div className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Cal.com</h4>
                  <p className="text-sm text-gray-500">Allow agent to schedule appointments</p>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Workflow Automation</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Make.com</h4>
                    <p className="text-sm text-gray-500">Trigger automated workflows</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">n8n</h4>
                    <p className="text-sm text-gray-500">Connect to your automation nodes</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook">Webhook URL</Label>
              <div className="flex space-x-2">
                <Input id="webhook" placeholder="https://your-webhook.com/voico-endpoint" />
                <Button variant="outline">Test</Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">This webhook will be triggered on call events</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-voico-blue-800 hover:bg-voico-blue-700">Save Agent</Button>
      </div>
    </Tabs>
  );
}
