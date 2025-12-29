import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBuses } from "../../State/Buses/Action";
import { AiOutlineLeft, AiOutlineRight, AiOutlineSwap } from "react-icons/ai";

export default function Buses({ onSelectBus }) {
  const dispatch = useDispatch();
  const { loading, buses, error } = useSelector((state) => state.bus);
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(getAllBuses("", "", ""));
  }, [dispatch]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (loading) return null;
  if (error) return null;

  return (
    <div className="mt-20 w-full max-w-6xl mx-auto relative overflow-hidden">

      {/* TITLE */}
      <h3 className="text-2xl font-bold text-white mb-4 text-center">
        Popular Buses
      </h3>

      {/* LEFT BUTTON */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10
                   bg-white/20 hover:bg-white/40 p-2 rounded-full"
      >
        <AiOutlineLeft className="text-white text-xl" />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                   bg-white/20 hover:bg-white/40 p-2 rounded-full"
      >
        <AiOutlineRight className="text-white text-xl" />
      </button>

      {/* SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="
          flex
          gap-4
          overflow-hidden
          scroll-smooth
          no-scrollbar
          p-4
          pointer-events-none 
        "
      >
        {buses.map((bus, index) => (
          <div
            key={index}
            onClick={() => onSelectBus?.(bus)}
            className="
              min-w-[260px]
              bg-white/10
              border border-white/20
              rounded-xl
              p-4
              cursor-pointer
              hover:bg-white/20
              transition
              flex-shrink-0
            "
          >
            {/* Bus Number & Price */}
            <div className="flex justify-between items-center">
              <h4 className="text-white font-semibold">
                {bus.busNumber}
              </h4>
              <span className="text-green-400 font-bold">
                ₹{bus.price || 500}
              </span>
            </div>

            {/* Route */}
            <div className="flex justify-between items-center text-gray-300 mt-2 text-sm">
              <span>{bus.source}</span>
              <AiOutlineSwap />
              <span>{bus.destination}</span>
            </div>

            {/* Info */}
            <div className="flex justify-between text-xs text-gray-300 mt-3">
              <span>⏰ {bus.time}</span>
              <span>🪑 {bus.totalSeats}</span>
            </div>

            <button
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700
                         text-white py-2 rounded-md text-sm font-semibold"
            >
              View Seats
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
