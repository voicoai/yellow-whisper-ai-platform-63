
import { AppLayout } from "@/components/layout/AppLayout";
import { AgentsList } from "@/components/agents/AgentsList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Agents = () => {
  return (
    <AppLayout>
      <AgentsList />
    </AppLayout>
  );
};

export default Agents;
