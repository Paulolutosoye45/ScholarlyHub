import { Search, Bell, Menu } from 'lucide-react';
import { useState } from 'react';

export function TopBar() {

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
    <header className="h-14 bg-white border-b border-gray-100 flex items-center gap-4 px-4 sm:px-6 shrink-0">

      <button onClick={toggleSidebar} className="lg:hidden w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
        <Menu size={16} className='text-black' />
      </button>
      <h1 className="font-bold text-[16px] text-gray-900 shrink-0">Approvals</h1>

      {/* Search */}
      <div className="relative flex-1 max-w-sm hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          placeholder="Search schools, users..."
          className="w-full pl-8 pr-3 py-2 text-[12.5px] bg-gray-50 border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notification bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="w-4.5 h-4.5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
        </button>

        {/* Super Admin avatar */}
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-[13px] font-bold shrink-0">
          SA
        </div>
      </div>
    </header>
  );
}
