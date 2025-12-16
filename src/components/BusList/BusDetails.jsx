import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineSwap } from "react-icons/ai";
import {
  MdAccessTime,
  MdEventSeat,
  MdDateRange,
  MdDirectionsBus,
} from "react-icons/md";

export default function BusDetails() {
  const location = useLocation();
  const bus = location.state?.bus;

  if (!bus) {
    return (
      <p className="text-center text-red-600 text-xl mt-8">
        ❌ No Bus Details Found
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 px-3 py-6 flex justify-center">
      <div className="bg-white/90 w-full max-w-2xl rounded-2xl shadow-xl p-5 sm:p-8">

        {/* Header Section */}
        <div className="bg-blue-600 text-white rounded-xl p-5 shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <MdDirectionsBus className="text-3xl" />
            {bus.busNumber}
          </h2>

          <div className="flex items-center justify-between mt-4 text-base sm:text-lg font-medium">
            <span className="px-3 py-1 bg-white/20 rounded-lg text-center w-1/3">
              {bus.source}
            </span>

            <AiOutlineSwap className="text-2xl" />

            <span className="px-3 py-1 bg-white/20 rounded-lg text-center w-1/3">
              {bus.destination}
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-6 space-y-4 text-gray-800">

          <DetailRow
            icon={<MdAccessTime className="text-blue-600 text-xl" />}
            label="Time"
            value={bus.time}
          />

          <DetailRow
            icon={<MdDateRange className="text-blue-600 text-xl" />}
            label="Date"
            value={bus.date}
          />

          <DetailRow
            icon={<MdEventSeat className="text-blue-600 text-xl" />}
            label="Seats"
            value={bus.totalSeats}
          />

          <DetailRow
            icon={<span className="text-blue-600 text-xl">₹</span>}
            label="Price"
            value={`₹${bus.price || 500}`}
          />
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl 
                       text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 w-full sm:w-auto"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">
      <span className="flex items-center gap-3 font-medium">
        {icon}
        {label}
      </span>
      <span className="font-semibold text-blue-700">{value}</span>
    </div>
  );
}
