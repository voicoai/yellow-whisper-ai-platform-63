
import { useState, useEffect } from "react";

interface CallHistoryProps {
  selectedMonth: string;
}

export function CallHistory({ selectedMonth }: CallHistoryProps) {
  // Weekday abbreviations
  const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const [animatedHeights, setAnimatedHeights] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Mock data for different months - heights represent relative call volumes with more dramatic variations
  const getCallDataForMonth = (month: string) => {
    const callData: Record<string, number[]> = {
      "Juni 2025": [85, 45, 120, 65, 95, 25, 35],
      "Mai 2025": [70, 30, 100, 40, 80, 15, 20],
      "April 2025": [90, 55, 110, 75, 60, 35, 45],
      "März 2025": [65, 40, 85, 50, 70, 20, 25],
      "Februar 2025": [75, 25, 95, 45, 85, 10, 30],
      "Januar 2025": [55, 35, 75, 40, 65, 15, 20],
      "Dezember 2024": [95, 60, 130, 80, 105, 40, 50],
      "November 2024": [80, 45, 115, 70, 90, 30, 40],
      "Oktober 2024": [70, 35, 105, 55, 75, 25, 35],
      "September 2024": [85, 50, 125, 65, 95, 35, 45],
      "August 2024": [60, 25, 90, 35, 70, 15, 25],
      "Juli 2024": [100, 65, 140, 85, 110, 45, 55]
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

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-medium">Anrufverlauf</h3>
      </div>

      <div className="flex items-end justify-between h-40 mb-4">
        {weekdays.map((day, index) => (
          <div key={day} className="flex flex-col items-center">
            <div 
              className="w-10 bg-gradient-to-t from-voico-yellow-600 to-voico-yellow-500 rounded-t-md transition-all duration-600 ease-out"
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
