import { useEffect, useState } from "react";
import API from "../services/api";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const { data } = await API.get(
          `/products?keyword=${keyword}&category=${category}&page=${page}`
        );

        setProducts(data.products);
        setPages(data.pages);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, category, page]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-8">
        Our Products
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">
        <SearchBar onSearch={setKeyword} />

        <CategoryFilter
          selectedCategory={category}
          onCategory={setCategory}
        />
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Error */}
      {error && (
        <h2 className="text-center text-red-600 text-xl">
          {error}
        </h2>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <h2 className="text-center text-gray-500 text-xl">
              No Products Found
            </h2>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <Pagination
              pages={pages}
              page={page}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Products;