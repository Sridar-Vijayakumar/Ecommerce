import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";
import RazorpayButton from "../components/RazorpayButton";
import { Link, useNavigate } from "react-router-dom";
import { getFallbackProductImage, getProductImage } from "../utils/productImage";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalItems,
    totalPrice,
    clearCart,
    updateQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const [orderId, setOrderId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const shippingAddress = JSON.parse(
    localStorage.getItem("shippingAddress")
  );

  const shippingPrice = totalPrice > 1000 ? 0 : 100;

  const taxPrice = Number((totalPrice * 0.18).toFixed(2));

  const grandTotal =
    totalPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    if (!shippingAddress?.fullName) {
      navigate("/shipping");
      return;
    }
    if (!cartItems.length) {
      navigate("/cart");
      return;
    }
    try {
      const { data } = await API.post("/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: totalPrice,
        shippingPrice,
        taxPrice,
        totalPrice: grandTotal,
      });

      setOrderId(data._id);
      if (paymentMethod === "Cash on Delivery") {
        clearCart();
        localStorage.removeItem("shippingAddress");
        navigate(`/orders/${data._id}`);
      }

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to create order"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Side */}
        <div className="lg:col-span-2">

          {/* Shipping */}
          <div className="bg-white shadow rounded-xl p-6 mb-6">
            <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-bold">Shipping Address</h2><Link to="/shipping" className="text-sm font-bold text-brand-700">Edit address</Link></div>

            <p><strong>Name:</strong> {shippingAddress?.fullName}</p>
            <p><strong>Phone:</strong> {shippingAddress?.phone}</p>
            <p>
              <strong>Address:</strong>{" "}
              {shippingAddress?.address},{" "}
              {shippingAddress?.city},{" "}
              {shippingAddress?.state},{" "}
              {shippingAddress?.postalCode},{" "}
              {shippingAddress?.country}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <label className="flex items-center gap-3 rounded-xl border p-4 mb-3"><input type="radio" name="payment" checked={paymentMethod === "Razorpay"} onChange={() => setPaymentMethod("Razorpay")} className="accent-brand-600"/> Razorpay — cards, UPI and wallets</label>
            <label className="flex items-center gap-3 rounded-xl border p-4"><input type="radio" name="payment" checked={paymentMethod === "Cash on Delivery"} onChange={() => setPaymentMethod("Cash on Delivery")} className="accent-brand-600"/> Cash on Delivery</label>
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
                <div className="flex items-center gap-3">
                  <img src={getProductImage(item)} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = getFallbackProductImage(item); }} alt={item.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <label htmlFor={`qty-${item._id}`} className="text-xs font-semibold text-slate-500">Qty</label>
                    <select id={`qty-${item._id}`} value={item.qty} disabled={Boolean(orderId)} onChange={(event) => updateQuantity(item._id, Number(event.target.value))} className="rounded-lg border bg-white px-2 py-1 text-sm">
                      {Array.from({ length: Math.min(Number(item.stock ?? item.countInStock ?? 10), 10) }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
                    </select>
                    {!orderId && <button onClick={() => removeFromCart(item._id)} className="text-xs font-bold text-red-500">Remove</button>}
                  </div>
                  </div>
                </div>

                <div>
                  ₹{(item.price * item.qty).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side */}
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
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Shipping</span>
            <span>₹{shippingPrice.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Tax</span>
            <span>₹{taxPrice.toLocaleString()}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-2xl font-bold mb-6">
            <span>Total</span>
            <span>₹{grandTotal.toLocaleString()}</span>
          </div>

          {!orderId ? (
            <button
              onClick={placeOrderHandler}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              {paymentMethod === "Razorpay" ? "Create Order & Pay" : "Place Order"}
            </button>
          ) : (
            <RazorpayButton
              amount={grandTotal}
              orderId={orderId}
              onSuccess={() => {
                clearCart();
                localStorage.removeItem("shippingAddress");
              }}
            />
          )}

        </div>

      </div>

    </div>
  );
};

export default Checkout;
