
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
    <header className="header-glass py-4 px-6 flex items-center justify-between h-20 sticky top-0 z-20 border-b border-white/10">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="glass-button hover:bg-white/20 hover:scale-105 transition-all duration-300"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={20} className="text-foreground" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-foreground">{getPageTitle()}</h1>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative glass-button hover:bg-white/20 hover:scale-105 transition-all duration-300" 
          aria-label="Notifications"
        >
          <Bell size={20} className="text-foreground" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full glass-button hover:bg-white/20 hover:scale-105 transition-all duration-300 w-10 h-10" 
              aria-label="User menu"
            >
              <User size={20} className="text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="glass-card border-white/20 bg-black/40 backdrop-blur-xl min-w-48 p-2"
          >
            <DropdownMenuItem className="text-foreground hover:bg-white/10 rounded-md cursor-pointer transition-colors">
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-foreground hover:bg-white/10 rounded-md cursor-pointer transition-colors">
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-foreground hover:bg-white/10 rounded-md cursor-pointer transition-colors">
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive hover:bg-destructive/10 rounded-md cursor-pointer transition-colors">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
