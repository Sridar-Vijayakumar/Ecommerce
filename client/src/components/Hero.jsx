import { Link } from "react-router-dom";
import { ArrowRight, Check, PackageCheck, ShieldCheck, Star } from "lucide-react";
import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#eff9f6]">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-100/80 blur-3xl" />
      <div className="page-shell grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700"><Star size={14} fill="currentColor" /> New season edit</span>
          <h1 className="mt-7 max-w-2xl text-5xl font-black leading-[1.02] tracking-[-0.045em] text-ink-900 sm:text-6xl lg:text-7xl">
            Everyday things,<span className="block text-brand-600">exceptionally chosen.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Thoughtful tech and everyday essentials, curated for quality and delivered without the fuss.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/products" className="btn-primary gap-2">Explore collection <ArrowRight size={18} /></Link>
            <a href="#about" className="inline-flex items-center rounded-xl border border-slate-300 bg-white/70 px-6 py-3 font-bold text-slate-700 transition hover:border-brand-500 hover:text-brand-700">Why ShopEase</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-2"><Check className="text-brand-600" size={17}/> Secure checkout</span>
            <span className="flex items-center gap-2"><Check className="text-brand-600" size={17}/> Easy returns</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-8 rotate-3 rounded-[3rem] bg-brand-600/10" />
          <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-white bg-[#dff3ed] shadow-2xl shadow-brand-700/20">
            <img src={heroImage} alt="Curated shopping collection" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -left-2 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700"><PackageCheck /></span>
            <div><p className="text-xs text-slate-500">Delivery</p><p className="font-bold text-ink-900">Fast & tracked</p></div>
          </div>
          <div className="absolute -right-2 top-10 grid h-14 w-14 place-items-center rounded-2xl bg-coral-500 text-white shadow-xl"><ShieldCheck /></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
