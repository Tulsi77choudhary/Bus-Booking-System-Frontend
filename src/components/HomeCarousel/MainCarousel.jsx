import { useState } from "react";
import { searchBuses } from "../../State/Buses/Action";
import { useDispatch } from "react-redux";
import BusList from "../BusList/BusList";
import Buses from "../BusList/Buses";

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
        date,
      })
    );
    setShowBusList(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 px-4 flex justify-center items-start ">

      {!showBusList ? (
        <div className="w-full max-w-5xl">

          {/* TITLE */}
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center  sm:mt-24">
            Book Your Tickets
          </h2>

          {/* SEARCH CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <input
                type="text"
                placeholder="From (City)"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="text"
                placeholder="To (City)"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <button
                onClick={handleSearch}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-3 shadow"
              >
                Search
              </button>

            </div>
          </div>
          <Buses onSelectBus={(bus) => console.log(bus)} />
        </div>

      ) : selectedBus ? (
        <SeatSelection
          bus={selectedBus}
          goBack={() => setSelectedBus(null)}
        />
      ) : (
        <BusList
          from={from}
          to={to}
          date={date}
          onBusSelect={(bus) => setSelectedBus(bus)}
        />
      )}
      
    </div>
  );
}
