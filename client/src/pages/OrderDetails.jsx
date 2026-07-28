import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import { getFallbackProductImage, getProductImage } from "../utils/productImage";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load order"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <Loader />;

  if (error)
    return (
      <h2 className="text-center text-red-600 mt-10">
        {error}
      </h2>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Order Details
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Side */}
        <div className="lg:col-span-2">

          {/* Shipping Address */}
          <div className="bg-white shadow rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              Shipping Address
            </h2>

            <p>
              <strong>Name:</strong>{" "}
              {order.shippingAddress?.fullName}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.shippingAddress?.phone}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.shippingAddress?.address},{" "}
              {order.shippingAddress?.city},{" "}
              {order.shippingAddress?.state},{" "}
              {order.shippingAddress?.postalCode},{" "}
              {order.shippingAddress?.country}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">
              Ordered Products
            </h2>

            {order.orderItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={getProductImage(item)}
                    onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = getFallbackProductImage(item); }}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      Qty: {item.qty}
                    </p>
                  </div>
                </div>

                <div className="font-semibold">
                  ₹
                  {(
                    item.price * item.qty
                  ).toLocaleString()}
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
            <span>Items Price</span>

            <span>
              ₹
              {Number(
                order.itemsPrice
              ).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Shipping</span>

            <span>
              ₹
              {Number(
                order.shippingPrice
              ).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Tax</span>

            <span>
              ₹
              {Number(
                order.taxPrice
              ).toLocaleString()}
            </span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span> 

            <span>
              ₹
              {Number(
                order.totalPrice
              ).toLocaleString()}
            </span>
          </div>

          <div className="mt-8 space-y-3">

            <div className="flex justify-between">
              <span>Payment</span>

              <span
                className={
                  order.isPaid
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>

              <span
                className={
                  order.isDelivered
                    ? "text-green-600 font-semibold"
                    : "text-yellow-600 font-semibold"
                }
              >
                {order.isDelivered
                  ? "Delivered"
                  : "Processing"}
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetails;
 

