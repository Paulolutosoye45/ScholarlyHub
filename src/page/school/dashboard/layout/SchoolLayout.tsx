import { SchoolSidebar } from "./school-side-bar";
import { Outlet } from "react-router-dom";

export function SchoolLayout() {
  return (
    <div className="flex h-screen bg-[#EEEDF9] font-Poppins">
      <SchoolSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex min-w-0 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}