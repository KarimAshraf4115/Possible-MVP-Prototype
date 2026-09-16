import { Search, Bell, ChevronDown } from "lucide-react";

function Navbar() {
  return (
    <header className="h-22.5 px-7 flex items-center justify-between">
      {/* Search */}
      <div className=" w-102.5 h-12 px-4 rounded-full bg-white/70 flex items-center gap-3 border border-white/60">
        <Search size={21} strokeWidth={1.8} className="text-gray-700" />

        <input
          type="text"
          placeholder="Search"
          className=" flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400 "
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className=" relative w-12 h-12 rounded-full bg-white/70 border border-white/60 flex items-center justify-center hover:bg-white transition">
          <Bell size={20} strokeWidth={1.8} />

          <span className="absolute top-2.5 right-2.75 w-1.5 h-1.5 rounded-full bg-[#d59c2b]" />
        </button>

        {/* Doctor profile */}
        <button className=" h-14.5 min-w-61.25 px-2 rounded-full bg-white/70 border border-white/60 flex items-center gap-3">
          {/* Image */}
          <div className="w-11 h-11 rounded-full overflow-hidden">
            <img src="" alt="Person" className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex-1 text-left">
            <p className="text-[13px] font-semibold text-gray-900">Karim</p>

            <p className="text-[11px] text-gray-500 mt-0.5">Content Creator</p>
          </div>

          <ChevronDown size={18} className="mr-1" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
