import { Link } from "react-router-dom";

const OrderTable = ({ orders = [], onDeliver }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Order ID</th>
            <th className="px-6 py-3 text-left">Customer</th>
            <th className="px-6 py-3 text-left">Amount</th>
            <th className="px-6 py-3 text-left">Payment</th>
            <th className="px-6 py-3 text-left">Delivery</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center py-6 text-gray-500"
              >
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {order._id.slice(-8)}
                </td>

                <td className="px-6 py-4">
                  {order.user?.name || "N/A"}
                </td>

                <td className="px-6 py-4">
                  ₹{order.totalPrice}
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
                    <span className="text-orange-500 font-semibold">
                      Pending
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 flex justify-center gap-2">
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </Link>

                  {!order.isDelivered && (
                    <button
                      onClick={() => onDeliver?.(order._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Deliver
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
