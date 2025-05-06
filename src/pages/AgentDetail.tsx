
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AgentForm } from "@/components/agents/AgentForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AgentDetail = () => {
  const { id } = useParams();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link to="/agents">
                <ArrowLeft size={16} className="mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Edit Agent</h1>
          </div>
          <Button variant="destructive" size="sm">Delete Agent</Button>
        </div>
        
        <AgentForm />
      </div>
    </AppLayout>
  );
};

export default AgentDetail;
