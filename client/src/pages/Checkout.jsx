import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    totalItems,
    totalPrice,
    clearCart,
  } = useContext(CartContext);

  const shippingAddress = JSON.parse(
    localStorage.getItem("shippingAddress")
  );

  const shippingPrice = totalPrice > 1000 ? 0 : 100;

  const taxPrice = Number((totalPrice * 0.18).toFixed(2));

  const grandTotal =
    totalPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      const { data } = await API.post("/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: "Razorpay",
        itemsPrice: totalPrice,
        shippingPrice,
        taxPrice,
        totalPrice: grandTotal,
      });

      alert("Order Placed Successfully!");

      clearCart();

      localStorage.removeItem("shippingAddress");

      navigate(`/orders/${data._id}`);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Section */}
        <div className="lg:col-span-2">

          {/* Shipping Address */}
          <div className="bg-white shadow rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              Shipping Address
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {shippingAddress?.fullName}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {shippingAddress?.phone}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {shippingAddress?.address},{" "}
              {shippingAddress?.city},{" "}
              {shippingAddress?.state},{" "}
              {shippingAddress?.postalCode},{" "}
              {shippingAddress?.country}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Order Items
            </h2>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b py-3"
              >
                <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p>
                    Qty: {item.qty}
                  </p>
                </div>

                <div>
                  ₹
                  {(
                    item.price * item.qty
                  ).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Section */}
        <div className="bg-white shadow rounded-xl p-6 h-fit">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-3">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Items Price</span>
            <span>
              ₹{totalPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Shipping</span>
            <span>
              ₹{shippingPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Tax (18%)</span>
            <span>
              ₹{taxPrice.toLocaleString()}
            </span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>

            <span>
              ₹{grandTotal.toLocaleString()}
            </span>
          </div>

          <button
            onClick={placeOrderHandler}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mt-8"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
};

export default Checkout;