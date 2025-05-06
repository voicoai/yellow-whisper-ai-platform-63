
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Agents from "./pages/Agents";
import AgentDetail from "./pages/AgentDetail";
import Telephony from "./pages/Telephony";
import CallHistory from "./pages/CallHistory";
import Team from "./pages/Team";
import Integrations from "./pages/Integrations";
import AccountSettings from "./pages/AccountSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/:id" element={<AgentDetail />} />
          <Route path="/telephony" element={<Telephony />} />
          <Route path="/call-history" element={<CallHistory />} />
          <Route path="/team" element={<Team />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
