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
                className="text-center py-6 text-gray-500"
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                </td>

                <td className="px-6 py-4 font-medium">
                  {product.name}
                </td>

                <td className="px-6 py-4">
                  {product.category}
                </td>

                <td className="px-6 py-4">
                  ₹{product.price}
                </td>

                <td className="px-6 py-4">
                  {product.countInStock}
                </td>

                <td className="px-6 py-4 flex justify-center gap-2">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => onDelete(product._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
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