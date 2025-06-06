
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { CallHistory } from "@/components/dashboard/CallHistory";
import { CreditBalance } from "@/components/dashboard/CreditBalance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  // Generate last 12 months with June 2025 as the most recent
  const generateLast12Months = () => {
    const months = [
      "Januar", "Februar", "März", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];
    
    const result = [];
    let currentMonth = 5; // June (0-indexed)
    let currentYear = 2025;
    
    for (let i = 0; i < 12; i++) {
      result.push(`${months[currentMonth]} ${currentYear}`);
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
    }
    
    return result;
  };

  const months = generateLast12Months();
  const [selectedMonth, setSelectedMonth] = useState(months[0]); // Juni 2025

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-black">Dashboard</h1>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1.5 cursor-pointer hover:bg-gray-200 transition-colors">
                  <span className="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium">{selectedMonth}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white">
                {months.map((month) => (
                  <DropdownMenuItem 
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className="cursor-pointer"
                  >
                    {month}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <DashboardStats selectedMonth={selectedMonth} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CallHistory selectedMonth={selectedMonth} />
          <CreditBalance />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
