import { AppLayout } from "@/components/layout/AppLayout";
import { CallDetails } from "@/components/calls/CallDetails";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Play, FileText, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const CallHistory = () => {
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  
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
    {
      id: "call-006",
      agent: "Sales Assistant",
      date: "2025-05-04 10:12",
      duration: "4m 18s",
      cost: 0.26,
      status: 'completed',
      hasRecording: true,
      hasTranscript: true
    },
    {
      id: "call-007",
      agent: "Customer Support Agent",
      date: "2025-05-03 17:55",
      duration: "2m 42s",
      cost: 0.16,
      status: 'completed',
      hasRecording: true,
      hasTranscript: true
    },
    {
      id: "call-008",
      agent: "Technical Support",
      date: "2025-05-03 11:30",
      duration: "8m 05s",
      cost: 0.48,
      status: 'completed',
      hasRecording: true,
      hasTranscript: true
    },
  ];

  return (
    <AppLayout>
      {selectedCall ? (
        <div>
          <div className="mb-6">
            <Button variant="outline" onClick={() => setSelectedCall(null)}>
              ← Back to Call History
            </Button>
          </div>
          <CallDetails callId={selectedCall} />
        </div>
      ) : (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Call History</h1>
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="relative">
              <Input className="pl-10 w-full md:w-80" placeholder="Search calls..." />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">Export</Button>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-white border border-gray-200 p-1 text-gray-600 shadow-sm w-auto">
              <TabsTrigger 
                value="all"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FDDF5C] data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:bg-gray-50"
              >
                All Calls
              </TabsTrigger>
              <TabsTrigger 
                value="completed"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FDDF5C] data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:bg-gray-50"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger 
                value="failed"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FDDF5C] data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:bg-gray-50"
              >
                Failed
              </TabsTrigger>
            </TabsList>
          
            <TabsContent value="all">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calls.map((call) => (
                      <TableRow key={call.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedCall(call.id)}>
                        <TableCell>{call.date}</TableCell>
                        <TableCell>{call.agent}</TableCell>
                        <TableCell>{call.duration}</TableCell>
                        <TableCell className="text-right">${call.cost.toFixed(2)}</TableCell>
                        <TableCell>
                          {call.status === 'completed' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Failed
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {call.hasRecording && (
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                                <Play size={16} />
                              </Button>
                            )}
                            {call.hasTranscript && (
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                                <FileText size={16} />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
            
            <TabsContent value="completed">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calls.filter(call => call.status === 'completed').map((call) => (
                      <TableRow key={call.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedCall(call.id)}>
                        <TableCell>{call.date}</TableCell>
                        <TableCell>{call.agent}</TableCell>
                        <TableCell>{call.duration}</TableCell>
                        <TableCell className="text-right">${call.cost.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {call.hasRecording && (
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                                <Play size={16} />
                              </Button>
                            )}
                            {call.hasTranscript && (
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                                <FileText size={16} />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
            
            <TabsContent value="failed">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {calls.filter(call => call.status === 'failed').map((call) => (
                      <TableRow key={call.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedCall(call.id)}>
                        <TableCell>{call.date}</TableCell>
                        <TableCell>{call.agent}</TableCell>
                        <TableCell>{call.duration}</TableCell>
                        <TableCell className="text-right">${call.cost.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Failed
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {call.hasRecording && (
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                                <Play size={16} />
                              </Button>
                            )}
                            {call.hasTranscript && (
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                                <FileText size={16} />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing 8 calls
            </p>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-voico-blue-50">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

const SearchIcon = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default CallHistory;
