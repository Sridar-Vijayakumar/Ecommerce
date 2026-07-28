import { Filter } from "lucide-react";

const CategoryFilter = ({ selectedCategory, onCategory }) => {
  const categories = [
    "Mobiles",
    "Laptops",
    "Accessories",
    "Tablets",
    "Smart Watches",
    "Headphones",
    "Cameras",
  ];

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
      <Filter className="text-brand-600" size={19} />

      <select
        value={selectedCategory}
        onChange={(e) => onCategory(e.target.value)}
        className="min-w-44 bg-transparent py-2.5 font-semibold text-slate-700 outline-none"
      >
        <option value="">All Categories</option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
