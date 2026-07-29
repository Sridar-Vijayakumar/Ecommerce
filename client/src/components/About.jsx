import { PackageCheck, ShieldCheck, BadgeCheck } from "lucide-react";

const benefits = [
  [PackageCheck, "Fast, tracked delivery", "Clear updates from our door to yours, with free shipping on qualifying orders."],
  [ShieldCheck, "Safe by default", "Trusted payments and thoughtful account protection on every purchase."],
  [BadgeCheck, "Quality, curated", "Every item earns its place through usefulness, quality, and lasting value."],
];

function About() {
  return (
    <section id="about" className="bg-white py-20 sm:py-24">
      <div className="page-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-600">The ShopEase promise</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-ink-900 sm:text-5xl">Shopping that respects your time.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">From discovery to delivery, every detail is designed to make finding the right thing feel easy.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {benefits.map(([Icon, title, description]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-[#f8faf9] p-7 transition hover:border-brand-100 hover:bg-brand-50">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-white"><Icon size={23}/></span>
              <h3 className="mt-6 text-xl font-extrabold text-ink-900">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;


