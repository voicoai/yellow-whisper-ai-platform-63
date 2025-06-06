
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function CreditBalance() {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm h-full hover:shadow-md transition-shadow duration-300">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-medium">{t('creditBalance')}</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{t('current')}</span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-52 h-52">
          {/* Background gray circle */}
          <div className="absolute inset-0 rounded-full bg-gray-100"></div>
          
          {/* Yellow progress arc - updated to use new accent color with better visual style */}
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#FDDF5C" 
              strokeWidth="8"
              strokeDasharray="280"  
              strokeDashoffset="70"  
              strokeLinecap="round" 
              className="drop-shadow-sm"
            />
          </svg>
          
          {/* Content in the center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">$2,322</span>
            <span className="text-gray-400 text-sm">{t('available')}</span>
          </div>
        </div>
        
        <Button className="w-full mt-8 bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 font-medium text-base h-12 text-black flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow">
          <Plus size={18} />
          {t('buyCredits')}
        </Button>
      </div>
    </div>
  );
}
