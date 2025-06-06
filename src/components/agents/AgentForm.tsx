
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
import { Phone, PhoneOutgoing, Plus, Link as LinkIcon, ExternalLink, Webhook, BookOpen, FileText, Sparkles, Save } from "lucide-react";
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
    <div className="max-w-5xl mx-auto">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8 bg-gray-50 p-1 rounded-lg">
          <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">General</TabsTrigger>
          <TabsTrigger value="prompt" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Prompt</TabsTrigger>
          <TabsTrigger value="voice" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Voice</TabsTrigger>
          <TabsTrigger value="knowledge" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Knowledge</TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="text-lg font-semibold text-gray-900">Agent Information</CardTitle>
              <CardDescription className="text-gray-600">Configure the basic settings for your AI agent</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Agent Name</Label>
                  <Input id="name" placeholder="Customer Support" className="border-gray-200 focus:border-[#FDDF5C] focus:ring-[#FDDF5C]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium text-gray-700">Role Description</Label>
                  <Input id="role" placeholder="Handles general inquiries" className="border-gray-200 focus:border-[#FDDF5C] focus:ring-[#FDDF5C]" />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">Call Direction</Label>
                <RadioGroup 
                  value={callType} 
                  onValueChange={setCallType}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <RadioGroupItem value="inbound" id="inbound" />
                    <Label htmlFor="inbound" className="flex items-center cursor-pointer flex-1">
                      <Phone className="mr-3 h-5 w-5 text-blue-600" />
                      <div>
                        <span className="font-medium text-gray-900">Inbound Calls</span>
                        <p className="text-xs text-gray-500">Agent receives calls from customers</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                    <RadioGroupItem value="outbound" id="outbound" />
                    <Label htmlFor="outbound" className="flex items-center cursor-pointer flex-1">
                      <PhoneOutgoing className="mr-3 h-5 w-5 text-green-600" />
                      <div>
                        <span className="font-medium text-gray-900">Outbound Calls</span>
                        <p className="text-xs text-gray-500">Agent makes calls to customers</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {callType === "outbound" && (
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <Webhook className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">API Trigger Link</h3>
                  </div>
                  <p className="text-sm text-blue-700">Use this API link to trigger outbound calls from external platforms like Make.com or n8n.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input 
                      readOnly 
                      value="https://api.voico.ai/v1/calls/agent-1/trigger" 
                      className="font-mono text-sm bg-white border-blue-200 flex-1"
                    />
                    <Button onClick={handleCopyApiLink} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Copy Link
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium text-blue-900">API Documentation</span>
                    <Button variant="link" className="h-auto p-0 text-blue-600" asChild>
                      <a href="https://docs.voico.ai/api" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        View Docs
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="greeting" className="text-sm font-medium text-gray-700">Greeting Message</Label>
                <Textarea 
                  id="greeting"
                  placeholder="Hello! This is [Company] AI assistant. How can I help you today?"
                  rows={3}
                  className="border-gray-200 focus:border-[#FDDF5C] focus:ring-[#FDDF5C]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Assigned Phone Number</Label>
                  <Select>
                    <SelectTrigger id="phone" className="border-gray-200 focus:border-[#FDDF5C] focus:ring-[#FDDF5C]">
                      <SelectValue placeholder="Select a phone number" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      <SelectItem value="+1555123456">+1 (555) 123-4567</SelectItem>
                      <SelectItem value="+1555234567">+1 (555) 234-5678</SelectItem>
                      <SelectItem value="+1555345678">+1 (555) 345-6789</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status</Label>
                  <div className="flex items-center space-x-3 pt-2">
                    <Switch id="status" />
                    <Label htmlFor="status" className="text-sm text-gray-700">Active</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompt" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="text-lg font-semibold text-gray-900">Prompt Engineering</CardTitle>
              <CardDescription className="text-gray-600">Define how your agent thinks and responds</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="system-prompt" className="text-sm font-medium text-gray-700">System Prompt</Label>
                <Textarea 
                  id="system-prompt"
                  placeholder="You are a helpful customer support agent for [Company]. You handle inquiries about products, returns, and general questions..."
                  rows={8}
                  className="font-mono text-sm border-gray-200 focus:border-[#FDDF5C] focus:ring-[#FDDF5C]"
                />
              </div>
              
              <div className="p-6 bg-[#FDDF5C]/10 rounded-lg border border-[#FDDF5C]/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-[#FDDF5C]" />
                  <h4 className="font-semibold text-gray-900">AI Prompt Enhancement</h4>
                </div>
                <p className="text-sm text-gray-700 mb-4">Let our AI improve your prompt for better results.</p>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Enhance Prompt
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="enhanced-prompt" className="text-sm font-medium text-gray-700">Enhanced Prompt Preview</Label>
                <Textarea 
                  id="enhanced-prompt"
                  rows={8}
                  className="font-mono text-sm bg-gray-50 border-gray-200"
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
        
        <TabsContent value="knowledge" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="text-lg font-semibold text-gray-900">Knowledge Bases</CardTitle>
              <CardDescription className="text-gray-600">Connect knowledge bases to make your agent smarter</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-2 border-[#FDDF5C]/30 bg-[#FDDF5C]/5">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-[#FDDF5C]/20 p-2 rounded-lg">
                        <FileText className="h-4 w-4 text-[#FDDF5C]" />
                      </div>
                      <div className="text-xs text-gray-500 px-2 py-1 rounded-full bg-gray-100">
                        3 sources
                      </div>
                    </div>
                    <CardTitle className="text-base text-gray-900">Product Documentation</CardTitle>
                    <CardDescription className="text-sm text-gray-600">Documentation for our SaaS product</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 ml-auto">
                      Disconnect
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-dashed border-2 border-gray-200 flex flex-col items-center justify-center py-8 hover:border-gray-300 transition-colors">
                  <div className="mb-3 bg-gray-100 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Add Knowledge</h3>
                  <p className="text-sm text-gray-600 text-center px-4 mb-4">
                    Connect existing or create new knowledge bases
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="border-gray-200">
                      <Link to="/knowledge-bases">Browse</Link>
                    </Button>
                    <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white" asChild>
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
        
        <TabsContent value="integrations" className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50">
              <CardTitle className="text-lg font-semibold text-gray-900">Integrations</CardTitle>
              <CardDescription className="text-gray-600">Connected services for this agent</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                <div className="mb-3 bg-gray-100 p-3 rounded-full w-fit mx-auto">
                  <Webhook className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">No integrations connected</h3>
                <p className="text-sm text-gray-600 mb-4">This agent doesn't have any integrations connected yet.</p>
                <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
                  <Link to="/integrations">
                    <Plus className="mr-2 h-4 w-4" />
                    Connect Integration
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
            Cancel
          </Button>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            <Save className="mr-2 h-4 w-4" />
            Save Agent
          </Button>
        </div>
      </Tabs>
    </div>
  );
}
