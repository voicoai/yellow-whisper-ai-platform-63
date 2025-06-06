
import { Link, useLocation } from "react-router-dom";
import { Phone, Users, List, BarChart3, PhoneCall, Settings, CreditCard, Webhook, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  }, {
    name: "Account Settings",
    path: "/account-settings",
    icon: CreditCard
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
                <span className="text-black font-bold text-xl">VOICO</span>
              </div>
            )}
            {collapsed && (
              <div className="bg-black text-white w-8 h-8 rounded-sm flex items-center justify-center font-bold">
                V
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
      </aside>
    </>
  );
}
