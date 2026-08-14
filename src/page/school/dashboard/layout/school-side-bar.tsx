import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  BarChart2,
  Building2,
  ChevronRight,
  CreditCard,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Shield,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react";


export interface NavChild {
  name: string;
  path: string;
  disabled?: boolean;
}

export interface NavItem {
  name: string;
  icons: React.ReactNode;
  path?: string;
  children?: NavChild[];
  disabled?: boolean;
}

const approval = true; // ← flip to true when approved

const OVERVIEW: NavItem[] = [
  { name: "Dashboard",  icons: <LayoutDashboard size={15} />, path: "/dashboard",         disabled: !approval },
  { name: "Analytics",  icons: <TrendingUp size={15} />,       path: "/analytics", disabled: false      },
  // { name: "Status",     icons: <ShieldCheck size={15} />,       path: "/approval",  disabled: false     },
];

const SCHOOLS: NavItem[] = [
  { name: "All Schools",      icons: <Building2 size={15} />,  path: "/schools",        disabled: !approval },
  { name: "Register School",  icons: <PlusCircle size={15} />, path: "/register-school", disabled: !approval },
  { name: "Approvals",   icons: <Users size={15} />,      path: "/school-approval",  disabled: !approval },
];

const BILLING: NavItem[] = [
  { name: "Subscriptions", icons: <CreditCard size={15} />, path: "/subscriptions",  disabled: false },
  { name: "Revenue",       icons: <BarChart2 size={15} />,  path: "/revenue",        disabled: false },
  { name: "Invoices",      icons: <FileText size={15} />,   path: "/invoices",       disabled: false },
];

const PLATFORM: NavItem[] = [
  { name: "Compliance",      icons: <Shield size={15} />,   path: "/compliance",      disabled: false },
  { name: "Settings",        icons: <Settings size={15} />, path: "/settings",        disabled: false },
  { name: "Support Tickets", icons: <Ticket size={15} />,   path: "/support-tickets", disabled: false },
];  

const SECTIONS: { heading: string; items: NavItem[] }[] = [
  { heading: "OVERVIEW", items: OVERVIEW },
  { heading: "SCHOOLS", items: SCHOOLS },
  { heading: "BILLING", items: BILLING },
  { heading: "PLATFORM", items: PLATFORM },
];

function closeSidebar() {
  const sidebar = document.getElementById("panel-sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  if (!sidebar || !overlay) return;
  sidebar.classList.add("max-lg:-translate-x-full");
  overlay.classList.add("hidden");
}

export function SchoolSidebar() {
  const location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40 lg:hidden hidden"
        id="sidebar-overlay"
        onClick={closeSidebar}
      />

      <aside className="w-56 flex-shrink-0 bg-[#292382] flex flex-col h-screen overflow-y-auto overflow-x-hidden
        max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:z-50 max-lg:transition-transform max-lg:duration-300 max-lg:-translate-x-full
        lg:sticky lg:top-0
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-white/5
        [&::-webkit-scrollbar-thumb]:bg-white/20
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb:hover]:bg-white/40 font-space-grotesk"
        id="panel-sidebar"
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b border-white/5 font-space-grotesk">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFFFFF29] flex items-center justify-center text-white font-bold text-sm leading-[21px] font-space-grotesk">
              BH
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight font-space-grotesk">Bluetthub</p>
              <p className="text-white/40 text-[10px] font-space-grotesk">Admin Console</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-5 font-space-grotesk">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <p className="text-white/30 font-space-grotesk text-[9px] font-bold tracking-widest uppercase px-2 mb-1.5">
                {section.heading}
              </p>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const isDisabled = item.disabled;

                  if (isDisabled) {
                    return (
                      <div
                        key={item.name}
                        aria-disabled="true"
                        title="Coming soon"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg w-full cursor-not-allowed opacity-40 select-none"
                      >
                        <span className="text-white/40">{item.icons}</span>
                        <span className="flex-1 text-xs font-medium text-white/50">{item.name}</span>
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path!}
                      end={item.path === "//dashboard"}
                      onClick={() => closeSidebar()}
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-2.5 px-3 py-2 rounded-lg w-full transition-colors group",
                          isActive
                            ? "bg-[#FFFFFF29] text-white"
                            : "text-white/50 hover:bg-white/5 hover:text-white",
                        ].join(" ")
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className={isActive ? "text-white" : "text-white/40 group-hover:text-white/70"}>
                            {item.icons}
                          </span>
                          <span className="flex-1 text-xs font-medium">{item.name}</span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-white/5 font-space-grotesk">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              SO
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">Super Admin</p>
              <p className="text-white/30 text-[10px] truncate">Bluehub HQ · Lagos</p>
            </div>
            <ChevronRight size={13} className="text-white/20 group-hover:text-white/50 transition-colors" />
          </div>
        </div>
      </aside>
    </>
  );
}
