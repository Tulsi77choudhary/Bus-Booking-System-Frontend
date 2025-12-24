import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { AuthModel } from "../Auth/AuthModel";


export default function Navbar() {
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  
  const handleOpen = () => {
    setOpenAuthModal(true);
  }
  const handleClose = () => {
    setOpenAuthModal(false);
  };

  return (
    <>
    <nav className="bg-blue-600 text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 overflow-x-auto">
      <h1 className="text-3xl font-bold">Bus Booking</h1>

      <div className="flex flex-center justify-center sm:justify-end gap-6 mt-2 sm:mt-0">

        <Link to="/" className="hover:underline hover:text-gray-200  transition">
          Home
        </Link>

        <Link to="/services" className="hover:underline hover:text-gray-200 transition">
          Services
        </Link>

        {/* History Page */}
        <Link to="/history" className="hover:underline hover:text-gray-200 transition">
          History
        </Link>

        {/* Contact */}
        <Link to="/contact" className="hover:underline hover:text-gray-200 transition">
          Contact
        </Link>

        {/* Login Button */}
        <Button
          onClick={handleOpen}
            className="bg-white text-blue-600 px-3 py-1 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Login
          </Button>
      </div>
    </nav>

    <AuthModel open={openAuthModal} handleClose={handleClose} />
    </>
  );
}
