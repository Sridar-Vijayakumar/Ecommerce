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
    <div className="flex items-center gap-3">
      <Filter className="text-gray-500" size={20} />

      <select
        value={selectedCategory}
        onChange={(e) => onCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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