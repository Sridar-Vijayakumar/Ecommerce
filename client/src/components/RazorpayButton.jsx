import API from "../services/api";

const RazorpayButton = ({
  amount,
  orderId,
  onSuccess,
}) => {
  const loadRazorpay = async () => {
    try {
      // Create Razorpay Order
      const { data } = await API.post(
        "/payment/create-order",
        {
          amount,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: data.currency,

        name: "MERN E-Commerce",

        description: "Product Purchase",

        order_id: data.id,

        handler: async function (response) {
          try {
            // Verify Payment
            await API.post("/payment/verify", {
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,

              orderId,
            });

            if (onSuccess) {
              onSuccess();
            }

            window.location.href =
              `/payment-success?paymentId=${response.razorpay_payment_id}`;

          } catch (error) {
            console.error(error);

            window.location.href =
              "/payment-failed";
          }
        },

        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999",
        },

        notes: {
          orderId,
        },

        theme: {
          color: "#2563eb",
        },

        modal: {
          ondismiss: function () {
            window.location.href =
              "/payment-failed";
          },
        },
      };

      const paymentObject =
        new window.Razorpay(options);

      paymentObject.open();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to initiate payment"
      );
    }
  };

  return (
    <button
      onClick={loadRazorpay}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
    >
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;