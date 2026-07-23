import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    countInStock: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);

      let imageUrl = "";

      // Upload image
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const { data } = await API.post(
          "/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = data.image;
      }

      // Create product
      await API.post("/products", {
        ...product,
        image: imageUrl,
      });

      alert("Product Added Successfully");

      navigate("/admin/products");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-8">
        Add Product
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="countInStock"
          placeholder="Stock"
          value={product.countInStock}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
          required
        />

        <textarea
          rows="5"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={changeHandler}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={imageHandler}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;