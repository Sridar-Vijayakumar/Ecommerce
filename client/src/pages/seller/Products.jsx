import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../../services/api";
import Loader from "../../components/Loader";
import { getFallbackProductImage, getProductImage } from "../../utils/productImage";

export default function SellerProducts() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.get("/portal/products");
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load your products. Log out and sign in again if your account was recently changed to a seller.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts((items) => items.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete this product.");
    }
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-600">Catalog</p><h1 className="mt-2 text-4xl font-black text-ink-900">Your products</h1></div><Link to="/seller/products/add" className="btn-primary">Add product</Link></div>
      {location.state?.message && <div className="mt-6 rounded-2xl bg-brand-50 p-4 text-sm font-semibold text-brand-700">{location.state.message}</div>}
      {error && <div role="alert" className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700"><span>{error}</span><button onClick={load} className="rounded-lg bg-white px-3 py-2">Retry</button></div>}
      {loading ? <Loader /> : <div className="mt-8 overflow-x-auto rounded-3xl border bg-white"><table className="min-w-full text-left"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-4">Product</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Discount</th><th className="p-4">Actions</th></tr></thead><tbody>{products.map((product) => <tr key={product._id} className="border-t"><td className="flex items-center gap-3 p-4"><img src={getProductImage(product)} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = getFallbackProductImage(product); }} alt={product.name} className="h-12 w-12 rounded-xl object-cover"/><div><strong className="block">{product.name}</strong><span className="text-xs text-slate-400">{product.category}</span></div></td><td className="p-4">₹{Number(product.price).toLocaleString("en-IN")}</td><td className="p-4">{product.stock}</td><td className="p-4">{product.discount || 0}%</td><td className="p-4"><Link to={`/seller/products/edit/${product._id}`} className="font-bold text-brand-700">Edit</Link><button onClick={() => remove(product._id)} className="ml-4 font-bold text-red-500">Delete</button></td></tr>)}</tbody></table>{!products.length && !error && <div className="p-12 text-center"><p className="text-slate-500">You have not added any products yet.</p><Link to="/seller/products/add" className="mt-4 inline-block font-bold text-brand-700">Add your first product</Link></div>}</div>}
    </div>
  );
}
