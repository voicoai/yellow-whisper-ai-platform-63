
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
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

const Index = () => {
  // Generate last 12 months with June 2025 as the most recent
  const generateLast12Months = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
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
  const [selectedMonth, setSelectedMonth] = useState(months[0]); // June 2025

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-black">Dashboard</h1>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">{selectedMonth}</span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-white border border-gray-100 shadow-md rounded-lg">
                {months.map((month) => (
                  <DropdownMenuItem 
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
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
