
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Share, User, Phone, Calendar, Clock, FileText } from "lucide-react";

interface CallDetailsProps {
  callId?: string;
}

export function CallDetails({ callId = "call-001" }: CallDetailsProps) {
  // Mock data for a call - in a real app, this would be fetched from an API based on callId
  const call = {
    id: callId,
    agent: "Customer Support Agent",
    phoneNumber: "+1 (555) 123-4567",
    callerNumber: "+1 (555) 987-6543",
    date: "May 6, 2025",
    time: "14:22",
    duration: "3m 12s",
    cost: 0.18,
    status: 'completed',
    transcript: [
      { speaker: "agent", text: "Hello, this is Customer Support AI Assistant. How can I help you today?", time: "00:00" },
      { speaker: "caller", text: "Hi, I'm calling about my recent order #45678. I haven't received a shipping confirmation yet.", time: "00:04" },
      { speaker: "agent", text: "I'd be happy to help you with that. Let me check the status of your order #45678.", time: "00:10" },
      { speaker: "agent", text: "I can see that your order has been processed and is scheduled for shipping tomorrow. You should receive an email confirmation by the end of today.", time: "00:18" },
      { speaker: "caller", text: "That's great news! I was worried because I ordered it last week.", time: "00:28" },
      { speaker: "agent", text: "I understand your concern. There was a slight delay in our warehouse due to high volume, but your order is prioritized now. Would you like me to send you the tracking details as soon as they're available?", time: "00:32" },
      { speaker: "caller", text: "Yes, that would be great. Could you send it via text message?", time: "00:45" },
      { speaker: "agent", text: "Absolutely. I'll arrange for the tracking information to be sent to this phone number via SMS as soon as it's available. Is there anything else I can assist you with today?", time: "00:49" },
      { speaker: "caller", text: "No, that's all. Thank you for your help!", time: "01:03" },
      { speaker: "agent", text: "You're welcome! Thank you for calling Customer Support. Have a wonderful day!", time: "01:06" }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Call Details</h2>
          <p className="text-gray-600">Call #{call.id} with {call.agent}</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Call Recording</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-md p-4 flex flex-col items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-800">Call {call.id}</span>
                    <span className="text-sm text-gray-500">{call.duration}</span>
                  </div>
                  
                  <div className="relative w-full h-12 bg-gray-100 rounded">
                    <div className="absolute top-0 left-0 h-full w-3/4 bg-voico-blue-200 rounded"></div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <div className="flex space-x-4">
                        <button className="bg-voico-blue-800 text-white w-8 h-8 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </button>
                        <div className="flex items-center text-sm text-gray-700">02:24 / 03:12</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-3">
                    <button className="text-gray-600 hover:text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="19 20 9 12 19 4 19 20"></polygon>
                        <line x1="5" y1="19" x2="5" y2="5"></line>
                      </svg>
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 4 15 12 5 20 5 4"></polygon>
                        <line x1="19" y1="5" x2="19" y2="19"></line>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button className="bg-voico-blue-800 hover:bg-voico-blue-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download Recording
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Transcript</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {call.transcript.map((entry, index) => (
                  <div key={index} className={`flex ${entry.speaker === 'agent' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      entry.speaker === 'agent' 
                        ? 'bg-voico-yellow-100 text-gray-800' 
                        : 'bg-voico-blue-100 text-gray-800'
                    }`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium">
                          {entry.speaker === 'agent' ? 'AI Agent' : 'Caller'}
                        </span>
                        <span className="text-xs text-gray-500">{entry.time}</span>
                      </div>
                      <p className="text-sm">{entry.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Transcript
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Call Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium">Agent</span>
                </div>
                <p className="text-sm ml-6 mt-1">{call.agent}</p>
              </div>
              
              <div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium">Phone Numbers</span>
                </div>
                <div className="ml-6 mt-1">
                  <p className="text-sm">From: {call.callerNumber}</p>
                  <p className="text-sm">To: {call.phoneNumber}</p>
                </div>
              </div>
              
              <div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium">Date & Time</span>
                </div>
                <p className="text-sm ml-6 mt-1">{call.date} at {call.time}</p>
              </div>
              
              <div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <p className="text-sm ml-6 mt-1">{call.duration}</p>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <p className="text-sm font-medium">Call Status</p>
                <div className="flex items-center mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm capitalize">{call.status}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium">Cost</p>
                <p className="text-xl font-bold text-voico-blue-800 mt-1">${call.cost.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Sentiment Analysis</p>
                <div className="h-2 bg-gray-200 rounded-full mt-2">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Negative</span>
                  <span>Neutral</span>
                  <span>Positive</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium">Speaking Time</p>
                <div className="bg-gray-100 rounded-md p-3 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">AI Agent</span>
                    <span className="text-xs font-medium">68%</span>
                  </div>
                  <div className="h-2 bg-voico-yellow-200 rounded-full mt-1">
                    <div className="h-2 bg-voico-yellow-500 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs">Caller</span>
                    <span className="text-xs font-medium">32%</span>
                  </div>
                  <div className="h-2 bg-voico-blue-200 rounded-full mt-1">
                    <div className="h-2 bg-voico-blue-500 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium">Key Topics</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-1 bg-voico-yellow-100 text-voico-blue-800 rounded text-xs">Order Status</span>
                  <span className="px-2 py-1 bg-voico-yellow-100 text-voico-blue-800 rounded text-xs">Shipping</span>
                  <span className="px-2 py-1 bg-voico-yellow-100 text-voico-blue-800 rounded text-xs">Tracking</span>
                  <span className="px-2 py-1 bg-voico-yellow-100 text-voico-blue-800 rounded text-xs">SMS</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
