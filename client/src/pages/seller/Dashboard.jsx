import { useEffect, useState } from "react";
import API from "../../services/api";
import Loader from "../../components/Loader";

export default function SellerDashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => { API.get("/portal/dashboard").then(({data}) => setStats(data)); }, []);
  if (!stats) return <Loader/>;
  const cards = [["Your products", stats.totalProducts], ["Seller orders", stats.totalOrders], ["Revenue", `₹${Number(stats.totalRevenue).toLocaleString("en-IN")}`], ["Low stock", stats.lowStock]];
  return <div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-600">Seller workspace</p><h1 className="mt-2 text-4xl font-black text-ink-900">Overview</h1><div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label,value]) => <div key={label} className="surface p-6"><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-3 text-3xl font-black text-ink-900">{value}</p></div>)}</div></div>;
}
