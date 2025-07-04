
import { AppLayout } from "@/components/layout/AppLayout";
import { AgentForm } from "@/components/agents/AgentForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AgentCreate = () => {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Link to="/agents" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                {t('backToAgents')}
              </Link>
            </Button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{t('createNewAgent')}</h1>
              <p className="text-sm text-gray-600 mt-1">{t('configureNewAgent')}</p>
            </div>
          </div>
        </div>
        
        <AgentForm />
      </div>
    </AppLayout>
  );
};

export default AgentCreate;
