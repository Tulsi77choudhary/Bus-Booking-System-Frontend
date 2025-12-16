import React, { useState } from "react";

export default function Payment({ bookingData, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    setLoading(true);

    // Simulate payment
    setTimeout(() => {
      setLoading(false);
      alert("Payment Successful!");
      onPaymentSuccess && onPaymentSuccess();
    }, 1500);
  };

  return (
    <div className="w-[400px] mx-auto bg-white p-6 rounded-xl shadow-xl mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Payment Summary
      </h2>

      {/* Ticket Details */}
      <div className="mb-4 p-3 bg-gray-100 rounded">
        <p>
          <b>Ticket No:</b> {bookingData?.ticketNo || "TNX873629"}
        </p>
        <p>
          <b>Bus:</b> {bookingData?.busName || "A1 Travels"}
        </p>
        <p>
          <b>From:</b> {bookingData?.from}
        </p>
        <p>
          <b>To:</b> {bookingData?.to}
        </p>
        <p>
          <b>Date:</b> {bookingData?.date}
        </p>
        <p>
          <b>Seats:</b> {bookingData?.seats?.join(", ")}
        </p>
        <p>
          <b>Total Amount:</b> ₹{bookingData?.seats?.length * 500}
        </p>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Select Payment Method</h3>

        <label className="flex items-center mb-2">
          <input
            type="radio"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          UPI (Google Pay / PhonePe / Paytm)
        </label>

        <label className="flex items-center mb-2">
          <input
            type="radio"
            value="Card"
            checked={paymentMethod === "Card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          Debit / Credit Card
        </label>

        <label className="flex items-center mb-2">
          <input
            type="radio"
            value="NetBanking"
            checked={paymentMethod === "NetBanking"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-2"
          />
          Net Banking
        </label>
      </div>

      {/* Pay Now Button */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
