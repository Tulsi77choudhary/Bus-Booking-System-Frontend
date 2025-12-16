import React, { useState } from "react";

export default function ReviewBooking({ bus, passengers }) {
  const [ticketNumber, setTicketNumber] = useState("");
  const [email, setEmail] = useState("");

  // Generate Ticket No. (random)
  const generateTicket = () => {
    const ticket = "TKT" + Math.floor(100000 + Math.random() * 900000);
    setTicketNumber(ticket);
  };

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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border">

      {/* Bus Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-2">🚌 Bus Details</h2>

        <div className="mt-3">
          <p><b>Bus Name:</b> {bus?.busName || "N/A"}</p>
          <p><b>From:</b> {bus?.from || "N/A"}</p>
          <p><b>To:</b> {bus?.to || "N/A"}</p>
          <p><b>Departure:</b> {bus?.time || "N/A"}</p>
          <p><b>Price per Seat:</b> ₹{bus?.fare || "N/A"}</p>
        </div>
      </div>

      {/* Passenger Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-2">👥 Passenger Details</h2>

        {passengers?.length > 0 ? (
          passengers.map((p, index) => (
            <div key={index} className="border p-3 mb-3 rounded-md">
              <p><b>Seat:</b> {p.seat}</p>
              <p><b>Name:</b> {p.name}</p>
              <p><b>Age:</b> {p.age}</p>
              <p><b>Gender:</b> {p.gender}</p>
            </div>
          ))
        ) : (
          <p>No passengers found</p>
        )}
      </div>

      {/* Ticket Number */}
      <div className="mb-4">
        {ticketNumber && (
          <p className="text-green-600 font-semibold">
            Ticket Number: {ticketNumber}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="font-semibold">Email for Confirmation:</label>
        <input
          type="email"
          className="border w-full p-2 mt-2 rounded-md"
          placeholder="Enter your email…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Confirm Booking */}
      <button
        onClick={handleConfirmBooking}
        className="bg-green-600 text-white w-full py-3 rounded-md text-lg font-semibold"
      >
        Proceed To Pay
      </button>
    </div>
  );
}
