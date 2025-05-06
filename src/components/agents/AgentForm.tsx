import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { VoiceConfig } from "@/components/agents/VoiceConfig";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Phone, PhoneOutgoing, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function AgentForm() {
  const [callType, setCallType] = useState("inbound");

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-4 mb-8">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="prompt">Prompt</TabsTrigger>
        <TabsTrigger value="voice">Voice</TabsTrigger>
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
              <Label>Call Direction</Label>
              <RadioGroup 
                value={callType} 
                onValueChange={setCallType}
                className="flex flex-col space-y-3 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inbound" id="inbound" />
                  <Label htmlFor="inbound" className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>Inbound Calls</span>
                    <span className="ml-2 text-xs text-gray-500">(Agent receives calls from customers)</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outbound" id="outbound" />
                  <Label htmlFor="outbound" className="flex items-center">
                    <PhoneOutgoing className="mr-2 h-4 w-4" />
                    <span>Outbound Calls</span>
                    <span className="ml-2 text-xs text-gray-500">(Agent makes calls to customers)</span>
                  </Label>
                </div>
              </RadioGroup>
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
      
      <TabsContent value="integrations">
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connected services for this agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-voico-yellow-50 rounded-md border border-voico-yellow-200 p-4 mb-6">
              <h3 className="font-medium text-voico-blue-800">No integrations connected</h3>
              <p className="text-sm text-gray-700 my-2">This agent doesn't have any integrations connected yet.</p>
            </div>
            
            <Button asChild className="bg-voico-blue-800 hover:bg-voico-blue-700">
              <Link to="/integrations">
                <Plus className="mr-2 h-4 w-4" />
                Connect Integration
              </Link>
            </Button>
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
