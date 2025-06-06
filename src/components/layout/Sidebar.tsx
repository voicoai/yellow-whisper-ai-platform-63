
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
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10" 
          onClick={() => setCollapsed(true)} 
          aria-hidden="true" 
        />
      )}
      
      <aside 
        className={cn(
          "bg-white/95 backdrop-blur-xl fixed md:relative z-20 h-screen border-r border-gray-200/60 shadow-xl flex flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          isMobile && collapsed ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-100/80">
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

        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map(item => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center py-3 px-4 rounded-xl group transition-all duration-200 relative overflow-hidden",
                    isActive(item.path) 
                      ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 shadow-sm" 
                      : "text-gray-600 hover:bg-gray-50/80 hover:text-gray-900 hover:shadow-sm"
                  )} 
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  {isActive(item.path) && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/60 rounded-r-full" />
                  )}
                  <item.icon 
                    className={cn(
                      "flex-shrink-0 transition-colors duration-200", 
                      isActive(item.path) 
                        ? "text-primary" 
                        : "text-gray-500 group-hover:text-gray-700"
                    )} 
                    size={20} 
                  />
                  {!collapsed && (
                    <span className="ml-4 truncate font-medium text-sm">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Account Box */}
        <div className="p-3 border-t border-gray-100/80 bg-gray-50/30">
          {collapsed ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full h-12 p-0 justify-center hover:bg-gray-100/60 rounded-xl transition-all duration-200">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-sm font-semibold text-primary">
                      JD
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-56 mb-2 bg-white/95 backdrop-blur-xl border border-gray-200/60 shadow-xl rounded-xl">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem asChild>
                  <Link to="/account-settings" className="flex items-center text-gray-700 hover:text-gray-900">
                    <User className="mr-2 h-4 w-4" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center text-gray-700 hover:text-gray-900">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full h-14 px-4 justify-between hover:bg-gray-100/60 rounded-xl transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-sm font-semibold text-primary">
                        JD
                      </span>
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm font-medium text-gray-900">John Doe</span>
                      <span className="text-xs text-gray-500">john@example.com</span>
                    </div>
                  </div>
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56 mb-2 bg-white/95 backdrop-blur-xl border border-gray-200/60 shadow-xl rounded-xl">
                <DropdownMenuItem asChild>
                  <Link to="/account-settings" className="flex items-center text-gray-700 hover:text-gray-900">
                    <User className="mr-2 h-4 w-4" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center text-gray-700 hover:text-gray-900">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50">
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
