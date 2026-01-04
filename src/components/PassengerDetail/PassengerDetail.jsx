import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PassengerDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const { seats = [], busNumber } = location.state || {};

  if (!seats.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-3">Passenger Details</h2>
          <p className="text-gray-600">No seats selected</p>

          <button
            className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          Passenger Details
        </h2>

        {/* Bus & Seat Info */}
        <div className="mb-6 text-gray-700">
          <p className="font-semibold">Bus Number: {busNumber}</p>
          <p className="mt-1">
            Selected Seats:{" "}
            <span className="font-medium">{seats.join(", ")}</span>
          </p>
        </div>

        {/* Passenger Forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {seats.map((seatNumber) => (
            <div
              key={seatNumber}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-semibold mb-3 text-blue-600">
                Seat {seatNumber}
              </h4>

              <input
                type="text"
                placeholder="Passenger Name"
                className="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Age"
                className="border rounded p-2 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-end">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
            onClick={() => navigate("/ReviewBooking", {
              state: {
                seats,
                busNumber
              }
            })
            }
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default PassengerDetail;
