import { Bell, Menu, Search, } from "lucide-react";
import { useState } from "react";

export function SchoolTopBar({ title = "Dashboard" }: { title?: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("panel-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (!sidebar || !overlay) return;
    const open = !sidebarOpen;
    setSidebarOpen(open);
    sidebar.classList.toggle("max-lg:-translate-x-full", !open);
    overlay.classList.toggle("hidden", !open);
  };

  return (
    <header className="font-space-grotesk h-[62px] bg-[#F8F8FD] border-b border-[#29238229] flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="lg:hidden w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <Menu size={16} />
        </button>
        <h1 className="text-sm lg:text-base font-bold font-space-grotesk text-[#292382]">{title}</h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            placeholder="Search schools, users..."
            className="pl-9 pr-4 py-2 text-xs bg-[#F0EFF9] font-space-grotesk border border-gray-200 rounded-md w-[200px] lg:w-[438px] focus:outline-none focus:ring-2 focus:ring-[#4F61E8]/20 focus:border-[#4F61E8] transition placeholder:text-gray-300"
          />
        </div>

        {/* Bell */}
        <button className="relative w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <Bell size={15} className="text-gray-500" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-400 rounded-full border border-white font-space-grotesk"/>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 font-space-grotesk rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
          SO
        </div>
      </div>
    </header>
  );
}