import { Link } from "react-router-dom";
import { Mail, Sparkles } from "lucide-react";

const groups = [
  ["Shop", [["All products", "/products"], ["New arrivals", "/products?sort=newest"], ["Best sellers", "/products?sort=best"], ["Special offers", "/products?offers=true"]]],
  ["Company", [["About us", "/#about"], ["Contact", "mailto:support10shopease@gmail.com"], ["Privacy policy", "/help/privacy"], ["Terms & conditions", "/help/terms"]]],
  ["Help", [["My orders", "/myorders"], ["Shipping", "/shipping"], ["Returns", "/help/returns"], ["FAQs", "/help/faqs"]]],
];

function Footer() {
  return (
    <footer className="bg-ink-900 text-slate-300">
      <div className="page-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <Link to="/" className="flex items-center gap-2 text-xl font-black text-white"><Sparkles className="text-brand-500"/> ShopEase</Link>
          <p className="mt-4 max-w-sm leading-7 text-slate-400">Good products, honest prices, and a shopping experience designed to feel refreshingly simple.</p>
          <a href="mailto:support10shopease@gmail.com" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:text-brand-500"><Mail size={17}/> support10shopease@gmail.com</a>
          <div className="mt-6 flex gap-2">
            {["f", "◎", "in", "𝕏"].map((social) => <a key={social} href="#" aria-label="Social media" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sm font-bold transition hover:bg-brand-600">{social}</a>)}
          </div>
        </div>
        {groups.map(([title, links]) => <div key={title}><p className="font-bold text-white">{title}</p><div className="mt-4 flex flex-col gap-3 text-sm">{links.map(([label, to]) => to.startsWith("mailto") ? <a key={label} href={to} className="hover:text-brand-500">{label}</a> : <Link key={label} to={to} className="hover:text-brand-500">{label}</Link>)}</div></div>)}
      </div>
      <div className="border-t border-white/10"><div className="page-shell flex flex-col gap-2 py-5 text-center text-xs text-slate-500 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} ShopEase. All rights reserved.</span><span>Secure payments · Easy returns · Built with care</span></div></div>
    </footer>
  );
}

export default Footer;
