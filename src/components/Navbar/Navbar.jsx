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
    <nav className="bg-blue-600 text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
      {/* Logo */}
      <h1 className="text-2xl font-bold">Bus Booking</h1>

      {/* Navigation links */}
      <div className="flex flex-wrap justify-center sm:justify-end gap-4 mt-2 sm:mt-0">

        <Link to="/" className="hover:underline hover:text-gray-200 transition">
          Home
        </Link>

        {/* Services — placeholder route */}
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
            className="bg-white text-blue-600 px-3 py-1 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Login
          </Button>
      </div>
    </nav>

    <AuthModel open={openAuthModal} handleClose={handleClose} />
    </>
  );
}
