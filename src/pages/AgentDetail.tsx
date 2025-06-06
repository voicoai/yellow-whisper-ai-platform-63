
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AgentForm } from "@/components/agents/AgentForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AgentDetail = () => {
  const { id } = useParams();
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
              <h1 className="text-2xl font-semibold text-gray-900">{t('editAgent')}</h1>
              <p className="text-sm text-gray-600 mt-1">{t('configureAgent')}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
            <Trash2 size={16} className="mr-2" />
            {t('deleteAgent')}
          </Button>
        </div>
        
        <AgentForm />
      </div>
    </AppLayout>
  );
};

export default AgentDetail;
