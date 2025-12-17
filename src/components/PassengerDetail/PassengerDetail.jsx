import React from "react";

function PassengerDetail({ selectedSeats }) {
  return (
    <div className="p-0">
      <h2>Passenger Details</h2>

      {selectedSeats.length === 0 ? (
        <p>No seats selected</p>
      ) : (
        <div>
          <h3 className="mt-2 mb-3 text-lg font-semibold">
            Selected Seats: {selectedSeats.join(", ")}
          </h3>

          {selectedSeats.map((seat) => (
            <div key={seat} className="border p-2 rounded mb-2">
              <h4 className="font-semibold">Passenger for Seat {seat}</h4>

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
