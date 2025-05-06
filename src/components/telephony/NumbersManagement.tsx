
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  const phoneNumbers: PhoneNumber[] = [
    {
      id: "pn-1",
      number: "+1 (555) 123-4567",
      country: "United States",
      monthlyPrice: 1.00,
      provider: "twilio",
      assignedAgent: "Customer Support",
      status: "active"
    },
    {
      id: "pn-2",
      number: "+1 (555) 234-5678",
      country: "United States",
      monthlyPrice: 1.00,
      provider: "twilio",
      assignedAgent: "Appointment Scheduler",
      status: "active"
    },
    {
      id: "pn-3",
      number: "+1 (555) 345-6789",
      country: "United States",
      monthlyPrice: 1.00,
      provider: "vonage",
      assignedAgent: "Sales Assistant",
      status: "active"
    },
    {
      id: "pn-4",
      number: "+49 (555) 456-7890",
      country: "Germany",
      monthlyPrice: 1.50,
      provider: "vonage",
      assignedAgent: null,
      status: "inactive"
    },
  ];

  return (
    <Tabs defaultValue="manage" className="w-full">
      <TabsList className="grid grid-cols-3 max-w-md mb-6">
        <TabsTrigger value="manage">Manage Numbers</TabsTrigger>
        <TabsTrigger value="purchase">Buy Numbers</TabsTrigger>
        <TabsTrigger value="connect">Connect SIP</TabsTrigger>
      </TabsList>
      
      <TabsContent value="manage">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium">Your Phone Numbers</h3>
              <p className="text-sm text-gray-600">Manage and assign your provisioned numbers</p>
            </div>
            <div className="flex space-x-2">
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
          
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Monthly</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {phoneNumbers.map((number) => (
                  <TableRow key={number.id}>
                    <TableCell className="font-medium">{number.number}</TableCell>
                    <TableCell>{number.country}</TableCell>
                    <TableCell className="capitalize">{number.provider}</TableCell>
                    <TableCell>
                      {number.assignedAgent || <span className="text-gray-400">Unassigned</span>}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={number.status === "active" ? "default" : "outline"}
                        className={number.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {number.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${number.monthlyPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          
          <div className="p-4 bg-voico-yellow-50 border border-voico-yellow-200 rounded-md flex justify-between items-center">
            <div>
              <h4 className="font-medium">Monthly Telephony Cost</h4>
              <p className="text-sm text-gray-600">Total for all active numbers</p>
            </div>
            <div className="text-xl font-bold text-voico-blue-800">$4.50</div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="purchase">
        <Card>
          <CardHeader>
            <CardTitle>Purchase New Numbers</CardTitle>
            <CardDescription>Add new phone numbers to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Provider</label>
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
                <label className="text-sm font-medium">Country</label>
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
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Number Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4 cursor-pointer hover:border-voico-blue-800 hover:bg-voico-yellow-50">
                  <div className="font-medium">Local</div>
                  <div className="text-sm text-gray-500">Standard local number</div>
                  <div className="mt-2 text-sm font-medium">$1.00/month</div>
                </div>
                <div className="border rounded-md p-4 cursor-pointer hover:border-voico-blue-800 hover:bg-voico-yellow-50">
                  <div className="font-medium">Toll-Free</div>
                  <div className="text-sm text-gray-500">800, 888, 877, etc.</div>
                  <div className="mt-2 text-sm font-medium">$2.00/month</div>
                </div>
                <div className="border rounded-md p-4 cursor-pointer hover:border-voico-blue-800 hover:bg-voico-yellow-50">
                  <div className="font-medium">Mobile</div>
                  <div className="text-sm text-gray-500">Mobile number</div>
                  <div className="mt-2 text-sm font-medium">$3.00/month</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Area Code (Optional)</label>
              <Input placeholder="e.g. 415" />
            </div>
            
            <Button className="w-full bg-voico-blue-800 hover:bg-voico-blue-700">Search for Available Numbers</Button>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-center text-gray-500">No numbers searched yet</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="connect">
        <Card>
          <CardHeader>
            <CardTitle>Connect SIP Trunk</CardTitle>
            <CardDescription>Use your existing SIP provider with VOICO</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">SIP Provider</label>
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
                <label className="text-sm font-medium">SIP URI</label>
                <Input placeholder="sip:example.sip.twilio.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Authentication Type</label>
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
                <label className="text-sm font-medium">Username</label>
                <Input />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" />
              </div>
            </div>
            
            <div className="p-4 bg-voico-blue-50 border border-voico-blue-200 rounded-md">
              <h4 className="font-medium">VOICO SIP Configuration</h4>
              <p className="text-sm text-gray-600 mt-1">Use these settings in your SIP provider configuration:</p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">SIP URI:</p>
                  <p className="font-mono bg-white p-1 rounded border mt-1">sip.voico.ai</p>
                </div>
                <div>
                  <p className="font-medium">Port:</p>
                  <p className="font-mono bg-white p-1 rounded border mt-1">5060</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-voico-blue-800 hover:bg-voico-blue-700">Save Configuration</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
