
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
  const [isActive, setIsActive] = useState(true);
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
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue="general" className="w-full">
        {/* Modern Tab Navigation */}
        <div className="border-b border-gray-100 mb-8">
          <TabsList className="inline-flex h-12 items-center justify-center rounded-none bg-transparent p-0">
            <TabsTrigger 
              value="general" 
              className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-6 pb-3 pt-3 font-medium text-gray-500 shadow-none transition-all data-[state=active]:border-[#FDDF5C] data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
            >
              General
            </TabsTrigger>
            <TabsTrigger 
              value="prompt" 
              className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-6 pb-3 pt-3 font-medium text-gray-500 shadow-none transition-all data-[state=active]:border-[#FDDF5C] data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
            >
              Prompt
            </TabsTrigger>
            <TabsTrigger 
              value="voice" 
              className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-6 pb-3 pt-3 font-medium text-gray-500 shadow-none transition-all data-[state=active]:border-[#FDDF5C] data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
            >
              Voice
            </TabsTrigger>
            <TabsTrigger 
              value="knowledge" 
              className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-6 pb-3 pt-3 font-medium text-gray-500 shadow-none transition-all data-[state=active]:border-[#FDDF5C] data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
            >
              Knowledge
            </TabsTrigger>
            <TabsTrigger 
              value="integrations" 
              className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-6 pb-3 pt-3 font-medium text-gray-500 shadow-none transition-all data-[state=active]:border-[#FDDF5C] data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
            >
              Integrations
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="general" className="space-y-8">
          <Card className="border-0 shadow-none bg-white rounded-xl">
            <CardHeader className="border-b border-gray-50 pb-6">
              <CardTitle className="text-xl font-semibold text-gray-900">Agent Information</CardTitle>
              <CardDescription className="text-gray-500">Configure the basic settings for your AI agent</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Agent Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Customer Support" 
                    className="h-11 border-gray-200 rounded-lg focus:border-[#FDDF5C] focus:ring-1 focus:ring-[#FDDF5C] transition-colors" 
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="role" className="text-sm font-medium text-gray-700">Role Description</Label>
                  <Input 
                    id="role" 
                    placeholder="Handles general inquiries" 
                    className="h-11 border-gray-200 rounded-lg focus:border-[#FDDF5C] focus:ring-1 focus:ring-[#FDDF5C] transition-colors" 
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <Label className="text-sm font-medium text-gray-700">Call Direction</Label>
                <RadioGroup 
                  value={callType} 
                  onValueChange={setCallType}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-4 p-6 border border-gray-100 rounded-xl hover:border-[#FDDF5C] hover:bg-[#FDDF5C]/5 transition-all cursor-pointer group">
                    <RadioGroupItem value="inbound" id="inbound" className="border-gray-300 text-[#FDDF5C]" />
                    <Label htmlFor="inbound" className="flex items-center cursor-pointer flex-1">
                      <div className="mr-4 p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Inbound Calls</span>
                        <p className="text-sm text-gray-500">Agent receives calls from customers</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-4 p-6 border border-gray-100 rounded-xl hover:border-[#FDDF5C] hover:bg-[#FDDF5C]/5 transition-all cursor-pointer group">
                    <RadioGroupItem value="outbound" id="outbound" className="border-gray-300 text-[#FDDF5C]" />
                    <Label htmlFor="outbound" className="flex items-center cursor-pointer flex-1">
                      <div className="mr-4 p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                        <PhoneOutgoing className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Outbound Calls</span>
                        <p className="text-sm text-gray-500">Agent makes calls to customers</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {callType === "outbound" && (
                <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Webhook className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-blue-900">API Trigger Link</h3>
                  </div>
                  <p className="text-sm text-blue-700">Use this API link to trigger outbound calls from external platforms like Make.com or n8n.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input 
                      readOnly 
                      value="https://api.voico.ai/v1/calls/agent-1/trigger" 
                      className="font-mono text-sm bg-white border-blue-200 h-11 rounded-lg flex-1"
                    />
                    <Button onClick={handleCopyApiLink} className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-6 rounded-lg">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Copy Link
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium text-blue-900">API Documentation</span>
                    <Button variant="link" className="h-auto p-0 text-blue-600" asChild>
                      <a href="https://docs.voico.ai/api" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        View Docs
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <Label htmlFor="greeting" className="text-sm font-medium text-gray-700">Greeting Message</Label>
                <Textarea 
                  id="greeting"
                  placeholder="Hello! This is [Company] AI assistant. How can I help you today?"
                  rows={4}
                  className="border-gray-200 rounded-lg focus:border-[#FDDF5C] focus:ring-1 focus:ring-[#FDDF5C] resize-none transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Assigned Phone Number</Label>
                  <Select>
                    <SelectTrigger id="phone" className="h-11 border-gray-200 rounded-lg focus:border-[#FDDF5C] focus:ring-1 focus:ring-[#FDDF5C]">
                      <SelectValue placeholder="Select a phone number" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                      <SelectItem value="+1555123456">+1 (555) 123-4567</SelectItem>
                      <SelectItem value="+1555234567">+1 (555) 234-5678</SelectItem>
                      <SelectItem value="+1555345678">+1 (555) 345-6789</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">Agent Status</Label>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm font-medium text-gray-900">
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <Switch 
                      checked={isActive}
                      onCheckedChange={setIsActive}
                      className="data-[state=checked]:bg-[#FDDF5C] data-[state=unchecked]:bg-gray-200"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prompt" className="space-y-8">
          <Card className="border-0 shadow-none bg-white rounded-xl">
            <CardHeader className="border-b border-gray-50 pb-6">
              <CardTitle className="text-xl font-semibold text-gray-900">Prompt Engineering</CardTitle>
              <CardDescription className="text-gray-500">Define how your agent thinks and responds</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-3">
                <Label htmlFor="system-prompt" className="text-sm font-medium text-gray-700">System Prompt</Label>
                <Textarea 
                  id="system-prompt"
                  placeholder="You are a helpful customer support agent for [Company]. You handle inquiries about products, returns, and general questions..."
                  rows={10}
                  className="font-mono text-sm border-gray-200 rounded-lg focus:border-[#FDDF5C] focus:ring-1 focus:ring-[#FDDF5C] resize-none transition-colors"
                />
              </div>
              
              <div className="p-8 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Sparkles className="h-5 w-5 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">AI Prompt Enhancement</h4>
                </div>
                <p className="text-sm text-gray-700 mb-6">Let our AI improve your prompt for better results and more natural conversations.</p>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white h-11 px-6 rounded-lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Enhance Prompt
                </Button>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="enhanced-prompt" className="text-sm font-medium text-gray-700">Enhanced Prompt Preview</Label>
                <Textarea 
                  id="enhanced-prompt"
                  rows={10}
                  className="font-mono text-sm bg-gray-50 border-gray-200 rounded-lg resize-none"
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
        
        <TabsContent value="knowledge" className="space-y-8">
          <Card className="border-0 shadow-none bg-white rounded-xl">
            <CardHeader className="border-b border-gray-50 pb-6">
              <CardTitle className="text-xl font-semibold text-gray-900">Knowledge Bases</CardTitle>
              <CardDescription className="text-gray-500">Connect knowledge bases to make your agent smarter</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border border-[#FDDF5C]/30 bg-gradient-to-br from-[#FDDF5C]/5 to-yellow-50 rounded-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-[#FDDF5C]/20 p-3 rounded-lg">
                        <FileText className="h-5 w-5 text-[#FDDF5C]" />
                      </div>
                      <div className="text-xs text-gray-500 px-2 py-1 rounded-full bg-white/80 border border-gray-200">
                        3 sources
                      </div>
                    </div>
                    <CardTitle className="text-lg text-gray-900">Product Documentation</CardTitle>
                    <CardDescription className="text-sm text-gray-600">Documentation for our SaaS product</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 ml-auto h-9 px-4 rounded-lg">
                      Disconnect
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-12 hover:border-[#FDDF5C] hover:bg-[#FDDF5C]/5 transition-all cursor-pointer rounded-xl">
                  <div className="mb-4 bg-gray-100 p-4 rounded-xl">
                    <BookOpen className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Add Knowledge</h3>
                  <p className="text-sm text-gray-600 text-center px-6 mb-6">
                    Connect existing or create new knowledge bases
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild className="border-gray-200 h-9 px-4 rounded-lg">
                      <Link to="/knowledge-bases">Browse</Link>
                    </Button>
                    <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white h-9 px-4 rounded-lg" asChild>
                      <Link to="/knowledge-bases?tab=create">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-8">
          <Card className="border-0 shadow-none bg-white rounded-xl">
            <CardHeader className="border-b border-gray-50 pb-6">
              <CardTitle className="text-xl font-semibold text-gray-900">Integrations</CardTitle>
              <CardDescription className="text-gray-500">Connected services for this agent</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="bg-gray-50 rounded-xl border border-gray-100 p-12 text-center">
                <div className="mb-4 bg-gray-100 p-4 rounded-xl w-fit mx-auto">
                  <Webhook className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">No integrations connected</h3>
                <p className="text-sm text-gray-600 mb-6">This agent doesn't have any integrations connected yet.</p>
                <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white h-11 px-6 rounded-lg">
                  <Link to="/integrations">
                    <Plus className="mr-2 h-4 w-4" />
                    Connect Integration
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
          <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 h-11 px-6 rounded-lg">
            Cancel
          </Button>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white h-11 px-6 rounded-lg">
            <Save className="mr-2 h-4 w-4" />
            Save Agent
          </Button>
        </div>
      </Tabs>
    </div>
  );
}
