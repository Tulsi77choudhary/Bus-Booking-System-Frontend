import React, { useEffect, useState } from "react";
import { Modal, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PassengerDetail from "../PassengerDetail/PassengerDetail";
import ReviewBooking from "../ReviewBooking/ReviewBooking";
import { getSeatsByBus, selectSeats } from "../../State/Seats/Action";

export default function SeatModel({ open, handleClose, bus }) {
  const dispatch = useDispatch();
  const { seats, loading, selectedSeats } = useSelector(
    (state) => state.seat
  );

  const [openPassenger, setOpenPassenger] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  useEffect(() => {
    if (open && bus) {
      dispatch(getSeatsByBus(bus));
    }
  }, [open, bus, dispatch]);

  const handleSeatClick = async (seat) => {
    if (!seat.available) return;

    try {
      dispatch(selectSeats(bus, [seat])); 
    } catch (error) {
      console.error("Seat selection failed:", error);
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }
    setOpenPassenger(true);
  };

  return (
    <>
      {/* ================= SEAT SELECTION ================= */}
      <Modal open={open} onClose={handleClose}>
        <div className="fixed inset-0 flex items-center justify-center p-3 bg-black/40">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl
                    w-full max-w-md border border-gray-300
                    max-h-[70vh] sm:max-h-[500px]
                    overflow-y-auto">

            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
              Select Your Seats
            </h2>

            <h3 className="sm:text-lg font-semibold text-right mb-4 pr-4">
              Driver
            </h3>

            {loading && <p className="text-center">Loading seats...</p>}

            {/* Seats Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mb-5 justify-center">
              {Array.isArray(seats) && seats.length > 0 ? (
                seats.map((seat, index) => {
                  if ((index + 1) % 5 === 3) return <div key={index} />;

                  const isSelected = selectedSeats.some(
                    (s) => s.seatNumber === seat.seatNumber
                  );

                  return (
                    <div
                      key={seat.seatNumber}
                      onClick={() => handleSeatClick(seat)}
                      className={`
                        w-9 h-9 sm:w-12 sm:h-12
                        flex items-center justify-center
                        rounded-md text-xs sm:text-sm font-semibold
                        cursor-pointer transition-all
                        ${!seat.available
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : isSelected
                            ? "bg-blue-600 text-white scale-110 ring-2 ring-blue-300"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }
                      `}
                    >
                      {seat.seatNumber}
                    </div>
                  );
                })
              ) : (
                !loading && (
                  <p className="col-span-5 text-center text-gray-600">
                    No seats available
                  </p>
                )
              )}
            </div>

            {/* Summary */}
            <div className="text-sm mb-4">
              <p>
                <b>Selected:</b>{" "}
                {selectedSeats.map((s) => s.seatNumber).join(", ") || "None"}
              </p>
              <p>
                <b>Total Fare:</b> ₹{selectedSeats.length * 500}
              </p>
            </div>

            <Button
              fullWidth
              variant="contained"
              onClick={handleConfirm}
              className="!bg-blue-600 hover:!bg-blue-700 !py-3"
            >
              Confirm Seats
            </Button>

          </div>
        </div>
      </Modal>

      {/* ================= PASSENGER DETAILS ================= */}
      <Modal open={openPassenger} onClose={() => setOpenPassenger(false)}>
        <div className="fixed inset-0 flex items-center justify-center p-3 bg-black/40">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl
                          max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <PassengerDetail selectedSeats={selectedSeats} />

            <Button
              fullWidth
              variant="contained"
              className="mt-4"
              onClick={() => {
                setOpenPassenger(false);
                setOpenReview(true);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>

      {/* ================= REVIEW BOOKING ================= */}
      <Modal open={openReview} onClose={() => setOpenReview(false)}>
        <div className="fixed inset-0 flex items-center justify-center p-3 bg-black/40">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl
                          max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <ReviewBooking selectedSeats={selectedSeats} />
          </div>
        </div>
      </Modal>
    </>
  );
}
