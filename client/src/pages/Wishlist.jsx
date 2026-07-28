import { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const { wishlist } = useContext(WishlistContext);
  return <div className="page-shell py-14"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-600">Saved for later</p><h1 className="mt-2 text-4xl font-black text-ink-900">My wishlist</h1>
    {wishlist.length ? <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{wishlist.map((p) => <ProductCard key={p._id} product={p}/>)}</div> : <div className="mt-10 rounded-3xl border bg-white py-20 text-center"><Heart className="mx-auto text-slate-300" size={46}/><h2 className="mt-5 text-2xl font-black text-ink-900">Your wishlist is empty</h2><p className="mt-2 text-slate-500">Save products you love and find them here.</p><Link to="/products" className="btn-primary mt-6">Explore products</Link></div>}
  </div>;
}
