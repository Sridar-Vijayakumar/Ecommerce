import { useState } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import About from "../components/About";
// import Footer from "../components/Footer";

const Home = () => {
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  // Temporary Products
  const products = [
    {
      _id: "1",
      name: "iPhone 16 Pro",
      image: "https://via.placeholder.com/300",
      price: 129999,
      category: "Mobiles",
      rating: 4.8,
      numReviews: 120,
    },
    {
      _id: "2",
      name: "MacBook Pro",
      image: "https://via.placeholder.com/300",
      price: 199999,
      category: "Laptops",
      rating: 4.9,
      numReviews: 85,
    },
    {
      _id: "3",
      name: "AirPods Pro",
      image: "https://via.placeholder.com/300",
      price: 24999,
      category: "Accessories",
      rating: 4.7,
      numReviews: 210,
    },
    {
      _id: "4",
      name: "iPad Air",
      image: "https://via.placeholder.com/300",
      price: 69999,
      category: "Tablets",
      rating: 4.6,
      numReviews: 70,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      !category || product.category === category;

    const matchKeyword =
      product.name
        .toLowerCase()
        .includes(keyword.toLowerCase());

    return matchCategory && matchKeyword;
  });

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Search & Filter */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <SearchBar onSearch={setKeyword} />

          <CategoryFilter
            selectedCategory={category}
            onCategory={setCategory}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-8">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <p className="text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </section>

      {/* About */}
      <About />

      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
};

export default Home;

