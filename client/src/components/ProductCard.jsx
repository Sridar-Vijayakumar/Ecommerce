import { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import Rating from "./Rating";
import { getFallbackProductImage, getProductImage } from "../utils/productImage";

const ProductCard = ({ product, badge }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      {badge && <span className="absolute left-4 top-4 z-10 rounded-full bg-coral-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">{badge}</span>}
      <button onClick={() => toggleWishlist(product)} aria-label={`Save ${product.name}`} className={`absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm transition hover:text-coral-500 ${isWishlisted(product._id) ? "text-coral-500" : "text-slate-500"}`}>
        <Heart size={17} fill={isWishlisted(product._id) ? "currentColor" : "none"} />
      </button>
      <Link to={`/product/${product._id}`} className="block overflow-hidden">
        <img src={getProductImage(product)} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = getFallbackProductImage(product); }} alt={product.name} loading="lazy" className="aspect-[4/3] w-full bg-slate-100 object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="p-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">{product.category}</p>
        <Link to={`/product/${product._id}`}><h3 className="truncate text-lg font-extrabold text-ink-900 transition group-hover:text-brand-700">{product.name}</h3></Link>
        <div className="mt-3"><Rating value={product.rating || 0} text={`${product.numReviews || 0}`} /></div>
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xl font-black text-ink-900">₹{Number(product.price).toLocaleString("en-IN")}</p>
            {product.oldPrice && <p className="text-xs text-slate-400 line-through">₹{Number(product.oldPrice).toLocaleString("en-IN")}</p>}
          </div>
          <button onClick={() => addToCart(product, 1)} aria-label={`Add ${product.name} to cart`} className="flex h-11 items-center gap-2 rounded-full bg-ink-900 px-4 text-sm font-bold text-white transition hover:bg-brand-600">
            <ShoppingBag size={17} /><span className="hidden xl:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
