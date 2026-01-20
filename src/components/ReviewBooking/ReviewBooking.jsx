import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function ReviewBooking({ bus, passengers }) {
  const [ticketNumber, setTicketNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirmBooking = () => {
    if (!ticketNumber || !email) {
      alert("Please generate ticket number and enter email!");
      return;
    }

    const bookingData = {
      bus,
      passengers,
      ticketNumber,
      email,
    };

    console.log("Booking Confirmed:", bookingData);
    alert("Booking Successful!");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-3 sm:px-6 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border p-4 sm:p-6">

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">
          Review Booking
        </h1>

        {/* Bus Details */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-2">
            🚌 Bus Details
          </h2>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
            <p><b>Bus Name:</b> {bus?.busName || "N/A"}</p>
            <p><b>From:</b> {bus?.from || "N/A"}</p>
            <p><b>To:</b> {bus?.to || "N/A"}</p>
            <p><b>Departure:</b> {bus?.time || "N/A"}</p>
            <p><b>Price / Seat:</b> ₹{bus?.fare || "N/A"}</p>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-3">
            👥 Passenger Details
          </h2>

          {passengers?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {passengers.map((p, index) => (
                <div
                  key={index}
                  className="border rounded-md p-3 text-sm sm:text-base"
                >
                  <p><b>Seat:</b> {p.seat}</p>
                  <p><b>Name:</b> {p.name}</p>
                  <p><b>Age:</b> {p.age}</p>
                  <p><b>Gender:</b> {p.gender}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No passengers found</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="font-semibold block mb-1">
            Email for Confirmation
          </label>
          <input
            type="email"
            className="border w-full p-2 rounded-md focus:ring-2 focus:ring-green-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Confirm Booking */}
        <button
          onClick={handleConfirmBooking}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-md text-base sm:text-lg font-semibold transition"
        >
          Proceed To Pay
        </button>

      </div>
    </div>
  );
}
