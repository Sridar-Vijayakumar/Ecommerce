import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Headphones, PackageCheck, RotateCcw, ShieldCheck } from "lucide-react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

const products = [
  { _id: "1", name: "iPhone 16 Pro", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80", price: 129999, oldPrice: 139999, category: "Electronics", rating: 4.8, numReviews: 120 },
  { _id: "2", name: "Air Max Sneakers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80", price: 8999, category: "Shoes", rating: 4.9, numReviews: 248 },
  { _id: "3", name: "Studio Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80", price: 12499, oldPrice: 15999, category: "Electronics", rating: 4.7, numReviews: 194 },
  { _id: "4", name: "Minimal Lounge Chair", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=700&q=80", price: 18999, category: "Furniture", rating: 4.6, numReviews: 76 },
  { _id: "5", name: "Classic Leather Watch", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=80", price: 6999, category: "Fashion", rating: 4.8, numReviews: 155 },
  { _id: "6", name: "Everyday Skin Set", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=80", price: 2499, category: "Beauty", rating: 4.5, numReviews: 89 },
  { _id: "7", name: "MacBook Air", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80", price: 99999, category: "Electronics", rating: 4.9, numReviews: 310 },
  { _id: "8", name: "Premium Coffee Blend", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=700&q=80", price: 899, category: "Groceries", rating: 4.7, numReviews: 131 },
  { _id: "9", name: "Linen Weekend Shirt", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80", price: 2999, category: "Fashion", rating: 4.6, numReviews: 64 },
  { _id: "10", name: "Wireless Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80", price: 5999, category: "Electronics", rating: 4.8, numReviews: 203 },
  { _id: "11", name: "Modern Table Lamp", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80", price: 3499, category: "Furniture", rating: 4.6, numReviews: 57 },
  { _id: "12", name: "Running Essentials", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=80", price: 4999, category: "Fashion", rating: 4.7, numReviews: 93 },
];

const categories = [
  ["📱", "Electronics", "Latest smart tech"],
  ["👕", "Fashion", "Fresh everyday looks"],
  ["👟", "Shoes", "Made for every step"],
  ["🛋️", "Furniture", "Spaces you’ll love"],
  ["✨", "Beauty", "Care that feels good"],
  ["🛒", "Groceries", "Pantry favourites"],
];

const SectionTitle = ({ eyebrow, title, link = true }) => (
  <div className="mb-8 flex items-end justify-between gap-4">
    <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-600">{eyebrow}</p><h2 className="mt-2 text-3xl font-black tracking-tight text-ink-900 sm:text-4xl">{title}</h2></div>
    {link && <Link to="/products" className="hidden items-center gap-2 text-sm font-bold text-brand-700 hover:gap-3 sm:flex">View all <ArrowRight size={17}/></Link>}
  </div>
);

function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const subscribe = (e) => { e.preventDefault(); if (email) setSubscribed(true); };

  return (
    <>
      <Hero />

      <section className="page-shell py-20">
        <SectionTitle eyebrow="Browse the good stuff" title="Shop by category" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(([icon, name, note]) => (
            <Link key={name} to={`/products?category=${encodeURIComponent(name)}`} className="group rounded-3xl border border-slate-200 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-brand-100 hover:shadow-soft">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-3xl transition group-hover:scale-110">{icon}</span>
              <h3 className="mt-4 font-extrabold text-ink-900">{name}</h3><p className="mt-1 text-xs text-slate-500">{note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-shell pb-20">
        <SectionTitle eyebrow="Popular right now" title="Featured products" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0, 8).map((product, i) => <ProductCard key={product._id} product={product} badge={i < 2 ? "Hot" : null}/>)}</div>
      </section>

      <section className="bg-[#eef8f5] py-20">
        <div className="page-shell">
          <SectionTitle eyebrow="Just landed" title="New arrivals" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.slice(8, 12).map((product) => <ProductCard key={product._id} product={product} badge="New"/>)}</div>
        </div>
      </section>

      <section className="page-shell py-20">
        <div className="overflow-hidden rounded-[2.5rem] bg-ink-900 px-7 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:py-14">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-500">Weekend special</p><h2 className="mt-3 text-4xl font-black sm:text-5xl">Up to 40% off.</h2><p className="mt-4 max-w-xl text-slate-300">Limited-time prices on selected tech, fashion and home essentials.</p></div>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 lg:mt-0 lg:min-w-80">
            <p className="text-sm text-slate-300">Use coupon at checkout</p><div className="mt-3 flex items-center justify-between gap-4"><strong className="text-2xl tracking-widest">SAVE40</strong><Link to="/products?offers=true" className="rounded-xl bg-coral-500 px-5 py-3 font-bold hover:bg-coral-500/90">Shop deals</Link></div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-20">
        <SectionTitle eyebrow="Tried, loved, repeated" title="Best sellers" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{[products[1], products[6], products[2], products[7]].map((product) => <ProductCard key={product._id} product={product} badge="Best seller"/>)}</div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14">
        <div className="page-shell text-center"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-400">Brands you know and love</p>
          <div className="mt-8 grid grid-cols-2 gap-4 text-2xl font-black tracking-tight text-slate-400 sm:grid-cols-3 lg:grid-cols-6">
            {["NIKE", "adidas", "Apple", "SAMSUNG", "SONY", "PUMA"].map((brand) => <div key={brand} className="rounded-2xl bg-slate-50 px-4 py-5 transition hover:text-ink-900">{brand}</div>)}
          </div>
        </div>
      </section>

      <section id="about" className="page-shell py-20">
        <SectionTitle eyebrow="The ShopEase promise" title="Why choose us" link={false}/>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[[PackageCheck, "Free shipping", "On qualifying orders"], [ShieldCheck, "Secure payment", "Protected every time"], [RotateCcw, "Easy returns", "Simple 30-day returns"], [Headphones, "24/7 support", "We’re always here"]].map(([Icon, title, text]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Icon/></span><h3 className="mt-5 text-lg font-extrabold text-ink-900">{title}</h3><p className="mt-2 text-sm text-slate-500">{text}</p></div>
          ))}
        </div>
      </section>

      <section className="bg-[#eef8f5] py-20">
        <div className="page-shell"><SectionTitle eyebrow="Real people, real favourites" title="What customers say" link={false}/>
          <div className="grid gap-6 md:grid-cols-3">
            {[["Aarav Mehta", "Delivery was faster than expected and the product felt exactly as premium as it looked online."], ["Riya Sharma", "The cleanest shopping experience I’ve used. Finding, paying and tracking were all effortless."], ["Kabir Singh", "Great selection, fair prices, and support actually responded when I needed help."]].map(([name, quote]) => (
              <figure key={name} className="rounded-3xl bg-white p-7 shadow-sm"><div className="text-amber-400">★★★★★</div><blockquote className="mt-5 leading-7 text-slate-600">“{quote}”</blockquote><figcaption className="mt-6 font-extrabold text-ink-900">{name}<span className="block text-xs font-medium text-slate-400">Verified customer</span></figcaption></figure>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-20">
        <div className="rounded-[2.5rem] bg-brand-600 px-6 py-12 text-center text-white sm:px-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-100">A better inbox</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">{subscribed ? "You’re on the list!" : "Get 10% off your first order"}</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">{subscribed ? "Watch your inbox for fresh finds and members-only offers." : "Subscribe for new arrivals, useful finds and members-only offers."}</p>
          {!subscribed && <form onSubmit={subscribe} className="mx-auto mt-7 flex max-w-lg flex-col gap-2 rounded-2xl bg-white p-2 sm:flex-row"><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="min-w-0 flex-1 rounded-xl px-4 py-3 text-ink-900 outline-none"/><button className="rounded-xl bg-ink-900 px-6 py-3 font-bold text-white">Subscribe</button></form>}
        </div>
      </section>
    </>
  );
}

export default Home;
