import React, { useEffect, useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PassengerDetail from "../PassengerDetail/PassengerDetail";
import ReviewBooking from "../ReviewBooking/ReviewBooking";
import { getSeatsByBus, selectSeats } from "../../State/Seats/Action";

export default function SeatModel({ open, handleClose, busNumber }) {

  const dispatch = useDispatch();
  const { seats, loading } = useSelector(state => state.seat);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  // 🔥 LOAD SEATS WHEN MODAL OPENS
  useEffect(() => {
    if (open && busNumber) {
      dispatch(getSeatsByBus(busNumber));
    }
  }, [open, busNumber, dispatch]);

  console.log("Seats for selected bus 👉", seats);

  const toggleSeat = (seatNumber, available) => {
    if (!available) return;

    setSelectedSeats(prev =>
      prev.includes(seatNumber)
        ? prev.filter(s => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    // 🔥 SEND SELECTED SEATS TO BACKEND
    dispatch(selectSeats(busNumber, selectedSeats));
    setOpenModal(true);
  };

  return (
    <>
      {/* ---------------- SEAT SELECTION ---------------- */}
      <Modal open={open} onClose={handleClose}>
        <Box className="bg-white p-4 rounded-xl shadow-xl w-[90%] max-w-[450px] mx-auto mt-8">

          <h2 className="text-xl font-semibold mb-4 text-center">
            Select Your Seats
          </h2>

          {loading && <p className="text-center">Loading seats...</p>}

          <div className="grid grid-cols-5 gap-3 justify-center mb-5">
            {seats.map((seat, index) => {

              // aisle
              if ((index + 1) % 5 === 3) return <div key={index} />;

              return (
                <div
                  key={seat.seatNumber}
                  onClick={() => toggleSeat(seat.seatNumber, seat.available)}
                  className={`w-10 h-10 flex items-center justify-center
                    rounded-lg cursor-pointer text-sm transition-all
                    ${!seat.available
                      ? "bg-red-500 text-white cursor-not-allowed"
                      : selectedSeats.includes(seat.seatNumber)
                        ? "bg-blue-600 text-white scale-105"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                  {seat.seatNumber}
                </div>
              );
            })}
          </div>

          <div className="text-sm mb-3">
            <p><b>Selected:</b> {selectedSeats.join(", ") || "None"}</p>
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
