
import { Button } from "@/components/ui/button";

export function CreditBalance() {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm h-full">
      <div className="mb-6">
        <h3 className="text-lg font-medium">Guthaben</h3>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-48 h-48">
          {/* Background gray circle */}
          <div className="absolute inset-0 rounded-full bg-gray-100"></div>
          
          {/* Yellow progress arc - would be dynamic in a real app */}
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#FFDD33" 
              strokeWidth="10"
              strokeDasharray="280"  
              strokeDashoffset="70"  
              strokeLinecap="round" 
            />
          </svg>
          
          {/* Content in the center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">2.322€</span>
            <span className="text-gray-400 text-sm">Verfügbar</span>
          </div>
        </div>
        
        <Button className="w-full mt-8 bg-yellow-400 hover:bg-yellow-500 font-medium text-base h-12">
          Guthaben kaufen
        </Button>
      </div>
    </div>
  );
}
