import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";

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
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="products" element={<AdminProducts />} />
  <Route path="orders" element={<Orders />} />
  <Route path="users" element={<Users />} />
  <Route path="products/add" element={<AddProduct />} />
  <Route path="products/edit/:id" element={<EditProduct />} />
</Route>
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;

