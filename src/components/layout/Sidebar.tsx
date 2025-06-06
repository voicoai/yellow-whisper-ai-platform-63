import { Link, useLocation } from "react-router-dom";
import { Phone, Users, List, BarChart3, PhoneCall, Settings, CreditCard, Webhook, BookOpen, ChevronUp, LogOut, User, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({
  collapsed,
  setCollapsed
}: SidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navigation = [{
    name: "Dashboard",
    path: "/",
    icon: BarChart3
  }, {
    name: "Agents",
    path: "/agents",
    icon: Users
  }, {
    name: "Knowledge Bases",
    path: "/knowledge-bases",
    icon: BookOpen
  }, {
    name: "Telephony",
    path: "/telephony",
    icon: Phone
  }, {
    name: "Call History",
    path: "/call-history",
    icon: PhoneCall
  }, {
    name: "Integrations",
    path: "/integrations",
    icon: Webhook
  }, {
    name: "Team",
    path: "/team",
    icon: Settings
  }];

  return (
    <>
      {/* Mobile overlay to close sidebar when tapped */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-10" 
          onClick={() => setCollapsed(true)} 
          aria-hidden="true" 
        />
      )}
      
      <aside 
        className={cn(
          "bg-white fixed md:relative z-20 h-screen border-r border-voico-gray-200 shadow-sm flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          isMobile && collapsed ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-voico-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            {!collapsed && (
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/afde2e56-ac79-4c30-af23-0817463f34e9.png" 
                  alt="VOICO Logo" 
                  className="h-8" 
                />
              </div>
            )}
            {collapsed && (
              <div className="flex items-center justify-center">
                <img 
                  src="/lovable-uploads/afde2e56-ac79-4c30-af23-0817463f34e9.png" 
                  alt="VOICO Logo" 
                  className="h-8 w-8 object-cover object-left" 
                />
              </div>
            )}
          </Link>
        </div>

        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map(item => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md group transition-colors",
                    isActive(item.path) 
                      ? "bg-voico-gray-100 text-black" 
                      : "text-voico-gray-700 hover:bg-voico-gray-50"
                  )} 
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  <item.icon 
                    className={cn(
                      "flex-shrink-0", 
                      isActive(item.path) 
                        ? "text-black" 
                        : "text-voico-gray-500 group-hover:text-black"
                    )} 
                    size={20} 
                  />
                  {!collapsed && <span className="ml-3 truncate">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Account Box */}
        <div className="p-2 border-t border-voico-gray-200">
          {collapsed ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full h-12 p-0 justify-center hover:bg-voico-gray-50">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-56 mb-2 bg-white border shadow-lg">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account-settings" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full h-12 px-3 justify-between hover:bg-voico-gray-50">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm font-medium text-black">John Doe</span>
                      <span className="text-xs text-voico-gray-500">john@example.com</span>
                    </div>
                  </div>
                  <ChevronUp className="h-4 w-4 text-voico-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56 mb-2 bg-white border shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/account-settings" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </aside>
    </>
  );
}
