
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
    <header className="header-glass py-3 px-4 md:px-6 flex items-center justify-between h-16 sticky top-0 z-10">
      <div className="flex items-center">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mr-3 p-2 rounded-md glass-button transition-all duration-300"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={20} className="text-foreground" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative glass-button" aria-label="Notifications">
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full glass-button" aria-label="User menu">
              <User size={20} className="text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-card border-white/10">
            <DropdownMenuItem className="text-foreground hover:bg-white/10">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-foreground hover:bg-white/10">Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-foreground hover:bg-white/10">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
