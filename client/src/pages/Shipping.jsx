import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const navigate = useNavigate();

  const [shipping, setShipping] = useState(() => JSON.parse(localStorage.getItem("shippingAddress") || "null") || {
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const changeHandler = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(shipping)
    );

    navigate("/checkout");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-8">
          Shipping Address
        </h1>

        <form
          onSubmit={submitHandler}
          className="space-y-5"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={shipping.fullName}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={shipping.phone}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={shipping.address}
            onChange={changeHandler}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shipping.city}
              onChange={changeHandler}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={shipping.state}
              onChange={changeHandler}
              className="border rounded-lg p-3"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shipping.postalCode}
              onChange={changeHandler}
              className="border rounded-lg p-3"
              required
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shipping.country}
              onChange={changeHandler}
              className="border rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Continue to Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
