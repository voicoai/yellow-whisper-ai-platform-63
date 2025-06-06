
import { useState, useEffect } from "react";
import { BarChart2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CallHistoryProps {
  selectedMonth: string;
}

export function CallHistory({ selectedMonth }: CallHistoryProps) {
  const { t } = useLanguage();
  
  // Weekday abbreviations
  const weekdays = [t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat'), t('sun')];
  const [animatedHeights, setAnimatedHeights] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Mock data for different months - heights represent relative call volumes with more dramatic variations
  const getCallDataForMonth = (month: string) => {
    const callData: Record<string, number[]> = {
      "June 2025": [85, 45, 120, 65, 95, 25, 35],
      "May 2025": [70, 30, 100, 40, 80, 15, 20],
      "April 2025": [90, 55, 110, 75, 60, 35, 45],
      "March 2025": [65, 40, 85, 50, 70, 20, 25],
      "February 2025": [75, 25, 95, 45, 85, 10, 30],
      "January 2025": [55, 35, 75, 40, 65, 15, 20],
      "December 2024": [95, 60, 130, 80, 105, 40, 50],
      "November 2024": [80, 45, 115, 70, 90, 30, 40],
      "October 2024": [70, 35, 105, 55, 75, 25, 35],
      "September 2024": [85, 50, 125, 65, 95, 35, 45],
      "August 2024": [60, 25, 90, 35, 70, 15, 25],
      "July 2024": [100, 65, 140, 85, 110, 45, 55]
    };

    return callData[month] || callData["June 2025"];
  };

  useEffect(() => {
    console.log('CallHistory: selectedMonth changed to:', selectedMonth);
    
    // Start transition when month changes
    setIsTransitioning(true);
    
    // Get target heights for the new month
    const targetHeights = getCallDataForMonth(selectedMonth);
    console.log('CallHistory: target heights for', selectedMonth, ':', targetHeights);
    
    // Animate to new heights over time
    const startTime = Date.now();
    const duration = 600; // Much faster animation duration
    const startHeights = animatedHeights.length > 0 ? [...animatedHeights] : new Array(7).fill(0);
    
    // If this is first render, initialize with target heights
    if (animatedHeights.length === 0) {
      console.log('CallHistory: First render, setting initial heights');
      setAnimatedHeights(targetHeights);
      setIsTransitioning(false);
      return;
    }
    
    const animateHeights = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smoother easing function for more fluid animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      // Calculate current heights based on animation progress
      const currentHeights = startHeights.map((startHeight, index) => {
        const targetHeight = targetHeights[index];
        return startHeight + (targetHeight - startHeight) * easeOutCubic;
      });
      
      setAnimatedHeights(currentHeights);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animateHeights);
      } else {
        setIsTransitioning(false);
        console.log('CallHistory: Animation completed for', selectedMonth);
      }
    };
    
    requestAnimationFrame(animateHeights);
  }, [selectedMonth]);

  // Find the max height for visual reference
  const maxHeight = Math.max(...(animatedHeights.length ? animatedHeights : [0]));

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-medium">{t('callHistory')}</h3>
        <div className="bg-voico-yellow-50 p-2 rounded-full">
          <BarChart2 size={16} className="text-voico-yellow-600" />
        </div>
      </div>

      <div className="flex items-end justify-between h-40 mb-4 px-2">
        {weekdays.map((day, index) => (
          <div key={day} className="flex flex-col items-center group">
            <div 
              className="relative w-12 flex justify-center"
              style={{ height: '140px' }}
            >
              <div className="absolute bottom-0 w-0.5 h-full bg-gray-100"></div>
              <div 
                className="absolute bottom-0 w-10 bg-gradient-to-t from-voico-yellow-600 to-voico-yellow-400 rounded-t-md transition-all duration-600 ease-out hover:from-voico-yellow-700 hover:to-voico-yellow-500 z-10 cursor-pointer group-hover:shadow-md"
                style={{ 
                  height: `${animatedHeights[index] || 0}px`,
                  transformOrigin: 'bottom'
                }}
              ></div>
              {/* Hover tooltip */}
              <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 pointer-events-none">
                {Math.round(animatedHeights[index] || 0)} {t('callsUnit')}
              </div>
            </div>
            <span className="text-xs text-gray-500 mt-2">{day}</span>
          </div>
        ))}
      </div>
      
      {/* Add a simple line showing average */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-voico-yellow-600"></div>
          <span className="text-xs text-gray-600">{t('avgCallsPerDay')} {Math.round(animatedHeights.reduce((a, b) => a + b, 0) / 7)} {t('callsPerDay')}</span>
        </div>
        <span className="text-xs text-gray-500">{t('total')}: {animatedHeights.reduce((a, b) => a + b, 0)}</span>
      </div>
    </div>
  );
}
