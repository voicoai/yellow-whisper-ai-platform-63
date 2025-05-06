
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Play, FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Call {
  id: string;
  agent: string;
  date: string;
  duration: string;
  cost: number;
  status: 'completed' | 'failed';
  hasRecording: boolean;
  hasTranscript: boolean;
}

export function CallHistory() {
  const isMobile = useIsMobile();
  
  // Sample data - in a real app this would come from an API
  const calls: Call[] = [
    {
      id: "call-001",
      agent: "Customer Support Agent",
      date: "2025-05-06 14:22",
      duration: "3m 12s",
      cost: 0.18,
      status: 'completed',
      hasRecording: true,
      hasTranscript: true
    },
    {
      id: "call-002",
      agent: "Booking Assistant",
      date: "2025-05-06 12:05",
      duration: "5m 47s",
      cost: 0.34,
      status: 'completed',
      hasRecording: true,
      hasTranscript: true
    },
    {
      id: "call-003",
      agent: "Order Status Agent",
      date: "2025-05-05 16:30",
      duration: "2m 03s",
      cost: 0.12,
      status: 'completed',
      hasRecording: true,
      hasTranscript: true
    },
    {
      id: "call-004",
      agent: "Technical Support",
      date: "2025-05-05 09:18",
      duration: "7m 22s",
      cost: 0.44,
      status: 'completed',
      hasRecording: true,
      hasTranscript: true
    },
    {
      id: "call-005",
      agent: "Appointment Scheduler",
      date: "2025-05-04 15:41",
      duration: "1m 55s",
      cost: 0.09,
      status: 'failed',
      hasRecording: false,
      hasTranscript: true
    },
  ];

  // For mobile, only show 3 calls
  const displayCalls = isMobile ? calls.slice(0, 3) : calls;

  return (
    <div className="rounded-md border bg-white overflow-hidden h-full">
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Recent Calls</h3>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead className={isMobile ? "hidden sm:table-cell" : ""}>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Cost</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayCalls.map((call) => (
              <TableRow key={call.id}>
                <TableCell className="font-medium">
                  <div className="truncate max-w-[120px] sm:max-w-none">{call.agent}</div>
                  {isMobile && <div className="text-xs text-gray-500">{call.date}</div>}
                </TableCell>
                <TableCell className="hidden sm:table-cell">{call.date}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span>{call.duration}</span>
                    {call.status === 'failed' && (
                      <span className="ml-2 bg-red-100 text-red-800 text-xs py-0.5 px-1 rounded">Failed</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">${call.cost.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    {call.hasRecording && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play size={16} />
                      </Button>
                    )}
                    {call.hasTranscript && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText size={16} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
