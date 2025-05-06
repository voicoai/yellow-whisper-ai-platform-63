
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
import { Phone, PhoneOutgoing, Plus, Link as LinkIcon, ExternalLink, Webhook, BookOpen, FileText } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function AgentForm() {
  const [callType, setCallType] = useState("inbound");
  const { toast } = useToast();
  
  const handleCopyApiLink = () => {
    const apiLink = `https://api.voico.ai/v1/calls/agent-1/trigger`;
    navigator.clipboard.writeText(apiLink).then(() => {
      toast({
        title: "API link copied",
        description: "The API link has been copied to your clipboard",
      });
    });
  };

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="prompt">Prompt</TabsTrigger>
        <TabsTrigger value="voice">Voice</TabsTrigger>
        <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
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
            
            {callType === "outbound" && (
              <div className="p-4 bg-voico-blue-50 rounded-md border border-voico-blue-200 space-y-4">
                <h3 className="font-medium text-voico-blue-800 flex items-center gap-2">
                  <Webhook className="h-4 w-4" />
                  API Trigger Link
                </h3>
                <p className="text-sm text-gray-700">Use this API link to trigger outbound calls from external platforms like Make.com or n8n.</p>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input 
                    readOnly 
                    value="https://api.voico.ai/v1/calls/agent-1/trigger" 
                    className="font-mono text-sm bg-white flex-1"
                  />
                  <Button onClick={handleCopyApiLink} className="bg-voico-blue-800 hover:bg-voico-blue-700">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Copy API Link
                  </Button>
                </div>
                
                <div className="flex items-center justify-between pt-2 text-sm">
                  <span className="text-voico-blue-800">
                    Documentation
                  </span>
                  <Button variant="link" className="h-auto p-0" asChild>
                    <a href="https://docs.voico.ai/api" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-voico-blue-800">
                      View API Docs
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            )}
            
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
      
      <TabsContent value="knowledge">
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Bases</CardTitle>
            <CardDescription>Connect knowledge bases to make your agent smarter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-muted p-2 rounded-md">
                      <FileText className="h-4 w-4 text-voico-yellow-500" />
                    </div>
                    <div className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">
                      3 sources
                    </div>
                  </div>
                  <CardTitle className="text-base">Product Documentation</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">Documentation for our SaaS product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Disconnect
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-dashed flex flex-col items-center justify-center py-8">
                <div className="mb-2 bg-muted p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-base mb-1">Add Knowledge</h3>
                <p className="text-sm text-muted-foreground text-center px-4 mb-4">
                  Connect existing or create new knowledge bases
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/knowledge-bases">
                      Browse Existing
                    </Link>
                  </Button>
                  <Button size="sm" className="bg-voico-blue-800 hover:bg-voico-blue-700" asChild>
                    <Link to="/knowledge-bases?tab=create">
                      <Plus className="h-4 w-4 mr-1" />
                      Create New
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
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
