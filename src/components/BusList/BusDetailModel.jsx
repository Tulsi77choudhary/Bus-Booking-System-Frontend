import React from "react";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "white",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export default function BusDetailModal({ open, handleClose, bus }) {
  if (!bus) return null;

  const [openSeatModel, setOpenSeatModel] = React.useState(false);

  const handleOpenSeatModel = () => {
    setOpenSeatModel(true);
    
  };

  const handleCloseSeatModel = () => {
    setOpenSeatModel(true);
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2 className="text-2xl font-bold mb-3">{bus.busNumber}</h2>

          <p><b>From:</b> {bus.source}</p>
          <p><b>To:</b> {bus.destination}</p>
          <p><b>Time:</b> {bus.time}</p>
          <p><b>Date:</b> {bus.date}</p>
          <p><b>Total Seats:</b> {bus.totalSeats}</p>
          <p><b>Price:</b> ₹{bus.price || 500}</p>

          <button
            onClick={handleOpenSeatModel}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Select Seats
          </button>
        </Box>
      </Modal>

      <SeatModel open={openSeatModel} handleClose={handleCloseSeatModel} />
    </>
  );
}
