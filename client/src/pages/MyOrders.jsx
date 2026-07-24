import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/myorders");
        setOrders(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <h2 className="text-center text-red-600 mt-10">
        {error}
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            No Orders Found
          </h2>

          <p className="text-gray-500">
            Start shopping to place your first order.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">
                  Order ID
                </th>

                <th className="px-6 py-3 text-left">
                  Date
                </th>

                <th className="px-6 py-3 text-left">
                  Total
                </th>

                <th className="px-6 py-3 text-left">
                  Payment
                </th>

                <th className="px-6 py-3 text-left">
                  Delivery
                </th>

                <th className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {order._id}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ₹
                    {Number(
                      order.totalPrice
                    ).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {order.isPaid ? (
                      <span className="text-green-600 font-semibold">
                        Paid
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {order.isDelivered ? (
                      <span className="text-green-600 font-semibold">
                        Delivered
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Processing
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/orders/${order._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;