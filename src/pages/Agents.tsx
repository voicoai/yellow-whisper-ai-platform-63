
import { AppLayout } from "@/components/layout/AppLayout";
import { AgentsList } from "@/components/agents/AgentsList";

const Agents = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-black">AI Agents</h1>
            <p className="text-gray-600 mt-1">Manage your voice assistants and their configurations</p>
          </div>
        </div>
        
        <AgentsList />
      </div>
    </AppLayout>
  );
};

export default Agents;
