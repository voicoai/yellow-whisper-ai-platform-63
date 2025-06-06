
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneOutgoing, Settings, Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

interface Agent {
  id: string;
  name: string;
  role: string;
  phoneNumber: string;
  callCount: number;
  avgDuration: string;
  costPerMinute: number;
  languages: string[];
  callType: "inbound" | "outbound";
}

export function AgentsList() {
  const { t } = useLanguage();
  
  // Sample data - in a real app this would come from an API
  const agents: Agent[] = [
    {
      id: "agent-1",
      name: "Customer Support",
      role: "General inquiries assistant",
      phoneNumber: "+1 (555) 123-4567",
      callCount: 87,
      avgDuration: "3m 22s",
      costPerMinute: 0.06,
      languages: ["English"],
      callType: "inbound"
    },
    {
      id: "agent-2",
      name: "Appointment Scheduler",
      role: "Calendar booking agent",
      phoneNumber: "+1 (555) 234-5678",
      callCount: 42,
      avgDuration: "2m 47s",
      costPerMinute: 0.05,
      languages: ["English", "German"],
      callType: "outbound"
    },
    {
      id: "agent-3",
      name: "Sales Assistant",
      role: "Product information and sales",
      phoneNumber: "+1 (555) 345-6789",
      callCount: 56,
      avgDuration: "4m 12s",
      costPerMinute: 0.06,
      languages: ["English"],
      callType: "inbound"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium text-gray-900">{t('aiAgentsOverview')}</CardTitle>
            <Button className="bg-[#FDDF5C] hover:bg-[#FDDF5C]/90 text-black font-medium shadow-sm" asChild>
              <Link to="/agents/new">
                <Plus className="mr-2 h-4 w-4" /> {t('createAgent')}
              </Link>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-gray-100">
                <TableHead className="font-medium text-gray-700 py-4">{t('agent')}</TableHead>
                <TableHead className="font-medium text-gray-700">{t('type')}</TableHead>
                <TableHead className="font-medium text-gray-700">{t('phoneNumber')}</TableHead>
                <TableHead className="font-medium text-gray-700">{t('performance')}</TableHead>
                <TableHead className="font-medium text-gray-700">{t('languages')}</TableHead>
                <TableHead className="text-right font-medium text-gray-700">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="py-4">
                    <div>
                      <div className="font-medium text-gray-900">{agent.name}</div>
                      <div className="text-sm text-gray-500 mt-0.5">{agent.role}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        agent.callType === "inbound"
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200"
                          : "bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
                      }
                    >
                      {agent.callType === "inbound" ? (
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {t('inbound')}
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <PhoneOutgoing className="h-3 w-3 mr-1" />
                          {t('outbound')}
                        </div>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-900 font-mono text-sm">{agent.phoneNumber}</span>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-900 font-medium">{agent.callCount} {t('calls')}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{agent.avgDuration} {t('avg')}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        ${agent.costPerMinute.toFixed(3)}/{t('min')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {agent.languages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-1 bg-[#FDDF5C]/20 text-gray-700 rounded text-xs font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Link to={`/agents/${agent.id}`}>{t('view')}</Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                          >
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
                          <DropdownMenuItem className="hover:bg-gray-50">{t('editAgent')}</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gray-50">{t('configure')}</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gray-50">{t('duplicate')}</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 hover:bg-red-50">{t('delete')}</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
