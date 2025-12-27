import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBuses } from "../../State/Buses/Action";
import { AiOutlineSwap } from "react-icons/ai";
import BusDetailModal from "./BusDetailModel";
import SeatModel from "./SeatModel";

export default function BusList({ from, to, date }) {
  const dispatch = useDispatch();
  const { loading, buses, error } = useSelector((state) => state.bus);

  const [openModal, setOpenModal] = useState(false);
  const [seatModalOpen, setSeatModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    if (from && to && date) {
      dispatch(
        searchBuses({
          busNumber: "",
          source: from,
          destination: to,
          date: date,
        })
      );
    }
  }, [from, to, date, dispatch]);

  const handleOpenModal = (bus) => {
    setSelectedBus(bus);
    setOpenModal(true);

  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBus(null);
  };

  const handleOpenSeatModel = (bus) => {
    setSelectedBus(bus);
    setOpenModal(false);
    setSeatModalOpen(true);
  };

  const handleCloseSeatModel = () => {
    setSeatModalOpen(false);
    setSelectedBus(true);
  };

  if (loading) return <p className="text-white text-xl">Loading buses...</p>;
  if (error) return <p className="text-red-500 text-xl">{error}</p>;

  if (seatModalOpen) {
    return (
      <SeatModel
        open={seatModalOpen}
        handleClose={handleCloseSeatModel}
        bus={selectedBus?.busNumber}
      />
    );
  }
  return (
    <div className="bg-opacity-100 p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-xl mx-auto border border-gray-300 max-h-[60vh] sm:max-h-[500px]  overflow-y-auto">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-4">
        Available Buses
      </h2>

      {buses.length === 0 && (
        <p className="text-center text-gray-700 text-lg">
          ❌ No buses found for this route.
        </p>
      )}

      <div className="space-y-4 grid grid-cols-1 gap-4">
        {buses.map((bus, index) => (
          <div
            key={index}
            onClick={() => handleOpenSeatModel(bus)}
            className="border p-4 bg-gray-10 rounded-xl shadow cursor-pointer hover:bg-black-50 transition"
          >
            <h3 className=" flex justify-between text-xl font-semibold mt-3 text-gray-100">
              <span>{bus.busNumber}</span>
              <span>₹{bus.price || 500}</span>
            </h3>

            <h2 className="flex justify-between mt-3 text-2sm text-gray-700">
              <p>{bus.source}</p>
              <AiOutlineSwap className="text-xl text-gray-700" />
              <p>{bus.destination}</p>
            </h2>

            <div className="flex justify-between mt-3 text-sm text-gray-700">
              <p>⏰ {bus.time}</p>
              <p>🪑 {bus.totalSeats} Seats</p>
              <p>📅 {bus.date}</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal(bus);
              }}
              className="mt-3 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Bus Detail */}
      <BusDetailModal
        open={openModal}
        handleClose={handleCloseModal}
        bus={selectedBus}
      />
    </div>
  );
}
