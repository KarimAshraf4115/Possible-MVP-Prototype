import { NavLink } from "react-router-dom";
import {
  CalendarDays,
  ChevronsLeft,
  LayoutDashboard,
  LogOut,
  Plug,
  Settings,
  Stethoscope,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Schedule",
    path: "/schedule",
    icon: CalendarDays,
  },
  {
    name: "Connectors",
    path: "/connectors",
    icon: Plug,
  },
];

function Sidebar() {
  return (
    <aside className=" w-65 m-5 mb-2 rounded-4xl flex flex-col px-4 py-5 border-r border-black/5 bg-white/20 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center justify-between px-2 mb-8">
        <div className="flex items-center gap-3">
          <div className=" w-9 h-9 rounded-full bg-[#181818] text-[#f5c94f] flex items-center justify-center">
            <Stethoscope size={19} />
          </div>

          <span className="text-[18px] font-semibold">Protoype</span>
        </div>

        <button className=" w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white/50 rounded-full transition">
          <ChevronsLeft size={19} />
        </button>
      </div>

      {/* Main navigation */}
      <nav className="flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                ` w-full h-12 px-4 rounded-full flex items-center gap-4 text-sm transition-all
                ${
                  isActive
                    ? "bg-white/80 shadow-sm text-gray-900"
                    : "text-gray-800 hover:bg-white/50"
                }
              `
              }
            >
              <Icon size={20} strokeWidth={1.8} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="mt-auto flex flex-col gap-1.5">
        <button className=" w-full h-12 px-4 rounded-full flex items-center gap-4 text-sm text-gray-800 hover:bg-white/50 transition">
          <Settings size={20} strokeWidth={1.8} />
          <span>Settings</span>
        </button>

        <button className=" w-full h-12 px-4 rounded-full flex items-center gap-4 text-sm text-gray-800 hover:bg-white/50 transition">
          <LogOut size={20} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
