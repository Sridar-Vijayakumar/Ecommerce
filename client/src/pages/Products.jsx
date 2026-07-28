import { useEffect, useState } from "react";
import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { ProductSkeletonGrid } from "../components/ProductSkeleton";

const categories = ["", "Electronics", "Fashion", "Shoes", "Furniture", "Beauty", "Groceries", "Mobiles", "Laptops"];
const sorts = [["newest", "Newest"], ["low", "Price: Low to High"], ["high", "Price: High to Low"], ["best", "Best Selling"], ["rated", "Highest Rated"]];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const [view, setView] = useState("grid");
  const [mobileFilters, setMobileFilters] = useState(false);
  const page = Number(searchParams.get("page")) || 1;
  const update = (key, value) => {
    const next = new URLSearchParams(searchParams);
    value ? next.set(key, value) : next.delete(key);
    if (key !== "page") next.set("page", "1");
    setSearchParams(next);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await API.get(`/products?${searchParams.toString()}`);
        setProducts(data.products);
        setPages(data.pages);
        setTotal(data.totalProducts);
      } catch (err) {
        setError(err.response?.data?.message || "We couldn’t load the products. Check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams, retryKey]);

  const clearFilters = () => setSearchParams({ sort: "newest" });
  const filters = (
    <div className="space-y-7">
      <div><label className="mb-2 block text-sm font-bold text-ink-900">Category</label><select value={searchParams.get("category") || ""} onChange={(e) => update("category", e.target.value)} className="field">{categories.map((category) => <option key={category} value={category}>{category || "All categories"}</option>)}</select></div>
      <div><label className="mb-2 block text-sm font-bold text-ink-900">Brand</label><input value={searchParams.get("brand") || ""} onChange={(e) => update("brand", e.target.value)} placeholder="e.g. Apple" className="field"/></div>
      <div><label className="mb-2 block text-sm font-bold text-ink-900">Price range</label><div className="grid grid-cols-2 gap-2"><input type="number" min="0" value={searchParams.get("minPrice") || ""} onChange={(e) => update("minPrice", e.target.value)} placeholder="Min" className="field"/><input type="number" min="0" value={searchParams.get("maxPrice") || ""} onChange={(e) => update("maxPrice", e.target.value)} placeholder="Max" className="field"/></div></div>
      <div><label className="mb-2 block text-sm font-bold text-ink-900">Minimum rating</label><select value={searchParams.get("rating") || ""} onChange={(e) => update("rating", e.target.value)} className="field"><option value="">Any rating</option>{[4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars & up</option>)}</select></div>
      <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={searchParams.get("inStock") === "true"} onChange={(e) => update("inStock", e.target.checked ? "true" : "")} className="h-4 w-4 accent-brand-600"/> In stock only</label>
      <button onClick={clearFilters} className="text-sm font-bold text-coral-500">Clear filters</button>
    </div>
  );

  const changePage = (nextPage) => {
    update("page", nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-shell py-12">
      <div className="mb-8"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-600">Shop everything</p><h1 className="mt-2 text-4xl font-black text-ink-900">All products</h1></div>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white p-3">
        <p className="text-sm text-slate-500">{loading ? "Loading products…" : <><strong className="text-ink-900">{total}</strong> products</>}</p>
        <div className="flex items-center gap-2">
          <button onClick={() => setMobileFilters(!mobileFilters)} className="flex items-center gap-2 rounded-xl border px-3 py-2 font-bold lg:hidden"><SlidersHorizontal size={17}/> Filters</button>
          <select value={searchParams.get("sort") || "newest"} onChange={(e) => update("sort", e.target.value)} className="rounded-xl border bg-white px-3 py-2 text-sm font-semibold">{sorts.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
          <button aria-label="Grid view" onClick={() => setView("grid")} className={`rounded-lg p-2 ${view === "grid" ? "bg-ink-900 text-white" : ""}`}><Grid2X2 size={18}/></button>
          <button aria-label="Compact view" onClick={() => setView("list")} className={`rounded-lg p-2 ${view === "list" ? "bg-ink-900 text-white" : ""}`}><List size={18}/></button>
        </div>
      </div>
      {mobileFilters && <div className="mb-6 rounded-3xl border bg-white p-6 lg:hidden">{filters}</div>}
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden h-fit rounded-3xl border bg-white p-6 lg:block">{filters}</aside>
        <div>
          {loading ? <ProductSkeletonGrid/> : error ? (
            <div className="rounded-3xl border border-red-100 bg-white px-6 py-20 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-red-50 text-xl font-black text-red-500">!</div><h2 className="mt-5 text-xl font-black text-ink-900">Something went wrong</h2><p className="mx-auto mt-2 max-w-md text-slate-500">{error}</p><button onClick={() => setRetryKey((key) => key + 1)} className="btn-primary mt-6">Try again</button></div>
          ) : products.length ? (
            <div className={view === "grid" ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3" : "grid gap-6 sm:grid-cols-2"}>{products.map((product) => <ProductCard key={product._id} product={product}/>)}</div>
          ) : (
            <div className="rounded-3xl border bg-white py-20 text-center"><h2 className="text-xl font-black text-ink-900">No products found</h2><p className="mt-2 text-slate-500">Try a different search or adjust your filters.</p><button onClick={clearFilters} className="mt-5 text-sm font-bold text-brand-700">Clear all filters</button></div>
          )}
          {!loading && !error && <Pagination pages={pages} page={page} onPageChange={changePage}/>}
        </div>
      </div>
    </div>
  );
}
