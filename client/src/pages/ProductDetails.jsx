import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import Loader from "../components/Loader";
import Rating from "../components/Rating";
import ReviewForm from "../components/ReviewForm";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(`/products/${id}`);

      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <h2 className="text-center text-2xl mt-10">
        Product Not Found
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Product */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Image */}
        <div>
          <img
            src={product.image || "https://placehold.co/600x500"}
            alt={product.name}
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Details */}
        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-3">
            {product.category}
          </p>

          <div className="mt-4">
            <Rating
              value={product.rating || 0}
              text={`${product.numReviews || 0} Reviews`}
            />
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
              onClick={() =>
                addToCart({
                  ...product,
                  qty,
                })
              }
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

      {/* Reviews */}
      <div className="mt-16">

        <h2 className="text-3xl font-bold mb-6">
          Customer Reviews
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-6">

            {product.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white shadow rounded-xl p-6"
              >
                <h3 className="font-semibold">
                  {review.name}
                </h3>

                <Rating value={review.rating} />

                <p className="text-gray-600 mt-2">
                  {review.comment}
                </p>
              </div>
            ))}

          </div>
        ) : (
          <p className="text-gray-500">
            No reviews yet.
          </p>
        )}

      </div>

      {/* Review Form */}
      <ReviewForm
        productId={product._id}
        onReviewAdded={fetchProduct}
      />

    </div>
  );
};

export default ProductDetails;