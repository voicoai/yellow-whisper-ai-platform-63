
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Agent {
  id: string;
  name: string;
}

interface ConnectAgentDialogProps {
  kb: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConnectAgentDialog({ kb, open, onOpenChange }: ConnectAgentDialogProps) {
  const { toast } = useToast();
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  // Mock agents data - in a real app this would come from an API
  const agents: Agent[] = [
    {
      id: "agent-1",
      name: "Customer Support"
    },
    {
      id: "agent-2", 
      name: "Appointment Scheduler"
    },
    {
      id: "agent-3",
      name: "Sales Assistant"
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
      
      setSelectedAgents([]);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setSelectedAgents([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect to Agents</DialogTitle>
          <DialogDescription>
            Select agents to connect "{kb?.title}" knowledge base
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center space-x-3">
              <Checkbox
                id={agent.id}
                checked={selectedAgents.includes(agent.id)}
                onCheckedChange={() => handleAgentToggle(agent.id)}
                className="data-[state=checked]:bg-[#FDDF5C] data-[state=checked]:border-[#FDDF5C]"
              />
              <label 
                htmlFor={agent.id} 
                className="text-sm font-medium text-gray-900 cursor-pointer"
              >
                {agent.name}
              </label>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleConnect}
            disabled={selectedAgents.length === 0}
            className="bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black font-medium"
          >
            Connect ({selectedAgents.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
