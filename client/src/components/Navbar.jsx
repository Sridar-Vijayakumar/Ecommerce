import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, Sparkles, UserRound, X } from "lucide-react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { totalItems } = useContext(CartContext);
  const links = [["Home", "/"], ["Categories", "/products"], ["New arrivals", "/products"], ["Offers", "/products"]];

  const search = (event) => {
    event.preventDefault();
    navigate(query.trim() ? `/products?keyword=${encodeURIComponent(query.trim())}` : "/products");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="page-shell flex min-h-[76px] items-center gap-4 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 text-xl font-black tracking-tight text-ink-900">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25"><Sparkles size={20} /></span>
          <span>Shop<span className="text-brand-600">Ease</span></span>
        </Link>
        <form onSubmit={search} className="mx-auto hidden max-w-xl flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-4 lg:flex">
          <Search size={18} className="text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, categories or brands" className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" />
          <button className="text-sm font-bold text-brand-700">Search</button>
        </form>
        <nav className="hidden items-center gap-6 xl:flex">
          {links.map(([label, to]) => <NavLink key={label} to={to} className="whitespace-nowrap text-sm font-semibold text-slate-600 transition hover:text-brand-700">{label}</NavLink>)}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Link to="/wishlist" aria-label="Wishlist" className="grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-brand-50 hover:text-coral-500"><Heart size={20}/></Link>
          <Link to="/profile" aria-label="Account" className="grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-brand-50 hover:text-brand-700"><UserRound size={20}/></Link>
          <Link to="/cart" aria-label="Cart" className="relative grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-white hover:bg-brand-700">
            <ShoppingBag size={19}/>{totalItems > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-coral-500 px-1 text-[10px] font-black">{totalItems}</span>}
          </Link>
          <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full text-slate-700 xl:hidden" aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {open && <div className="border-t border-slate-100 bg-white p-4 xl:hidden">
        <form onSubmit={search} className="mb-3 flex items-center rounded-xl bg-slate-50 px-3"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="w-full bg-transparent px-3 py-3 outline-none"/></form>
        {links.map(([label, to]) => <NavLink key={label} to={to} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-brand-50">{label}</NavLink>)}
      </div>}
    </header>
  );
}

export default Navbar;
