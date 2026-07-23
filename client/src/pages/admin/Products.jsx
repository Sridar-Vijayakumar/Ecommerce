import { useState } from "react";
import { Link } from "react-router-dom";
import ProductTable from "../../components/admin/ProductTable";

const Products = () => {
  const [products] = useState([
    {
      _id: "1",
      name: "iPhone 16 Pro",
      price: 129999,
      category: "Mobiles",
      countInStock: 15,
    },
    {
      _id: "2",
      name: "MacBook Pro M4",
      price: 199999,
      category: "Laptops",
      countInStock: 8,
    },
    {
      _id: "3",
      name: "AirPods Pro",
      price: 24999,
      category: "Accessories",
      countInStock: 25,
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Delete Product:", id);

      // TODO:
      // DELETE /api/products/:id
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all products
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Product Table */}
      <ProductTable
        products={products}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Products;