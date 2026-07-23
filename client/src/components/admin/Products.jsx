import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import Loader from "../../components/Loader";
import ProductTable from "../../components/admin/ProductTable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/products");

      // Handles both paginated and normal responses
      setProducts(data.products || data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);

      alert("Product deleted successfully");

      fetchProducts();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <h2 className="text-center text-red-600 mt-10">
        {error}
      </h2>
    );

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500">
            Manage all products
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      {/* Product Table */}
      <ProductTable
        products={products}
        onDelete={deleteHandler}
      />
    </div>
  );
};

export default Products;