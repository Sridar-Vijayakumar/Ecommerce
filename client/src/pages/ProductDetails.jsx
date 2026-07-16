import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="max-w-5xl mx-auto p-5">
      <img
        src={`https://placehold.co/500x300`}
        alt={product.name}
        className="w-full max-w-md"
      />

      <h1 className="text-3xl font-bold mt-5">{product.name}</h1>

      <p className="text-gray-600 mt-2">
        {product.description}
      </p>

      <p className="text-2xl font-bold mt-3">
        ₹{product.price}
      </p>

      <p className="mt-2">
        Stock: {product.stock}
      </p>

      <button className="bg-blue-600 text-white px-5 py-2 rounded mt-5">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;