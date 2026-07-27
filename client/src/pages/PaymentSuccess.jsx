import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const paymentId =
    searchParams.get("paymentId") || "N/A";

  useEffect(() => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full text-center">

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
          <span className="text-4xl text-green-600">
            ✓
          </span>
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase.
          Your payment has been processed successfully.
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="font-semibold">
            Payment ID
          </p>

          <p className="text-blue-600 break-all">
            {paymentId}
          </p>
        </div>

        <div className="space-y-4">

          <Link
            to="/myorders"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
          >
            View My Orders
          </Link>

          <Link
            to="/products"
            className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;