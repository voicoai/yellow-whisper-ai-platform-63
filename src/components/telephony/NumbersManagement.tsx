import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
interface PhoneNumber {
  id: string;
  number: string;
  country: string;
  monthlyPrice: number;
  provider: "twilio" | "vonage";
  assignedAgent: string | null;
  status: "active" | "inactive";
}
export function NumbersManagement() {
  // Sample data
  const phoneNumbers: PhoneNumber[] = [{
    id: "pn-1",
    number: "+1 (555) 123-4567",
    country: "United States",
    monthlyPrice: 1.00,
    provider: "twilio",
    assignedAgent: "Customer Support",
    status: "active"
  }, {
    id: "pn-2",
    number: "+1 (555) 234-5678",
    country: "United States",
    monthlyPrice: 1.00,
    provider: "twilio",
    assignedAgent: "Appointment Scheduler",
    status: "active"
  }, {
    id: "pn-3",
    number: "+1 (555) 345-6789",
    country: "United States",
    monthlyPrice: 1.00,
    provider: "vonage",
    assignedAgent: "Sales Assistant",
    status: "active"
  }, {
    id: "pn-4",
    number: "+49 (555) 456-7890",
    country: "Germany",
    monthlyPrice: 1.50,
    provider: "vonage",
    assignedAgent: null,
    status: "inactive"
  }];
  const handleDeleteNumber = (numberId: string) => {
    console.log(`Deleting number with ID: ${numberId}`);
    // Delete functionality would be implemented here
  };
  return <div className="space-y-8">
      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-white border border-gray-200 p-1 text-gray-600 shadow-sm w-auto">
          <TabsTrigger value="manage" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FDDF5C] data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:bg-gray-50">
            Manage Numbers
          </TabsTrigger>
          <TabsTrigger value="purchase" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FDDF5C] data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:bg-gray-50">
            Buy Numbers
          </TabsTrigger>
          <TabsTrigger value="connect" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FDDF5C] data-[state=active]:text-black data-[state=active]:shadow-sm data-[state=active]:font-semibold hover:bg-gray-50">
            Connect SIP
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="manage" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-black">Your Phone Numbers</h3>
              <p className="text-sm text-gray-600">Manage and assign your provisioned numbers</p>
            </div>
            <div className="flex space-x-3">
              <Input placeholder="Search numbers..." className="w-64" />
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="vonage">Vonage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Card className="border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-gray-700 font-medium">Phone Number</TableHead>
                  <TableHead className="text-gray-700 font-medium">Country</TableHead>
                  <TableHead className="text-gray-700 font-medium">Provider</TableHead>
                  <TableHead className="text-gray-700 font-medium">Assigned To</TableHead>
                  <TableHead className="text-gray-700 font-medium">Status</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium">Monthly</TableHead>
                  <TableHead className="text-right text-gray-700 font-medium">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {phoneNumbers.map(number => <TableRow key={number.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="font-medium text-black">{number.number}</TableCell>
                    <TableCell className="text-gray-700">{number.country}</TableCell>
                    <TableCell className="capitalize text-gray-700">{number.provider}</TableCell>
                    <TableCell className="text-gray-700">
                      {number.assignedAgent || <span className="text-gray-400">Unassigned</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={number.status === "active" ? "default" : "outline"} className={number.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" : "border-gray-300 text-gray-600"}>
                        {number.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-gray-700">${number.monthlyPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600 hover:bg-red-50" onClick={() => handleDeleteNumber(number.id)}>
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </Card>
          
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="font-medium text-black">Monthly Telephony Cost</h4>
              <p className="text-sm text-gray-600">Total for all active numbers</p>
            </div>
            <div className="text-xl font-bold text-black">$4.50</div>
          </div>
        </TabsContent>
        
        <TabsContent value="purchase" className="space-y-6">
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-medium text-black">Purchase New Numbers</CardTitle>
              <CardDescription className="text-gray-600">Add new phone numbers to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Provider</label>
                  <Select defaultValue="twilio">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="vonage">Vonage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Country</label>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Number Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-black hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-black">Local</div>
                    <div className="text-sm text-gray-500">Standard local number</div>
                    <div className="mt-2 text-sm font-medium text-black">$1.00/month</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-black hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-black">Toll-Free</div>
                    <div className="text-sm text-gray-500">800, 888, 877, etc.</div>
                    <div className="mt-2 text-sm font-medium text-black">$2.00/month</div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-black hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-black">Mobile</div>
                    <div className="text-sm text-gray-500">Mobile number</div>
                    <div className="mt-2 text-sm font-medium text-black">$3.00/month</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Area Code (Optional)</label>
                <Input placeholder="e.g. 415" />
              </div>
              
              <Button className="w-full bg-black text-white hover:bg-gray-800">Search for Available Numbers</Button>
              
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-center text-gray-500">No numbers searched yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="connect" className="space-y-6">
          <Card className="border border-gray-200">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-medium text-black">Connect SIP Trunk</CardTitle>
              <CardDescription className="text-gray-600">Use your existing SIP provider with VOICO</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">SIP Provider</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">Twilio Elastic SIP</SelectItem>
                    <SelectItem value="vonage">Vonage SIP</SelectItem>
                    <SelectItem value="asterisk">Asterisk</SelectItem>
                    <SelectItem value="freepbx">FreePBX</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">SIP URI</label>
                  <Input placeholder="sip:example.sip.twilio.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Authentication Type</label>
                  <Select defaultValue="ip">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ip">IP Authentication</SelectItem>
                      <SelectItem value="credential">Credential Authentication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Input type="password" />
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-black">VOICO SIP Configuration</h4>
                <p className="text-sm text-gray-600 mt-1">Use these settings in your SIP provider configuration:</p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">SIP URI:</p>
                    <p className="font-mono bg-white p-2 rounded border border-gray-200 mt-1 text-black">sip.voico.ai</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Port:</p>
                    <p className="font-mono bg-white p-2 rounded border border-gray-200 mt-1 text-black">5060</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-black text-white hover:bg-gray-800">Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
}