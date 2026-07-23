function About() {
  return (
    <section
      id="about"
      className="bg-gray-50 py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            About Our Store
          </h2>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Welcome to our E-Commerce Store, your one-stop destination for
            quality products at affordable prices. We are committed to
            delivering a seamless shopping experience with secure payments,
            fast delivery, and exceptional customer support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">🚚</div>

            <h3 className="text-xl font-semibold mb-2">
              Fast Delivery
            </h3>

            <p className="text-gray-600">
              We ensure quick and reliable delivery to your doorstep.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">🔒</div>

            <h3 className="text-xl font-semibold mb-2">
              Secure Payments
            </h3>

            <p className="text-gray-600">
              Shop confidently with trusted and secure payment methods.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">⭐</div>

            <h3 className="text-xl font-semibold mb-2">
              Premium Quality
            </h3>

            <p className="text-gray-600">
              We offer high-quality products carefully selected for our customers.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;