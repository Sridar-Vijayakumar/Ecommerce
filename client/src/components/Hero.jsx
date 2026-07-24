import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 items-center gap-12">
        
        {/* Left Content */}
        <div>
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            🔥 New Collection 2026
          </span>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mt-6 leading-tight">
            Shop Smart,
            <span className="text-blue-600"> Live Better</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Discover premium quality products with the best prices,
            secure payments, and fast delivery. Everything you need,
            all in one place.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Shop Now
            </Link>

            <Link
              to="/about"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Learn More
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div>
              <h2 className="text-3xl font-bold text-blue-600">10K+</h2>
              <p className="text-gray-600">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">500+</h2>
              <p className="text-gray-600">Products</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
              <p className="text-gray-600">Support</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="/images/hero.png"
            alt="Shopping Hero"
            className="w-full max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;

