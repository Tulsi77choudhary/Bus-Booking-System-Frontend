import React from "react";

function PassengerDetail({ selectedSeats }) {
  return (
    <div className="p-0">
      <h2 className="text-xl font-semibold mb-3">Passenger Details</h2>

      {selectedSeats.length === 0 ? (
        <p>No seats selected</p>
      ) : (
        <div>
          {/* ✅ show seat numbers correctly */}
          <h3 className="mt-2 mb-3 text-lg font-semibold">
            Selected Seats:{" "}
            {selectedSeats.map(s => s.seatNumber).join(", ")}
          </h3>

          {/* ✅ loop correctly over seat objects */}
          {selectedSeats.map((seat) => (
            <div
              key={seat.seatNumber}
              className="border p-3 rounded mb-3"
            >
              <h4 className="font-semibold mb-2">
                Passenger for Seat {seat.seatNumber}
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
      )}
    </div>
  );
}

export default PassengerDetail;
