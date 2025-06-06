
import { ArrowUpRight } from "lucide-react";

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Anrufe</span>
            <span className="text-3xl font-semibold mt-2">392</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-50 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="bg-green-50 p-1 rounded-full">
              <ArrowUpRight size={14} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Beantwortete Anrufe</span>
            <span className="text-3xl font-semibold mt-2">320</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-50 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                <path d="M15 13.5A3.5 3.5 0 0 1 18.5 10"></path>
                <path d="M13.5 13.5A3.5 3.5 0 0 0 10 10"></path>
                <path d="M10.5 8.5A3.5 3.5 0 0 1 14 5"></path>
                <path d="M8.5 8.5A3.5 3.5 0 0 0 5 5"></path>
                <path d="M22 22H2a9.82 9.82 0 0 1 20 0Z"></path>
              </svg>
            </div>
            <div className="bg-green-50 p-1 rounded-full">
              <ArrowUpRight size={14} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Kosten</span>
            <span className="text-3xl font-semibold mt-2">374,40€</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-50 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                <circle cx="12" cy="12" r="8"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="bg-green-50 p-1 rounded-full">
              <ArrowUpRight size={14} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
