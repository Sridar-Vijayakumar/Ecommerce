import { Link } from "react-router-dom";

const ProductTable = ({ products = [], onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Image</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Stock</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-8 text-gray-500"
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Image */}
                <td className="px-6 py-4">
                  <img
                    src={
                      product.image ||
                      "https://via.placeholder.com/80"
                    }
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover border"
                  />
                </td>

                {/* Name */}
                <td className="px-6 py-4 font-semibold">
                  {product.name}
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  {product.category}
                </td>

                {/* Price */}
                <td className="px-6 py-4 font-medium text-green-600">
                  ₹{Number(product.price).toLocaleString()}
                </td>

                {/* Stock */}
                <td className="px-6 py-4">
                  {product.countInStock > 0 ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {product.countInStock} In Stock
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      Out of Stock
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this product?"
                          )
                        ) {
                          onDelete(product._id);
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;