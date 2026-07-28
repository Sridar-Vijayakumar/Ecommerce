import { Link } from "react-router-dom";
import { X } from "lucide-react";
export default function PaymentFailed() {
  return <div className="page-shell grid min-h-[70vh] place-items-center py-12"><div className="surface max-w-lg p-9 text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-red-50 text-red-500"><X size={36}/></span><h1 className="mt-6 text-3xl font-black text-ink-900">Payment wasn’t completed</h1><p className="mt-3 text-slate-500">Your cart is safe. Try the payment again or choose another method.</p><div className="mt-7 flex justify-center gap-3"><Link to="/checkout" className="btn-primary">Try again</Link><Link to="/cart" className="rounded-xl border px-6 py-3 font-bold">Back to cart</Link></div></div></div>;
}
