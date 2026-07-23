import { Bell, Search, UserCircle } from "lucide-react";

const Topbar = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent outline-none text-sm"
          />
        </div>

        {/* Notification */}
        <button className="relative">
          <Bell size={22} className="text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
            3
          </span>
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-2">
          <UserCircle size={34} className="text-blue-600" />
          <div className="hidden md:block">
            <h3 className="font-semibold text-gray-800">
              Admin
            </h3>
            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;