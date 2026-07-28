import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const links = [["Overview", "/seller"], ["Products", "/seller/products"], ["Add product", "/seller/products/add"], ["Orders", "/seller/orders"]];

export default function SellerLayout() {
  const { userInfo, logout } = useContext(AuthContext);
  return <div className="min-h-[calc(100vh-76px)] bg-slate-100 lg:grid lg:grid-cols-[250px_1fr]">
    <aside className="bg-ink-900 p-5 text-white"><p className="text-xs font-bold uppercase tracking-[.2em] text-brand-500">Seller portal</p><h2 className="mt-2 text-xl font-black">{userInfo?.name}</h2><nav className="mt-8 flex gap-2 overflow-x-auto lg:flex-col">{links.map(([label, to]) => <NavLink key={label} to={to} end={to === "/seller"} className={({isActive}) => `whitespace-nowrap rounded-xl px-4 py-3 font-semibold ${isActive ? "bg-brand-600 text-white" : "text-slate-300 hover:bg-white/10"}`}>{label}</NavLink>)}</nav><button onClick={logout} className="mt-8 text-sm font-bold text-coral-500">Logout</button></aside>
    <main className="p-5 sm:p-8"><Outlet/></main>
  </div>;
}
