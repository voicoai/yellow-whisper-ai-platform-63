
import { Bell, Settings, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Header({ collapsed, setCollapsed }: HeaderProps) {
  const location = useLocation();

  // Define page titles based on routes
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path === "/agents") return "Agents";
    if (path.startsWith("/agents/")) return "Agent Details";
    if (path === "/telephony") return "Telephony";
    if (path === "/call-history") return "Call History";
    if (path === "/team") return "Team";
    return "VOICO";
  };

  return (
    <header className="bg-white border-b border-voico-gray-200 py-3 px-4 md:px-6 flex items-center justify-between h-16 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mr-3 p-2 rounded-md hover:bg-voico-gray-100 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={20} className="text-voico-gray-800" />
        </button>
        <h1 className="text-xl font-normal text-black">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
          <Bell size={20} className="text-voico-gray-700" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
              <User size={20} className="text-voico-gray-700" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border-voico-gray-200">
            <DropdownMenuItem className="text-voico-gray-800">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-voico-gray-800">Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-voico-gray-800">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
