import { Link } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          ShopEase
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-blue-600 transition"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              className="hover:text-blue-600 transition"
            >
              Products
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="hover:text-blue-600 transition"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="hover:text-blue-600 transition"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Search */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none ml-2"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
              0
            </span>
          </Link>

          <Link to="/login">
            <User size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;