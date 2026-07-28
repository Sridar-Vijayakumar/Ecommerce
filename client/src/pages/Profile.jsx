import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { userInfo, login, logout } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  useEffect(() => { API.get("/users/profile").then(({ data }) => setForm({ name: data.name, email: data.email, password: "" })); }, []);
  const submit = async (e) => { e.preventDefault(); const { data } = await API.put("/users/profile", form); login({ ...userInfo, ...data }); setMessage("Profile updated successfully."); setForm((v) => ({ ...v, password: "" })); };
  return <div className="page-shell py-14"><div className="grid gap-8 lg:grid-cols-[240px_1fr]"><aside className="h-fit rounded-3xl bg-ink-900 p-6 text-white"><div className="grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-xl font-black">{userInfo?.name?.[0]}</div><h2 className="mt-4 text-xl font-black">{userInfo?.name}</h2><p className="text-sm text-slate-400">{userInfo?.email}</p><div className="mt-7 space-y-2"><Link to="/myorders" className="block rounded-xl px-3 py-2 hover:bg-white/10">My orders</Link><Link to="/wishlist" className="block rounded-xl px-3 py-2 hover:bg-white/10">Wishlist</Link><button onClick={logout} className="w-full rounded-xl px-3 py-2 text-left text-coral-500 hover:bg-white/10">Logout</button></div></aside>
    <section className="surface p-7 sm:p-9"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-600">Account settings</p><h1 className="mt-2 text-3xl font-black text-ink-900">Edit profile</h1>{message && <p className="mt-5 rounded-xl bg-brand-50 p-3 text-sm font-semibold text-brand-700">{message}</p>}<form onSubmit={submit} className="mt-8 max-w-xl space-y-5"><label className="block text-sm font-bold">Full name<input className="field mt-2" value={form.name} onChange={(e) => setForm({...form,name:e.target.value})}/></label><label className="block text-sm font-bold">Email<input type="email" className="field mt-2" value={form.email} onChange={(e) => setForm({...form,email:e.target.value})}/></label><label className="block text-sm font-bold">New password <span className="font-normal text-slate-400">(leave blank to keep current)</span><input type="password" className="field mt-2" value={form.password} onChange={(e) => setForm({...form,password:e.target.value})}/></label><button className="btn-primary">Save changes</button></form></section></div></div>;
}
