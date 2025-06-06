
import React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Fixed position for the sidebar so it stays visible when scrolling */}
      <div className="fixed top-0 left-0 h-full z-10">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      
      {/* Add padding to the main content area to prevent sidebar overlap */}
      <div className={`flex-1 flex flex-col w-full ${collapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="p-4 md:p-6 lg:p-8 max-w-screen-2xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
