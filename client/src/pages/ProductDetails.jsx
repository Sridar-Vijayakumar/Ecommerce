import { useContext, useEffect, useState } from "react";
import { Heart, ShieldCheck, ShoppingBag, Zap } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import ReviewForm from "../components/ReviewForm";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { getFallbackProductImage, getProductImages } from "../utils/productImage";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const fetchProduct = async () => { setLoading(true); try { const { data } = await API.get(`/products/${id}`); setProduct(data); setSelectedImage(getProductImages(data)[0]); } finally { setLoading(false); } };
  useEffect(() => { fetchProduct(); }, [id]);
  if (loading) return <Loader/>;
  if (!product) return <div className="py-20 text-center text-2xl font-black">Product not found</div>;
  const stock = product.stock ?? product.countInStock ?? 0;
  const images = getProductImages(product);
  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;
  const add = () => addToCart(product, qty);
  const buy = () => { add(); navigate("/shipping"); };

  return <div className="page-shell py-12">
    <div className="grid gap-10 lg:grid-cols-2">
      <div><div className="overflow-hidden rounded-[2rem] bg-white"><img src={selectedImage} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = getFallbackProductImage(product); }} alt={product.name} className="aspect-square w-full object-cover"/></div>{images.length > 1 && <div className="mt-4 flex gap-3">{images.map((img) => <button key={img} onClick={() => setSelectedImage(img)} className={`overflow-hidden rounded-xl border-2 ${selectedImage === img ? "border-brand-600" : "border-transparent"}`}><img src={img} alt="" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = getFallbackProductImage(product); }} className="h-20 w-20 object-cover"/></button>)}</div>}</div>
      <div className="lg:pl-5"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-600">{product.brand || product.category}</p><h1 className="mt-3 text-4xl font-black tracking-tight text-ink-900 sm:text-5xl">{product.name}</h1><div className="mt-5 flex items-center gap-3"><Rating value={product.rating || 0} text={`${product.numReviews || 0} reviews`}/><span className={`rounded-full px-3 py-1 text-xs font-bold ${stock > 0 ? "bg-brand-50 text-brand-700" : "bg-red-50 text-red-600"}`}>{stock > 0 ? `${stock} in stock` : "Out of stock"}</span></div>
      <p className="mt-7 text-lg leading-8 text-slate-600">{product.description}</p><div className="mt-7 flex flex-wrap items-end gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{product.discount > 0 ? "Discount price" : "Price"}</p><strong className="text-4xl font-black text-ink-900">₹{Number(finalPrice).toLocaleString("en-IN")}</strong></div>{product.discount > 0 && <><span className="pb-1 text-lg text-slate-500">MRP <span className="line-through">₹{Number(product.price).toLocaleString("en-IN")}</span></span><span className="mb-1 rounded-full bg-coral-500 px-3 py-1 text-xs font-black text-white">{product.discount}% OFF</span></>}</div>
      {stock > 0 && <div className="mt-8 flex items-center gap-3"><label className="font-bold">Quantity</label><select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="rounded-xl border bg-white px-4 py-3">{Array.from({length: Math.min(stock, 10)}, (_,i) => <option key={i+1}>{i+1}</option>)}</select></div>}
      <div className="mt-8 grid gap-3 sm:grid-cols-2"><button disabled={!stock} onClick={add} className="btn-primary gap-2 disabled:cursor-not-allowed disabled:bg-slate-300"><ShoppingBag size={19}/> Add to cart</button><button disabled={!stock} onClick={buy} className="inline-flex items-center justify-center gap-2 rounded-xl bg-coral-500 px-6 py-3 font-bold text-white disabled:bg-slate-300"><Zap size={19}/> Buy now</button></div>
      <button onClick={() => toggleWishlist(product)} className={`mt-4 flex items-center gap-2 text-sm font-bold ${isWishlisted(product._id) ? "text-coral-500" : "text-slate-500"}`}><Heart size={18} fill={isWishlisted(product._id) ? "currentColor" : "none"}/>{isWishlisted(product._id) ? "Saved to wishlist" : "Add to wishlist"}</button>
      <div className="mt-8 flex items-center gap-3 rounded-2xl bg-brand-50 p-4 text-sm text-brand-700"><ShieldCheck/> Secure checkout and easy 30-day returns</div></div>
    </div>
    <section className="mt-20"><h2 className="text-3xl font-black text-ink-900">Customer reviews</h2>{product.reviews?.length ? <div className="mt-7 grid gap-5 md:grid-cols-2">{product.reviews.map((review) => <article key={review._id} className="rounded-3xl border bg-white p-6"><div className="flex justify-between"><strong className="text-ink-900">{review.name}</strong><Rating value={review.rating}/></div><p className="mt-3 text-slate-600">{review.comment}</p></article>)}</div> : <p className="mt-4 text-slate-500">No reviews yet. Be the first to share your thoughts.</p>}<ReviewForm productId={product._id} onReviewAdded={fetchProduct}/></section>
  </div>;
}
