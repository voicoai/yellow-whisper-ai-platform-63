
import { Clock, Phone, Users, Check, PhoneOutgoing, PhoneCall, PhoneForwarded } from "lucide-react";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="voico-stats-card">
        <div className="flex items-center justify-between">
          <span className="voico-stats-label">Total Calls</span>
          <div className="bg-voico-yellow-100 p-2 rounded-full">
            <Phone size={18} className="text-voico-blue-800" />
          </div>
        </div>
        <span className="voico-stats-value">124</span>
        <span className="text-xs text-green-500 mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
          12% from last month
        </span>
      </div>
      
      <div className="voico-stats-card">
        <div className="flex items-center justify-between">
          <span className="voico-stats-label">Avg. Duration</span>
          <div className="bg-voico-yellow-100 p-2 rounded-full">
            <Clock size={18} className="text-voico-blue-800" />
          </div>
        </div>
        <span className="voico-stats-value">3m 24s</span>
        <span className="text-xs text-gray-400 mt-1">+14s from last week</span>
      </div>
      
      <div className="voico-stats-card">
        <div className="flex items-center justify-between">
          <span className="voico-stats-label">Success Rate</span>
          <div className="bg-voico-yellow-100 p-2 rounded-full">
            <Check size={18} className="text-voico-blue-800" />
          </div>
        </div>
        <span className="voico-stats-value">92.4%</span>
        <span className="text-xs text-green-500 mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6"/>
          </svg>
          3.2% from last month
        </span>
      </div>
      
      <div className="voico-stats-card">
        <div className="flex items-center justify-between">
          <span className="voico-stats-label">Active Agents</span>
          <div className="bg-voico-yellow-100 p-2 rounded-full">
            <Users size={18} className="text-voico-blue-800" />
          </div>
        </div>
        <span className="voico-stats-value">5</span>
        <span className="text-xs text-blue-500 mt-1">+2 new this week</span>
      </div>
    </div>
  );
}
