
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Sample data - in a real app this would come from an API
const callTypeData = [
  { name: 'Inbound', value: 85 },
  { name: 'Outbound', value: 39 },
];

const callOutcomeData = [
  { name: 'Successful', value: 92 },
  { name: 'Hang up', value: 18 },
  { name: 'Transferred to human', value: 14 },
];

const integrationTriggersData = [
  { name: 'Webhooks', triggers: 45 },
  { name: 'Make.com', triggers: 22 },
  { name: 'n8n', triggers: 18 },
  { name: 'Zapier', triggers: 12 },
  { name: 'Cal.com', triggers: 8 },
];

const outboundPickupData = [
  { name: 'Answered', value: 28 },
  { name: 'Voicemail', value: 7 },
  { name: 'No Answer', value: 4 },
];

const COLORS = {
  callType: ['#3b82f6', '#8b5cf6'],
  callOutcome: ['#10b981', '#ef4444', '#f59e0b'],
  outboundPickup: ['#10b981', '#f59e0b', '#ef4444']
};

export function CallAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Call Distribution</CardTitle>
          <CardDescription>Inbound vs. Outbound calls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                inbound: { color: "#3b82f6", label: "Inbound" },
                outbound: { color: "#8b5cf6", label: "Outbound" }
              }}
            >
              <PieChart>
                <Pie
                  data={callTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {callTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.callType[index % COLORS.callType.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#3b82f6] mr-2"></div>
              <span>Inbound ({callTypeData[0].value})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#8b5cf6] mr-2"></div>
              <span>Outbound ({callTypeData[1].value})</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Call Outcomes</CardTitle>
          <CardDescription>Success rates and transfer statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                successful: { color: "#10b981", label: "Successful" },
                hangup: { color: "#ef4444", label: "Hang up" },
                transferred: { color: "#f59e0b", label: "Transferred to human" }
              }}
            >
              <PieChart>
                <Pie
                  data={callOutcomeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {callOutcomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.callOutcome[index % COLORS.callOutcome.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
              <span>Successful ({callOutcomeData[0].value})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-2"></div>
              <span>Hang up ({callOutcomeData[1].value})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#f59e0b] mr-2"></div>
              <span>Transferred ({callOutcomeData[2].value})</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration Triggers</CardTitle>
          <CardDescription>Number of triggers per integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                triggers: { color: "#8b5cf6", label: "Triggers" }
              }}
            >
              <BarChart
                data={integrationTriggersData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="triggers" fill="#8b5cf6" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Outbound Call Results</CardTitle>
          <CardDescription>Pick-up rates for outbound calls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                answered: { color: "#10b981", label: "Answered" },
                voicemail: { color: "#f59e0b", label: "Voicemail" },
                noAnswer: { color: "#ef4444", label: "No Answer" }
              }}
            >
              <PieChart>
                <Pie
                  data={outboundPickupData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {outboundPickupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.outboundPickup[index % COLORS.outboundPickup.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
              <span>Answered ({outboundPickupData[0].value})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#f59e0b] mr-2"></div>
              <span>Voicemail ({outboundPickupData[1].value})</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-2"></div>
              <span>No Answer ({outboundPickupData[2].value})</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
