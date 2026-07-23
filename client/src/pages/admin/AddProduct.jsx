import { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    countInStock: "",
    description: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const changeHandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandler = (e) => {
    setImageFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(product);
    console.log(imageFile);

    // TODO
    // 1. Upload image to /api/upload
    // 2. Get image URL
    // 3. POST product to /api/products
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-8">
        Add New Product
      </h1>

      <form
        onSubmit={submitHandler}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Product Name */}
        <div>
          <label className="block mb-2 font-medium">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-2 font-medium">
            Brand
          </label>

          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">
            Category
          </label>

          <select
            name="category"
            value={product.category}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Category</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Laptops">Laptops</option>
            <option value="Accessories">Accessories</option>
            <option value="Tablets">Tablets</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">
            Price (₹)
          </label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-2 font-medium">
            Stock Quantity
          </label>

          <input
            type="number"
            name="countInStock"
            value={product.countInStock}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-medium">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={imageHandler}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows="5"
            name="description"
            value={product.description}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;