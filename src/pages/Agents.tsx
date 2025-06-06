
import { AppLayout } from "@/components/layout/AppLayout";
import { AgentsList } from "@/components/agents/AgentsList";
import { useLanguage } from "@/contexts/LanguageContext";

const Agents = () => {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium text-black">{t('aiAgents')}</h1>
            <p className="text-gray-600 mt-1">{t('manageVoiceAssistants')}</p>
          </div>
        </div>
        
        <AgentsList />
      </div>
    </AppLayout>
  );
};

export default Agents;
