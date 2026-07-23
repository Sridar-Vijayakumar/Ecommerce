import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  if (!product)
    return (
      <h2 className="text-center text-2xl mt-10">
        Product Not Found
      </h2>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div>
          <img
            src={product.image || "https://placehold.co/600x500"}
            alt={product.name}
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-3">
            {product.category}
          </p>

          <div className="flex items-center gap-2 mt-4">
            ⭐ {product.rating || 4.5}
            <span className="text-gray-500">
              ({product.numReviews || 0} Reviews)
            </span>
          </div>

          <p className="text-gray-700 mt-6 leading-8">
            {product.description}
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-6">
            ₹{product.price}
          </h2>

          <p
            className={`mt-4 font-semibold ${
              product.countInStock > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {product.countInStock > 0
              ? "In Stock"
              : "Out of Stock"}
          </p>

          {/* Quantity */}
          {product.countInStock > 0 && (
            <div className="mt-6">
              <label className="block mb-2 font-medium">
                Quantity
              </label>

              <select
                value={qty}
                onChange={(e) =>
                  setQty(Number(e.target.value))
                }
                className="border rounded-lg p-3"
              >
                {[...Array(product.countInStock).keys()].map(
                  (x) => (
                    <option
                      key={x + 1}
                      value={x + 1}
                    >
                      {x + 1}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
            >
              Add to Cart
            </button>

            <button
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition"
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;