import { useState, useEffect } from "react";
import { Phone, Users, CreditCard } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardStatsProps {
  selectedMonth: string;
}

interface StatsData {
  calls: number;
  answered: number;
  costs: string;
}

export function DashboardStats({ selectedMonth }: DashboardStatsProps) {
  const { t } = useLanguage();
  const [animatedStats, setAnimatedStats] = useState<{ calls: number; answered: number; costsValue: number }>({
    calls: 0,
    answered: 0,
    costsValue: 0
  });
  
  // Mock data for different months
  const getStatsForMonth = (month: string) => {
    const statsData: Record<string, { calls: number; answered: number; costs: string }> = {
      "June 2025": { calls: 445, answered: 380, costs: "$425.60" },
      "May 2025": { calls: 365, answered: 295, costs: "$356.25" },
      "April 2025": { calls: 420, answered: 350, costs: "$412.80" },
      "March 2025": { calls: 392, answered: 320, costs: "$374.40" },
      "February 2025": { calls: 315, answered: 265, costs: "$342.75" },
      "January 2025": { calls: 285, answered: 230, costs: "$298.50" },
      "December 2024": { calls: 405, answered: 340, costs: "$396.75" },
      "November 2024": { calls: 395, answered: 325, costs: "$387.45" },
      "October 2024": { calls: 385, answered: 315, costs: "$378.90" },
      "September 2024": { calls: 375, answered: 310, costs: "$367.85" },
      "August 2024": { calls: 410, answered: 345, costs: "$402.50" },
      "July 2024": { calls: 398, answered: 330, costs: "$389.20" }
    };

    return statsData[month] || statsData["June 2025"];
  };

  // Parse cost string to number for animation
  const parseCostValue = (costString: string): number => {
    return parseFloat(costString.replace("$", ""));
  };

  // Format cost number back to string
  const formatCost = (value: number): string => {
    return "$" + value.toFixed(2);
  };

  useEffect(() => {
    const stats = getStatsForMonth(selectedMonth);
    const targetCostValue = parseCostValue(stats.costs);
    
    // Initialize values on first render
    if (animatedStats.calls === 0) {
      setAnimatedStats({
        calls: stats.calls,
        answered: stats.answered,
        costsValue: targetCostValue
      });
      return;
    }

    const startValues = { ...animatedStats };
    const startTime = Date.now();
    const duration = 800; // Slightly faster animation for better UX

    const animateStats = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // More sophisticated easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      // Calculate current values based on animation progress
      const currentCalls = Math.round(startValues.calls + (stats.calls - startValues.calls) * easeOutQuart);
      const currentAnswered = Math.round(startValues.answered + (stats.answered - startValues.answered) * easeOutQuart);
      const currentCost = startValues.costsValue + (targetCostValue - startValues.costsValue) * easeOutQuart;
      
      setAnimatedStats({
        calls: currentCalls,
        answered: currentAnswered,
        costsValue: currentCost
      });
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animateStats);
      }
    };
    
    requestAnimationFrame(animateStats);
  }, [selectedMonth]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">{t('calls')}</span>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold text-black transition-all duration-300">{animatedStats.calls}</span>
              <span className="ml-2 text-sm text-green-500 font-medium">+4.3%</span>
            </div>
          </div>
          <div className="bg-voico-yellow-50 p-3 rounded-full">
            <Phone size={20} className="text-voico-yellow-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">{t('answeredCalls')}</span>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold text-black transition-all duration-300">{animatedStats.answered}</span>
              <span className="ml-2 text-sm text-green-500 font-medium">+2.7%</span>
            </div>
          </div>
          <div className="bg-voico-yellow-50 p-3 rounded-full">
            <Users size={20} className="text-voico-yellow-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">{t('costs')}</span>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold text-black transition-all duration-300">{formatCost(animatedStats.costsValue)}</span>
              <span className="ml-2 text-sm text-green-500 font-medium">-1.2%</span>
            </div>
          </div>
          <div className="bg-voico-yellow-50 p-3 rounded-full">
            <CreditCard size={20} className="text-voico-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
