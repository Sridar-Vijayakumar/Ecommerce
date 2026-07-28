import { useEffect, useState } from "react";
import API from "../../services/api";
import OrderTable from "../../components/admin/OrderTable";
import Loader from "../../components/Loader";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const load = () => API.get("/portal/orders").then(({data}) => setOrders(data));
  useEffect(load, []);
  const deliver = async (id) => {
    await API.put(`/orders/${id}/deliver`);
    load();
  };
  if (!orders) return <Loader/>;
  return <div><h1 className="text-3xl font-bold">Orders</h1><p className="mt-1 text-gray-500">Manage all customer orders</p><div className="mt-6"><OrderTable orders={orders} onDeliver={deliver}/></div></div>;
}
