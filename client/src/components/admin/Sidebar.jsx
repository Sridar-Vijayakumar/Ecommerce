import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="flex flex-col p-4 gap-4">
        <Link
          to="/admin"
          className="hover:bg-gray-700 p-3 rounded"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="hover:bg-gray-700 p-3 rounded"
        >
          📦 Products
        </Link>

        <Link
          to="/admin/orders"
          className="hover:bg-gray-700 p-3 rounded"
        >
          📋 Orders
        </Link>

        <Link
          to="/admin/users"
          className="hover:bg-gray-700 p-3 rounded"
        >
          👤 Users
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;