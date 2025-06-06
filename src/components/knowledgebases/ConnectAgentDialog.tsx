
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneOutgoing, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Agent {
  id: string;
  name: string;
  role: string;
  phoneNumber: string;
  callType: "inbound" | "outbound";
  languages: string[];
}

interface ConnectAgentDialogProps {
  kb: any;
  onBack: () => void;
}

export function ConnectAgentDialog({ kb, onBack }: ConnectAgentDialogProps) {
  const { toast } = useToast();
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Mock agents data - in a real app this would come from an API
  const agents: Agent[] = [
    {
      id: "agent-1",
      name: "Customer Support",
      role: "General inquiries assistant",
      phoneNumber: "+1 (555) 123-4567",
      callType: "inbound",
      languages: ["English"]
    },
    {
      id: "agent-2", 
      name: "Appointment Scheduler",
      role: "Calendar booking agent",
      phoneNumber: "+1 (555) 234-5678",
      callType: "outbound",
      languages: ["English", "German"]
    },
    {
      id: "agent-3",
      name: "Sales Assistant", 
      role: "Product information and sales",
      phoneNumber: "+1 (555) 345-6789",
      callType: "inbound",
      languages: ["English"]
    }
  ];

  const handleConnect = () => {
    if (selectedAgent) {
      const agent = agents.find(a => a.id === selectedAgent);
      toast({
        title: "Knowledge Base Connected",
        description: `${kb.title} has been connected to ${agent?.name}.`,
      });
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          ← Back
        </Button>
        <div className="h-6 w-px bg-gray-300"></div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Connect to Agent</h1>
          <p className="text-sm text-gray-600 mt-1">Choose an agent to connect "{kb.title}" knowledge base</p>
        </div>
      </div>

      <div className="max-w-4xl">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="text-lg font-medium text-gray-900">Available Agents</CardTitle>
            <CardDescription>Select an agent to connect this knowledge base</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent) => (
                <Card 
                  key={agent.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedAgent === agent.id 
                      ? 'border-[#FDDF5C] bg-[#FDDF5C]/5' 
                      : 'border-gray-200 hover:border-[#FDDF5C]/50'
                  }`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-[#FDDF5C]/20 rounded-md">
                        {agent.callType === "inbound" ? (
                          <Phone className="h-5 w-5 text-[#FDDF5C]" />
                        ) : (
                          <PhoneOutgoing className="h-5 w-5 text-[#FDDF5C]" />
                        )}
                      </div>
                      {selectedAgent === agent.id && (
                        <div className="p-1 bg-[#FDDF5C] rounded-full">
                          <Check className="h-3 w-3 text-black" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg font-medium text-gray-900">{agent.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">{agent.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Phone</span>
                        <span className="text-xs font-mono text-gray-700">{agent.phoneNumber}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Type</span>
                        <Badge
                          variant="secondary"
                          className={
                            agent.callType === "inbound"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {agent.callType}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {agent.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-1 bg-[#FDDF5C]/20 text-gray-700 rounded text-xs font-medium"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
              <Button variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button 
                onClick={handleConnect}
                disabled={!selectedAgent}
                className="bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black font-medium"
              >
                Connect Knowledge Base
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
