import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white text-center">
          Admin Panel
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          <Package size={20} />
          <span>Products</span>
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          <ShoppingCart size={20} />
          <span>Orders</span>
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <Users size={20} />
          <span>Users</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button onClick={logout} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
