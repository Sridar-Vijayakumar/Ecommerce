import { Minus, Plus, Trash2 } from "lucide-react";

const CartItem = ({
  item,
  increaseQty,
  decreaseQty,
  removeFromCart,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row items-center justify-between gap-6 mb-5">
      {/* Product Details */}
      <div className="flex items-center gap-5 w-full md:w-auto">
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-lg border"
        />

        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {item.name}
          </h2>

          <p className="text-gray-500 mt-1">
            Price: <span className="font-medium">₹{item.price}</span>
          </p>

          <p className="text-gray-500 mt-1">
            Total:{" "}
            <span className="font-semibold text-green-600">
              ₹{item.price * item.qty}
            </span>
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => decreaseQty(item._id)}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition"
            >
              <Minus size={18} />
            </button>

            <span className="font-semibold text-lg w-8 text-center">
              {item.qty}
            </span>

            <button
              onClick={() => increaseQty(item._id)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item._id)}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
      >
        <Trash2 size={18} />
        Remove
      </button>
    </div>
  );
};

export default CartItem;