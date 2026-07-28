import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import Loader from "../../components/Loader";

const initial = { name: "", brand: "", category: "", description: "", price: "", stock: "", discount: 0, image: "" };
const categories = ["Mobiles", "Laptops", "Tablets", "Accessories", "Electronics", "Fashion", "Shoes", "Furniture", "Beauty", "Groceries"];

export default function SellerProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    API.get(`/products/${id}`)
      .then(({ data }) => setForm({ ...initial, ...data }))
      .catch((err) => setError(err.response?.data?.message || "Unable to load this product."))
      .finally(() => setLoading(false));
  }, [id]);

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const chooseFile = (event) => {
    const selected = event.target.files[0];
    setError("");
    if (selected && selected.size > 5 * 1024 * 1024) {
      setError("The product image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }
    setFile(selected || null);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      let image = form.image;
      if (file) {
        const body = new FormData();
        body.append("image", file);
        const { data } = await API.post("/upload", body);
        image = data.image;
      }
      const payload = {
        ...form,
        image,
        price: Number(form.price),
        stock: Number(form.stock),
        discount: Number(form.discount || 0),
      };
      if (id) await API.put(`/products/${id}`, payload);
      else await API.post("/products", payload);
      navigate("/seller/products", { state: { message: `Product ${id ? "updated" : "added"} successfully.` } });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || "Unable to save the product. Make sure the server is running and try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-600">Catalog editor</p>
      <h1 className="mt-2 text-4xl font-black text-ink-900">{id ? "Edit product" : "Add product"}</h1>
      {error && <div role="alert" className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
      <form onSubmit={submit} className="surface mt-8 grid gap-5 p-7 sm:grid-cols-2">
        <label className="text-sm font-bold">Product name<input name="name" value={form.name} onChange={change} className="field mt-2" required /></label>
        <label className="text-sm font-bold">Brand<input name="brand" value={form.brand} onChange={change} className="field mt-2" required /></label>
        <label className="text-sm font-bold">Category<select name="category" value={form.category} onChange={change} className="field mt-2" required><option value="">Select category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label className="text-sm font-bold">Price<input type="number" min="0" step="0.01" name="price" value={form.price} onChange={change} className="field mt-2" required /></label>
        <label className="text-sm font-bold">Stock quantity<input type="number" min="0" name="stock" value={form.stock} onChange={change} className="field mt-2" required /></label>
        <label className="text-sm font-bold">Discount %<input type="number" min="0" max="100" name="discount" value={form.discount} onChange={change} className="field mt-2" /></label>
        <label className="text-sm font-bold sm:col-span-2">Description<textarea name="description" value={form.description} onChange={change} rows="5" className="field mt-2" required /></label>
        <label className="text-sm font-bold sm:col-span-2">Product image <span className="font-normal text-slate-400">(JPG, PNG or WebP; max 5 MB)</span><input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" onChange={chooseFile} className="field mt-2" required={!id && !form.image} /></label>
        <button disabled={saving} className="btn-primary sm:col-span-2 disabled:cursor-not-allowed disabled:bg-slate-400">{saving ? "Saving…" : "Save product"}</button>
      </form>
    </div>
  );
}
