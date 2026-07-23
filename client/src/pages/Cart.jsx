import { useState } from "react";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      _id: "1",
      name: "iPhone 16 Pro",
      image: "https://via.placeholder.com/150",
      price: 129999,
      qty: 1,
    },
    {
      _id: "2",
      name: "AirPods Pro",
      image: "https://via.placeholder.com/150",
      price: 24999,
      qty: 2,
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((items) =>
      items.filter((item) => item._id !== id)
    );
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">
            Your cart is empty
          </h2>

          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-xl p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Total Items</span>
              <span>
                {cartItems.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )}
              </span>
            </div>

            <div className="flex justify-between mb-6">
              <span>Total Price</span>
              <span className="font-bold text-xl text-green-600">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;