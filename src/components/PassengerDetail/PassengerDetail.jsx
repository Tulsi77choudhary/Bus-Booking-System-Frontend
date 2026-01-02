import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PassengerDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ get data from navigation state
  const { seats = [], busNumber } = location.state || {};

  if (!seats.length) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-3">Passenger Details</h2>
        <p>No seats selected</p>

        <button
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Passenger Details</h2>

      {/* ✅ Show selected seat numbers */}
      <h3 className="mb-4 font-semibold">
        Bus: {busNumber} <br />
        Selected Seats: {seats.join(", ")}
      </h3>

      {/* ✅ Loop seats correctly */}
      {seats.map((seatNumber) => (
        <div
          key={seatNumber}
          className="border p-3 rounded mb-3"
        >
          <h4 className="font-semibold mb-2">
            Passenger for Seat {seatNumber}
          </h4>

          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full my-1"
          />

          <input
            type="number"
            placeholder="Age"
            className="border p-2 w-full my-1"
          />

          <select className="border p-2 w-full my-1">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default PassengerDetail;
