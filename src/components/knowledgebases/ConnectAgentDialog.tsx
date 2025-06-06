
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, PhoneOutgoing } from "lucide-react";
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
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

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

  const handleAgentToggle = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleConnect = () => {
    if (selectedAgents.length > 0) {
      const selectedAgentNames = agents
        .filter(agent => selectedAgents.includes(agent.id))
        .map(agent => agent.name)
        .join(", ");
      
      toast({
        title: "Knowledge Base Connected",
        description: `${kb.title} has been connected to: ${selectedAgentNames}.`,
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
          <p className="text-sm text-gray-600 mt-1">Select agents to connect "{kb.title}" knowledge base</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="text-lg font-medium text-gray-900">Available Agents</CardTitle>
            <CardDescription>Select one or more agents to connect this knowledge base</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {agents.map((agent) => (
                <div 
                  key={agent.id} 
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-[#FDDF5C]/50 transition-colors"
                >
                  <Checkbox
                    id={agent.id}
                    checked={selectedAgents.includes(agent.id)}
                    onCheckedChange={() => handleAgentToggle(agent.id)}
                    className="data-[state=checked]:bg-[#FDDF5C] data-[state=checked]:border-[#FDDF5C]"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-[#FDDF5C]/20 rounded-md">
                      {agent.callType === "inbound" ? (
                        <Phone className="h-5 w-5 text-[#FDDF5C]" />
                      ) : (
                        <PhoneOutgoing className="h-5 w-5 text-[#FDDF5C]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-600">{agent.role}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">{agent.phoneNumber}</span>
                        <span className="text-xs text-gray-500 capitalize">{agent.callType}</span>
                        <span className="text-xs text-gray-500">{agent.languages.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
              <Button variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button 
                onClick={handleConnect}
                disabled={selectedAgents.length === 0}
                className="bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black font-medium"
              >
                Connect Knowledge Base ({selectedAgents.length})
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
