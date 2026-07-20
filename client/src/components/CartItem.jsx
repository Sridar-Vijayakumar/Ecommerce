import React from "react";

const CartItem = ({
  item,
  increaseQty,
  decreaseQty,
  removeFromCart,
}) => {
  return (
    <div className="flex items-center justify-between border rounded-lg p-4 mb-4">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded"
        />

        <div>
          <h2 className="text-lg font-semibold">
            {item.name}
          </h2>

          <p className="text-gray-600">
            ₹{item.price}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => decreaseQty(item._id)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>

            <span>{item.qty}</span>

            <button
              onClick={() => increaseQty(item._id)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(item._id)}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;