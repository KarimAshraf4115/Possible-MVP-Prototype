import {
  BarChart3,
  CalendarDays,
  ChevronsLeft,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Schedule",
    icon: CalendarDays,
  },
  {
    name: "Statistics",
    icon: BarChart3,
  },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className=" w-65 relative left-5 top-2.5 bottom-2 rounded-4xl flex flex-col px-4 py-5 border-r border-black/5 bg-white/20 backdrop-blur-md">
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
          const active = activePage === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={` w-full h-12 px-4 rounded-full flex items-center gap-4 text-sm transition-all
                ${
                  active
                    ? "bg-white/80 shadow-sm text-gray-900"
                    : "text-gray-800 hover:bg-white/50"
                }
              `}
            >
              <Icon size={20} strokeWidth={1.8} />

              <span>{item.name}</span>
            </button>
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
