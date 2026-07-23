import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      {/* 404 */}
      <h1 className="text-8xl font-extrabold text-blue-600">
        404
      </h1>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mt-4">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-center mt-4 max-w-md">
        Sorry, the page you are looking for doesn't exist or has
        been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;