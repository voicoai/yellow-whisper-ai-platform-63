
import { Link, useLocation } from "react-router-dom";
import { Phone, Users, List, BarChart3, PhoneCall, Settings, CreditCard, Webhook } from "lucide-react";
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
          "bg-sidebar fixed md:relative z-20 h-screen border-r border-sidebar-border shadow-sm flex flex-col transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          isMobile && collapsed ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          <Link to="/" className="flex items-center space-x-2">
            {!collapsed && (
              <div className="flex items-center">
                <span className="text-voico-yellow-500 font-bold text-2xl">VOI</span>
                <span className="text-white font-bold text-2xl">CO</span>
              </div>
            )}
            {collapsed && (
              <div className="bg-voico-yellow-500 text-voico-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold">
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
                      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )} 
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  <item.icon 
                    className={cn(
                      "flex-shrink-0", 
                      isActive(item.path) 
                        ? "text-sidebar-primary" 
                        : "text-sidebar-foreground group-hover:text-sidebar-primary"
                    )} 
                    size={20} 
                  />
                  {!collapsed && <span className="ml-3 truncate">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          {!collapsed && (
            <div className="bg-sidebar-accent/30 rounded-md p-3 text-xs text-sidebar-foreground">
              <p className="font-medium">VOICO AI Assistant</p>
              <p className="opacity-70 mt-1">Free Trial · 12 days left</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
