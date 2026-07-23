import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import Loader from "../../components/Loader";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);

        setProduct({
          name: data.name,
          brand: data.brand,
          category: data.category,
          description: data.description,
          price: data.price,
          countInStock: data.countInStock,
          image: data.image,
        });
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

      let imageUrl = product.image;

      // Upload new image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const { data } = await API.post(
          "/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        imageUrl = data.image;
      }

      // Update product
      await API.put(`/products/${id}`, {
        ...product,
        image: imageUrl,
      });

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-8">
        Edit Product
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

        {/* Current Image */}
        {product.image && (
          <div>
            <p className="mb-2 font-medium">
              Current Image
            </p>

            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Upload New Image */}
        <input
          type="file"
          accept="image/*"
          onChange={imageHandler}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;