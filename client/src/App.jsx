import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

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
// import PaymentFailed from "./pages/PaymentFailed";
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

      <Routes>

        {/* User Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />

        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />



        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
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

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;