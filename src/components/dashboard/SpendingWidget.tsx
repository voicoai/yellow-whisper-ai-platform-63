
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

export function SpendingWidget() {
  const isMobile = useIsMobile();
  const monthlyData = [
    { day: 1, amount: 1.2 },
    { day: 2, amount: 0.8 },
    { day: 3, amount: 1.5 },
    { day: 4, amount: 2.3 },
    { day: 5, amount: 1.9 },
    { day: 6, amount: 0.6 },
    { day: 7, amount: 0 },
    { day: 8, amount: 1.1 },
    { day: 9, amount: 2.2 },
    { day: 10, amount: 1.5 },
    { day: 11, amount: 1.3 },
    { day: 12, amount: 1.7 },
    { day: 13, amount: 2.1 },
    { day: 14, amount: 0.4 },
    { day: 15, amount: 0.9 },
    { day: 16, amount: 1.2 },
    { day: 17, amount: 1.8 },
    { day: 18, amount: 2.0 },
    { day: 19, amount: 2.3 },
    { day: 20, amount: 1.9 },
    { day: 21, amount: 1.4 },
    { day: 22, amount: 1.6 },
    { day: 23, amount: 1.7 },
    { day: 24, amount: 1.9 },
    { day: 25, amount: 2.2 },
    { day: 26, amount: 2.4 },
    { day: 27, amount: 1.8 },
    { day: 28, amount: 1.5 },
    { day: 29, amount: 1.3 },
    { day: 30, amount: 1.1 },
  ];

  // For mobile, show less data points
  const displayData = isMobile ? monthlyData.filter((_, i) => i % 2 === 0) : monthlyData;

  const maxAmount = Math.max(...monthlyData.map(d => d.amount));
  const totalSpending = monthlyData.reduce((sum, day) => sum + day.amount, 0).toFixed(2);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Monthly Spending</CardTitle>
            <CardDescription>Telephony costs breakdown</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-voico-blue-800">${totalSpending}</div>
            <div className="text-xs text-gray-500">This month</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-36 flex items-end space-x-1 mt-4">
          {displayData.map((day, i) => (
            <div 
              key={i}
              className="flex-1 group relative"
              style={{ height: `${(day.amount / maxAmount) * 100}%`, minHeight: '1px' }}
            >
              <div 
                className="w-full bg-voico-blue-800/70 hover:bg-voico-blue-800 transition-all rounded-t-sm"
                style={{ height: '100%' }}
              ></div>
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-voico-blue-900 text-white text-xs px-1.5 py-0.5 rounded whitespace-nowrap">
                Day {day.day}: ${day.amount}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>1</span>
          <span>15</span>
          <span>30</span>
        </div>
      </CardContent>
    </Card>
  );
}
