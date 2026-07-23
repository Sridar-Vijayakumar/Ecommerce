import { useState } from "react";
import OrderTable from "../../components/admin/OrderTable";

const Orders = () => {
  const [orders] = useState([
    {
      _id: "ORD1001",
      user: {
        name: "Sridar",
      },
      totalPrice: 45999,
      isPaid: true,
      isDelivered: false,
      createdAt: "2026-07-23",
    },
    {
      _id: "ORD1002",
      user: {
        name: "Rahul",
      },
      totalPrice: 18999,
      isPaid: true,
      isDelivered: true,
      createdAt: "2026-07-22",
    },
    {
      _id: "ORD1003",
      user: {
        name: "Priya",
      },
      totalPrice: 9999,
      isPaid: false,
      isDelivered: false,
      createdAt: "2026-07-21",
    },
  ]);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Orders
          </h1>

          <p className="text-gray-500 mt-1">
            Manage customer orders
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <OrderTable orders={orders} />
    </div>
  );
};

export default Orders;