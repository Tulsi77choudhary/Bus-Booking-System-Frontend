import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import PassengerDetail from "../PassengerDetail/PassengerDetail";
import ReviewBooking from "../ReviewBooking/ReviewBooking";

export default function SeatModel({ open, handleClose, onSelect }) {
  const totalSeats = 40;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  const toggleSeat = (seatNo) => {
    let updated = [...selectedSeats];
    if (updated.includes(seatNo)) {
      updated = updated.filter((s) => s !== seatNo);
    } else {
      updated.push(seatNo);
    }
    setSelectedSeats(updated);
    onSelect && onSelect(updated);
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    setOpenModal(true);
  };

  const handleNext = () => {
    setOpenModal(false);
    setOpenReview(true);
  };

  return (
    <>
      {/* ---------------- Seat Selection Modal ---------------- */}
      <Modal open={open} onClose={handleClose}>
        <Box className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[450px] mx-auto mt-10 sm:mt-20">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
            Select Your Seats
          </h2>

          <div className="grid grid-cols-5 sm:grid-cols-5 gap-3 mb-5 justify-center">
            {[...Array(totalSeats)].map((_, i) => {
              const seatNo = i + 1;
              const isSelected = selectedSeats.includes(seatNo);

              return (
                <div
                  key={seatNo}
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer 
                    rounded-lg border text-sm sm:text-base transition-all
                    ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-700 shadow-md scale-105"
                        : "bg-gray-200 text-black border-gray-400 hover:bg-gray-300"
                    }
                  `}
                  onClick={() => toggleSeat(seatNo)}
                >
                  {seatNo}
                </div>
              );
            })}
          </div>

          <div className="text-sm sm:text-base mb-4">
            <p><b>Selected Seats:</b> {selectedSeats.join(", ") || "None"}</p>
            <p><b>Total Fare:</b> ₹{selectedSeats.length * 500}</p>
          </div>

          <Button
            variant="contained"
            fullWidth
            onClick={handleConfirm}
            className="!bg-blue-600 hover:!bg-blue-700 !py-3 !text-md"
          >
            Confirm Seats
          </Button>
        </Box>
      </Modal>

      {/* ---------------- Passenger Details Modal ---------------- */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[450px] mx-auto mt-10 sm:mt-20">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
            Passenger Details
          </h2>

          <PassengerDetail selectedSeats={selectedSeats} />

          <Button
            variant="contained"
            fullWidth
            onClick={handleNext}
            className="!bg-blue-600 hover:!bg-blue-700 !py-3 !text-md mt-4"
          >
            Next
          </Button>
        </Box>
      </Modal>

      {/* ---------------- Review Booking Modal ---------------- */}
      <Modal open={openReview} onClose={() => setOpenReview(false)}>
        <Box className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-[450px] mx-auto mt-10 sm:mt-20">
          <ReviewBooking selectedSeats={selectedSeats} />
        </Box>
      </Modal>
    </>
  );
}
