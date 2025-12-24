import React, { useEffect, useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PassengerDetail from "../PassengerDetail/PassengerDetail";
import ReviewBooking from "../ReviewBooking/ReviewBooking";
import { getSeatsByBus, selectSeats } from "../../State/Seats/Action";
import { TOGGLE_SEAT } from "../../State/Seats/ActionType";

export default function SeatModel({ open, handleClose, bus }) {
  const dispatch = useDispatch();
  const { seats, loading, selectedSeats } = useSelector(state => state.seat);

  const [openModal, setOpenModal] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  

  useEffect(() => {
    if (open && bus) {
      console.log("Bus Number received 👉", bus);

      dispatch(getSeatsByBus(bus));

    }
  }, [open, bus, dispatch]);

  const toggleSeat = (seat) => {
    if (!seat.available) return;

    dispatch({
      type: TOGGLE_SEAT,
      payload: seat
    });
  };

  // ---------------- CONFIRM SEATS ----------------
  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }
    dispatch(selectSeats(bus, selectedSeats));
    setOpenModal(true);
  };

  return (
    <>
      {/* ---------------- SEAT SELECTION ---------------- */}
      <Modal open={open} onClose={handleClose}>
        <Box className="bg-white p-4 rounded-xl shadow-xl w-[90%] max-w-[450px] mx-auto mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Select Your Seats</h2>

          {loading && <p className="text-center">Loading seats...</p>}

          <div className="grid grid-cols-5 gap-3 justify-center mb-5">
            {Array.isArray(seats) && seats.length > 0 ? (
              seats.map((seat, index) => {
                if ((index + 1) % 5 === 3) return <div key={index} />;

                const isSelected = selectedSeats.some(s => s.seatNumber === seat.seatNumber);

                return (
                  <div
                    key={seat.seatNumber}
                    onClick={() => toggleSeat(seat)}
                    className={`w-10 h-10 flex items-center justify-center
                      rounded-lg cursor-pointer text-sm transition-all
                      ${!seat.available
                        ? "bg-red-500 text-white cursor-not-allowed"
                        : isSelected
                          ? "bg-blue-600 text-white scale-105"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                  >
                    {seat.seatNumber}
                  </div>
                );
              })
            ) : (
              !loading && <p className="col-span-5 text-center text-gray-600">No seats available</p>
            )}
          </div>

          <div className="text-sm mb-3">
            <p><b>Selected:</b> {selectedSeats.map(s => s.seatNumber).join(", ") || "None"}</p>
            <p><b>Total Fare:</b> ₹{selectedSeats.length * 500}</p>
          </div>

          <Button
            variant="contained"
            fullWidth
            onClick={handleConfirm}
            className="!bg-blue-600 hover:!bg-blue-700 !py-3"
          >
            Confirm Seats
          </Button>
        </Box>
      </Modal>

      {/* ---------------- PASSENGER DETAILS ---------------- */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[450px] mx-auto mt-10">
          <PassengerDetail selectedSeats={selectedSeats} />

          <Button
            fullWidth
            variant="contained"
            className="mt-4"
            onClick={() => {
              setOpenModal(false);
              setOpenReview(true);
            }}
          >
            Next
          </Button>
        </Box>
      </Modal>

      {/* ---------------- REVIEW ---------------- */}
      <Modal open={openReview} onClose={() => setOpenReview(false)}>
        <Box className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[450px] mx-auto mt-10">
          <ReviewBooking selectedSeats={selectedSeats} />
        </Box>
      </Modal>
    </>
  );
}
