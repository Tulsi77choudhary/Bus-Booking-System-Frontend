import { useState } from "react";
import bus from '../../assets/bus.avif';
import BusList from "../BusList/BusList";
import { searchBuses } from "../../State/Buses/Action";
import  {useDispatch} from 'react-redux';

export default function MainCarousel() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [selectedBus, setSelectedBus] = useState(null);
  const [showBusList, setShowBusList] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (!from || !to || !date) {
      alert("Please fill all fields!");
      return;
    }
    dispatch(
      searchBuses({
        source: from,
        destination: to,
        date: date,
      })
    );
    setShowBusList(true);
  };

  return (

    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4 flex justify-center items-start"
      // style={{backgroundImage: `url(${bus})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
      >

        {/* SEARCH AREA */}
        {!showBusList ? (
          <div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center">
              Book Your Bus Tickets
            </h2>

            {/* Responsive Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <input
                type="text"
                placeholder="From (City)"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="p-3 border rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />
              
              <input
                type="text"
                placeholder="To (City)"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="p-3 border rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-3 border rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none"
              />

              {/* Button always full-width on small screens */}
              <button
                onClick={handleSearch}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow text-base w-full"
              >
                Search
              </button>
            </div>
          </div>

        ) : selectedBus ? (
          <SeatSelection bus={selectedBus} goBack={() => setSelectedBus(null)} />
        ) : (
          <BusList from={from} to={to} date={date} onBusSelect={(bus) => setSelectedBus(bus)} />
        )}
        
      </div>
      
    </>
  );
}
