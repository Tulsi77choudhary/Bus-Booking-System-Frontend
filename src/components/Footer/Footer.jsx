import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-2">Online Ticket Booking</h3>
          <p className="text-sm text-gray-300">
            Book your bus tickets quickly and easily. Safe, secure, and convenient.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>Home</li>
            <li>Buses</li>
            <li>Contact</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-2">Contact</h3>
          <p className="text-gray-300 text-sm">Email: support@busbooking.com</p>
          <p className="text-gray-300 text-sm">Phone: +91 123 456 7890</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Online Ticket Booking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

