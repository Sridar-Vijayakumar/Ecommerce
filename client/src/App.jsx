import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import Portal from "./pages/Portal";
import SellerLayout from "./layouts/SellerLayout";
import SellerDashboard from "./pages/seller/Dashboard";
import SellerProducts from "./pages/seller/Products";
import SellerProductForm from "./pages/seller/ProductForm";
import SellerOrders from "./pages/seller/Orders";
import NotFound from "./pages/NotFound";

// Admin Layout
import AdminLayout from "./layouts/AdminLayout";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-[calc(100vh-76px)]">
      <Routes>

        {/* User Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/profile" element={<RoleRoute roles={["user"]}><Profile /></RoleRoute>} />
        <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

        <Route path="/myorders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />
        <Route path="/payment-failed" element={<PaymentFailed />} />

        {/* <Route
          path="/payment-failed"
          element={<PaymentFailed />}
        /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<RoleRoute roles={["admin"]}><AdminLayout /></RoleRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route
            path="products/edit/:id"
            element={<EditProduct />}
          />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="/seller" element={<RoleRoute roles={["seller"]}><SellerLayout /></RoleRoute>}>
          <Route index element={<SellerDashboard />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="products/add" element={<SellerProductForm />} />
          <Route path="products/edit/:id" element={<SellerProductForm />} />
          <Route path="orders" element={<SellerOrders />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
