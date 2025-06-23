import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Share, User, Phone, Calendar, Clock, FileText, Play, SkipBack, SkipForward } from "lucide-react";
interface CallDetailsProps {
  callId?: string;
}
export function CallDetails({
  callId = "call-001"
}: CallDetailsProps) {
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
    transcript: [{
      speaker: "agent",
      text: "Hello, this is Customer Support AI Assistant. How can I help you today?",
      time: "00:00"
    }, {
      speaker: "caller",
      text: "Hi, I'm calling about my recent order #45678. I haven't received a shipping confirmation yet.",
      time: "00:04"
    }, {
      speaker: "agent",
      text: "I'd be happy to help you with that. Let me check the status of your order #45678.",
      time: "00:10"
    }, {
      speaker: "agent",
      text: "I can see that your order has been processed and is scheduled for shipping tomorrow. You should receive an email confirmation by the end of today.",
      time: "00:18"
    }, {
      speaker: "caller",
      text: "That's great news! I was worried because I ordered it last week.",
      time: "00:28"
    }, {
      speaker: "agent",
      text: "I understand your concern. There was a slight delay in our warehouse due to high volume, but your order is prioritized now. Would you like me to send you the tracking details as soon as they're available?",
      time: "00:32"
    }, {
      speaker: "caller",
      text: "Yes, that would be great. Could you send it via text message?",
      time: "00:45"
    }, {
      speaker: "agent",
      text: "Absolutely. I'll arrange for the tracking information to be sent to this phone number via SMS as soon as it's available. Is there anything else I can assist you with today?",
      time: "00:49"
    }, {
      speaker: "caller",
      text: "No, that's all. Thank you for your help!",
      time: "01:03"
    }, {
      speaker: "agent",
      text: "You're welcome! Thank you for calling Customer Support. Have a wonderful day!",
      time: "01:06"
    }]
  };
  return <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-gray-900">Call Details</h2>
          <p className="text-gray-600 text-lg">Call #{call.id}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-700 capitalize">{call.status}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="h-10">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-3 space-y-8">
          {/* Call Recording Section */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Play className="h-5 w-5 text-blue-600" />
                Call Recording
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
                <div className="max-w-2xl mx-auto">
                  {/* Audio Player */}
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-semibold text-gray-700">Call #{call.id}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{call.duration}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative w-full h-2 bg-gray-200 rounded-full mb-4">
                      <div className="absolute top-0 left-0 h-full w-3/4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center justify-center gap-6 mb-4">
                      <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <SkipBack size={20} />
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105">
                        <Play size={20} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <SkipForward size={20} />
                      </button>
                    </div>
                    
                    <div className="text-center text-sm text-gray-600 font-medium">02:24 / 03:12</div>
                  </div>
                  
                  <div className="text-center">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg">
                      <Download className="mr-2 h-4 w-4" />
                      Download Recording
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Transcript Section */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Conversation Transcript
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {call.transcript.map((entry, index) => <div key={index} className={`flex ${entry.speaker === 'agent' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${entry.speaker === 'agent' ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200' : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-xs font-semibold uppercase tracking-wide ${entry.speaker === 'agent' ? 'text-yellow-800' : 'text-blue-800'}`}>
                          {entry.speaker === 'agent' ? 'AI Agent' : 'Caller'}
                        </span>
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{entry.time}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-800">{entry.text}</p>
                    </div>
                  </div>)}
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline" className="px-6 py-3">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Transcript
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          {/* Call Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="text-lg font-semibold text-gray-900">Call Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 block">Agent</span>
                    <p className="text-sm text-gray-900 mt-1">{call.agent}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Phone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 block">Phone Numbers</span>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm text-gray-900">From: {call.callerNumber}</p>
                      <p className="text-sm text-gray-900">To: {call.phoneNumber}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 block">Date & Time</span>
                    <p className="text-sm text-gray-900 mt-1">{call.date} at {call.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 block">Duration</span>
                    <p className="text-sm text-gray-900 mt-1">{call.duration}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Total Cost</p>
                <p className="text-3xl font-bold text-green-700">${call.cost.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Analytics */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="text-lg font-semibold text-gray-900">Call Analytics</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Sentiment Analysis</p>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="absolute h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 rounded-full" style={{
                  width: '75%'
                }}></div>
                </div>
                <div className="flex justify-between text-xs mt-2 text-gray-600">
                  <span>Negative</span>
                  <span>Neutral</span>
                  <span className="font-medium text-green-600">Positive</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Speaking Time Distribution</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700">AI Agent</span>
                      <span className="text-xs font-bold text-yellow-700">68%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" style={{
                      width: '68%'
                    }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700">Caller</span>
                      <span className="text-xs font-bold text-blue-700">32%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" style={{
                      width: '32%'
                    }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Key Topics</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium border border-yellow-200">Order Status</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium border border-blue-200">Shipping</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium border border-green-200">Tracking</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium border border-purple-200">SMS</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}