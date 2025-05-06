
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Phone, Settings, Plus } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  phoneNumber: string;
  callCount: number;
  avgDuration: string;
  costPerMinute: number;
  languages: string[];
}

export function AgentsList() {
  // Sample data - in a real app this would come from an API
  const agents: Agent[] = [
    {
      id: "agent-1",
      name: "Customer Support",
      role: "General inquiries assistant",
      phoneNumber: "+1 (555) 123-4567",
      callCount: 87,
      avgDuration: "3m 22s",
      costPerMinute: 0.06,
      languages: ["English"]
    },
    {
      id: "agent-2",
      name: "Appointment Scheduler",
      role: "Calendar booking agent",
      phoneNumber: "+1 (555) 234-5678",
      callCount: 42,
      avgDuration: "2m 47s",
      costPerMinute: 0.05,
      languages: ["English", "German"]
    },
    {
      id: "agent-3",
      name: "Sales Assistant",
      role: "Product information and sales",
      phoneNumber: "+1 (555) 345-6789",
      callCount: 56,
      avgDuration: "4m 12s",
      costPerMinute: 0.06,
      languages: ["English"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Your AI Agents</h2>
        <Button className="bg-voico-blue-800 hover:bg-voico-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Create Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Card key={agent.id} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{agent.name}</CardTitle>
              <CardDescription>{agent.role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{agent.phoneNumber}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="font-medium">{agent.callCount}</div>
                  <div className="text-xs text-gray-500">Calls</div>
                </div>
                <div>
                  <div className="font-medium">{agent.avgDuration}</div>
                  <div className="text-xs text-gray-500">Avg. time</div>
                </div>
                <div>
                  <div className="font-medium">${agent.costPerMinute.toFixed(3)}</div>
                  <div className="text-xs text-gray-500">Per min</div>
                </div>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-700">Languages:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {agent.languages.map((lang) => (
                    <span key={lang} className="px-2 py-0.5 bg-voico-yellow-100 text-voico-blue-800 rounded text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/agents/${agent.id}`}>View Details</Link>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Settings size={16} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
