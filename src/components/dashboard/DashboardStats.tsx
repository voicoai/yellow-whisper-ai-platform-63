
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

interface DashboardStatsProps {
  selectedMonth: string;
}

interface StatsData {
  calls: number;
  answered: number;
  costs: string;
}

export function DashboardStats({ selectedMonth }: DashboardStatsProps) {
  const [animatedStats, setAnimatedStats] = useState<{ calls: number; answered: number; costsValue: number }>({
    calls: 0,
    answered: 0,
    costsValue: 0
  });
  
  // Mock data for different months
  const getStatsForMonth = (month: string) => {
    const statsData: Record<string, { calls: number; answered: number; costs: string }> = {
      "Juni 2025": { calls: 445, answered: 380, costs: "425,60€" },
      "Mai 2025": { calls: 365, answered: 295, costs: "356,25€" },
      "April 2025": { calls: 420, answered: 350, costs: "412,80€" },
      "März 2025": { calls: 392, answered: 320, costs: "374,40€" },
      "Februar 2025": { calls: 315, answered: 265, costs: "342,75€" },
      "Januar 2025": { calls: 285, answered: 230, costs: "298,50€" },
      "Dezember 2024": { calls: 405, answered: 340, costs: "396,75€" },
      "November 2024": { calls: 395, answered: 325, costs: "387,45€" },
      "Oktober 2024": { calls: 385, answered: 315, costs: "378,90€" },
      "September 2024": { calls: 375, answered: 310, costs: "367,85€" },
      "August 2024": { calls: 410, answered: 345, costs: "402,50€" },
      "Juli 2024": { calls: 398, answered: 330, costs: "389,20€" }
    };

    return statsData[month] || statsData["Juni 2025"];
  };

  // Parse cost string to number for animation
  const parseCostValue = (costString: string): number => {
    return parseFloat(costString.replace("€", "").replace(",", "."));
  };

  // Format cost number back to string
  const formatCost = (value: number): string => {
    return value.toFixed(2).replace(".", ",") + "€";
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
    const duration = 1200; // Longer duration for smoother animation

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
      <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Anrufe</span>
            <span className="text-3xl font-semibold mt-2 transition-all duration-300">{animatedStats.calls}</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-50 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="bg-green-50 p-1 rounded-full">
              <ArrowUpRight size={14} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Beantwortete Anrufe</span>
            <span className="text-3xl font-semibold mt-2 transition-all duration-300">{animatedStats.answered}</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-50 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                <path d="M15 13.5A3.5 3.5 0 0 1 18.5 10"></path>
                <path d="M13.5 13.5A3.5 3.5 0 0 0 10 10"></path>
                <path d="M10.5 8.5A3.5 3.5 0 0 1 14 5"></path>
                <path d="M8.5 8.5A3.5 3.5 0 0 0 5 5"></path>
                <path d="M22 22H2a9.82 9.82 0 0 1 20 0Z"></path>
              </svg>
            </div>
            <div className="bg-green-50 p-1 rounded-full">
              <ArrowUpRight size={14} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Kosten</span>
            <span className="text-3xl font-semibold mt-2 transition-all duration-300">{formatCost(animatedStats.costsValue)}</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-50 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                <circle cx="12" cy="12" r="8"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="bg-green-50 p-1 rounded-full">
              <ArrowUpRight size={14} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
