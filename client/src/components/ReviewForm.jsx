import { useState } from "react";
import API from "../services/api";

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please enter a review.");
      return;
    }

    try {
      setLoading(true);

      await API.post(`/products/${productId}/reviews`, {
        rating,
        comment,
      });

      alert("Review submitted successfully!");

      setRating(5);
      setComment("");

      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to submit review"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Write a Review
      </h2>

      <form onSubmit={submitHandler}>
        {/* Rating */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(Number(e.target.value))
            }
            className="w-full border rounded-lg p-3"
          >
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Review
          </label>

          <textarea
            rows="5"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="w-full border rounded-lg p-3 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;

