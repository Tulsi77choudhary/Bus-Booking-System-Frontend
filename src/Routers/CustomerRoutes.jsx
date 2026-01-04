import Register from "../components/Auth/Register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Login from '../components/Auth/Login.jsx';
import Footer from "../components/Footer/Footer.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import BusList from "../components/BusList/BusList.jsx";
import BusDetails from "../components/BusList/BusDetails.jsx";
import Seats from "../components/Seats/SeatPage.jsx";
import NavigationMain from "../components/Navigation/Navigation.jsx";
import PassengerDetails from "../components/PassengerDetail/PassengerDetail.jsx";
import ReviewBooking from "../components/ReviewBooking/ReviewBooking.jsx";

export const CustomerRouters = () => {
  return (  
    <div>
      <div>
        <NavigationMain />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/" element={<HomePage/>}/>
        <Route path="/BusList" element={<BusList/>}></Route>
        <Route path="/seats/:busNumber" element={<Seats />} />
        {/* <Route path="/BusDetails" element={<BusDetails/>}></Route> */}
        <Route path="/passenger-details" element={<PassengerDetails />} />
        <Route path="/ReviewBooking" element={<ReviewBooking/>} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

