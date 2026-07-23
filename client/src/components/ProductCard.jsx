import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
            {product.name}
          </h2>
        </Link>

        <p className="text-gray-500 text-sm mt-2">
          {product.category}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />
          <span className="text-sm text-gray-600">
            {product.rating || 4.5}
          </span>

          <span className="text-gray-400">
            ({product.numReviews || 0})
          </span>
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-blue-600 mt-3">
          ₹{product.price}
        </p>

        {/* Button */}
        <Link
          to={`/product/${product._id}`}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          <ShoppingCart size={18} />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;