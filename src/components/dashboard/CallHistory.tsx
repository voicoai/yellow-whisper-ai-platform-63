
import { useState, useEffect } from "react";

interface CallHistoryProps {
  selectedMonth: string;
}

export function CallHistory({ selectedMonth }: CallHistoryProps) {
  // Weekday abbreviations
  const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const [animatedHeights, setAnimatedHeights] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Mock data for different months - heights represent relative call volumes
  const getCallDataForMonth = (month: string) => {
    const callData: Record<string, number[]> = {
      "Juni 2025": [80, 60, 100, 70, 50, 30, 40],
      "Mai 2025": [68, 48, 85, 58, 38, 22, 28],
      "April 2025": [75, 55, 95, 65, 45, 25, 35],
      "März 2025": [70, 50, 90, 60, 40, 20, 30],
      "Februar 2025": [65, 50, 80, 60, 40, 25, 30],
      "Januar 2025": [60, 45, 75, 55, 35, 20, 25],
      "Dezember 2024": [76, 56, 94, 66, 46, 28, 36],
      "November 2024": [73, 53, 91, 63, 43, 27, 33],
      "Oktober 2024": [71, 51, 89, 61, 41, 25, 31],
      "September 2024": [69, 49, 86, 59, 39, 23, 29],
      "August 2024": [74, 54, 92, 64, 44, 26, 34],
      "Juli 2024": [72, 52, 88, 62, 42, 24, 32]
    };

    return callData[month] || callData["Juni 2025"];
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
    const duration = 1200; // Longer animation duration for smoother effect
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
      
      // More sophisticated easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      // Calculate current heights based on animation progress
      const currentHeights = startHeights.map((startHeight, index) => {
        const targetHeight = targetHeights[index];
        return startHeight + (targetHeight - startHeight) * easeOutQuart;
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

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-medium">Anrufverlauf</h3>
      </div>

      <div className="flex items-end justify-between h-40 mb-4">
        {weekdays.map((day, index) => (
          <div key={day} className="flex flex-col items-center">
            <div 
              className="w-10 bg-gradient-to-t from-voico-yellow-600 to-voico-yellow-500 rounded-t-md transition-all duration-1200 ease-out"
              style={{ 
                height: `${animatedHeights[index] || 0}px`,
                transformOrigin: 'bottom'
              }}
            ></div>
            <span className="text-xs text-gray-500 mt-2">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
