const CategoryFilter = ({ onCategory }) => {
  const categories = [
    "Mobiles",
    "Laptops",
    "Accessories",
    "Tablets",
  ];

  return (
    <select
      onChange={(e) =>
        onCategory(e.target.value)
      }
      className="border p-2 rounded"
    >
      <option value="">All</option>

      {categories.map((category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;