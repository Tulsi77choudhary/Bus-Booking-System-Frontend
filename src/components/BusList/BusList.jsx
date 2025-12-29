import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBuses } from "../../State/Buses/Action";
import { AiOutlineSwap } from "react-icons/ai";
import BusDetailModal from "./BusDetailModel";
import Seats from "../Seats/SeatPage.jsx";
import { useNavigate } from "react-router-dom";

export default function BusList({ from, to, date }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, buses, error } = useSelector((state) => state.bus);

  const [openModal, setOpenModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    if (from && to && date) {
      dispatch(
        searchBuses({
          busNumber: "",
          source: from,
          destination: to,
          date,
        })
      );
    }
  }, [from, to, date, dispatch]);

  const openSeat = (bus) => {
    navigate(`/seats/${bus.busNumber}`);
  };

  if (loading)
    return (
      <p className="text-center text-lg text-white mt-10">
        Loading buses...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        {error}
      </p>
    );

  return (
    <div className="px-3 sm:px-6 mt-6">

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-orange-400 text-center mb-6">
        Available Buses
      </h2>

      {/* No buses */}
      {buses.length === 0 && (
        <p className="text-center text-gray-400 mb-6">
          ❌ No buses found
        </p>
      )}

      {/* GRID CONTAINER */}
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4
        max-h-[70vh]
        
      "
      >
        {buses.map((bus, index) => (
          <div
            key={index}
            onClick={() => openSeat(bus)}
            className="
            bg-white/5
            border border-white/10
            rounded-lg
            p-4
            cursor-pointer
            hover:bg-white/10
            transition
          "
          >
            {/* Bus Number & Price */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">
                {bus.busNumber}
              </h3>
              <span className="text-green-400 font-bold">
                ₹{bus.price || 500}
              </span>
            </div>

            {/* Route */}
            <div className="flex justify-between items-center text-gray-400 mt-2 text-sm">
              <span>{bus.source}</span>
              <AiOutlineSwap />
              <span>{bus.destination}</span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mt-3">
              <p>⏰ {bus.time}</p>
              <p>🪑 {bus.totalSeats}</p>
              <p>📅 {bus.date}</p>
            </div>

            {/* Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedBus(bus);
                setOpenModal(true);
              }}
              className="
              mt-4
              w-full
              bg-indigo-500
              hover:bg-indigo-400
              text-white
              py-2
              rounded-md
              text-sm
              font-semibold
            "
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <BusDetailModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        bus={selectedBus}
      />
    </div>
  );

}
