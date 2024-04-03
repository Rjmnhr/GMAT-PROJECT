import React from "react";
import AxiosInstance from "../../Config/axios";

const CheckoutComponent = ({ price, text }) => {
  const handleBuyNow = async () => {
    try {
      const response = await AxiosInstance.post(
        "/create-checkout-session",
        { price: price },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle the response as needed

      // Redirect to Stripe Checkout page on success
      window.location.href = response.data.url; // Assuming the response contains the URL
    } catch (error) {
      // Handle errors
      console.error("API request failed:", error);
    }
  };
  return (
    <>
      <button
        onClick={handleBuyNow}
        style={{
          background: "black",
          color: "white",
        }}
        className="btn border w-75 "
      >
        {text}
      </button>
    </>
  );
};

export default CheckoutComponent;
