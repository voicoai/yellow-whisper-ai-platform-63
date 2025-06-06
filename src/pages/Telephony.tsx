
import { AppLayout } from "@/components/layout/AppLayout";
import { NumbersManagement } from "@/components/telephony/NumbersManagement";
import { useLanguage } from "@/contexts/LanguageContext";

const Telephony = () => {
  const { t } = useLanguage();
  
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-medium text-black">{t('phoneNumbers')}</h1>
          <p className="text-gray-600 mt-1">{t('manageTelephonyConfig')}</p>
        </div>
        <NumbersManagement />
      </div>
    </AppLayout>
  );
};

export default Telephony;
