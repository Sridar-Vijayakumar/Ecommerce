import { useEffect, useState } from "react";
import API from "../../services/api";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => { API.get("/portal/orders").then(({data}) => setOrders(data)); }, []);
  return <div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-600">Fulfilment</p><h1 className="mt-2 text-4xl font-black text-ink-900">Seller orders</h1><div className="mt-8 space-y-4">{orders.map((order) => <article key={order._id} className="surface p-6"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-xs text-slate-400">Order #{order._id.slice(-8)}</p><strong className="text-ink-900">{order.user?.name || "Customer"}</strong></div><span className={`rounded-full px-3 py-1 text-xs font-bold ${order.isDelivered ? "bg-brand-50 text-brand-700" : "bg-amber-50 text-amber-700"}`}>{order.isDelivered ? "Delivered" : "Processing"}</span></div><div className="mt-4 border-t pt-4">{order.orderItems.map((item) => <p key={item._id} className="flex justify-between py-1"><span>{item.name} × {item.qty}</span><strong>₹{Number(item.price * item.qty).toLocaleString("en-IN")}</strong></p>)}</div></article>)}{!orders.length && <div className="surface p-12 text-center text-slate-500">No orders for your products yet.</div>}</div></div>;
}
