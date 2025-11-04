"use client"
import React, { useEffect, useState } from "react";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import Input from "./components/Input";
import Button from "./components/Button";
import { useRouter } from "next/navigation";

const HomeBanner: React.FC = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [trips, setTrips] = useState<any[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/trips");
        const data = await res.json();
        setTrips(data);
        setFilteredTrips(data);
      } catch (err) {
        setTrips([]);
        setFilteredTrips([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Normalize values for case-insensitive comparison
    const dep = departure.trim().toLowerCase();
    const arr = arrival.trim().toLowerCase();
    const searchDate = date.trim();

    const results = trips.filter(trip =>
      (dep === "" || trip.from.toLowerCase().includes(dep)) &&
      (arr === "" || trip.to.toLowerCase().includes(arr)) &&
      (searchDate === "" || trip.date === searchDate)
    );

    setFilteredTrips(results);
  };

  return (
    <>
      {/* Home banner */}
      <div className="bg-[#eaf0fc] py-20 w-full">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Find Your Next Journey
          </h1>
          <p className="text-xl text-gray-600">
            Discover available trips and book your seats with ease.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <form
            className="bg-white rounded-xl shadow-xl px-8 py-10 flex flex-row flex-wrap gap-2 w-full max-w-5xl items-end"
            onSubmit={handleSearch}
          >
            <div className="flex flex-col  flex-1 min-w-[200px]">
              <label htmlFor="departure" className="text-gray-600 font-medium mb-1 text-left ml-1">From</label>
              <Input
                type="text"
                placeholder="Departure Location"
                value={departure}
                onChange={e => setDeparture(e.target.value)}
                name="departure"
              // required
              >
                <FiMapPin className="text-xl text-gray-400" />
              </Input>
            </div>

            <div className="flex flex-col  flex-1 min-w-[200px]">
              <label htmlFor="arrival" className="text-gray-600 font-medium mb-1 text-left ml-1">To</label>
              <Input
                type="text"
                placeholder="Arrival Location"
                value={arrival}
                onChange={e => setArrival(e.target.value)}
                name="arrival"
              // required
              >
                <FiMapPin className="text-xl text-gray-400" />
              </Input>
            </div>

            <div className="flex flex-col  flex-1 min-w-[200px]">
              <label htmlFor="date" className="text-gray-600 font-medium mb-1 text-left ml-1">Date</label>
              <Input
                type="text"
                placeholder="mm/dd/yyyy"
                value={date}
                onChange={e => setDate(e.target.value)}
                name="date"
              // required
              >
                <FiCalendar className="text-xl text-gray-400" />
              </Input>
            </div>
            <div className="flex -mb-2 items-center  min-w-[200px]">
              <Button type="submit">Search Trips</Button>
            </div>
          </form>
        </div>
      </div>

      {/* trip section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Available Trips</h2>
        {loading ? (
          <div className="flex justify-center items-center h-32 text-lg text-gray-500">Loading trips...</div>
        ) : filteredTrips.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-lg text-gray-500">No trips available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredTrips.map(trip => (
              <div key={trip._id} className="bg-white rounded-xl shadow-xl overflow-hidden">
                <img
                  src={trip.image || "https://static.vecteezy.com/system/resources/previews/010/170/350/non_2x/international-tourism-banner-with-travelers-characters-of-young-people-traveling-around-the-world-at-map-background-vacation-tour-and-journey-concept-flat-cartoon-illustration-free-vector.jpg"}
                  alt={`${trip.from} to ${trip.to}`}
                  className="h-40 w-full object-cover"
                />
                <div className="p-5">
                  <p className="font-semibold text-lg mb-1">{trip.from} &rarr; {trip.to}</p>
                  <div className="flex gap-3 text-gray-500 text-sm mb-1">
                    <span>Seats: {trip.seats}</span>
                    <span>Date: {trip.date}</span>
                  </div>
                  <div className="font-bold text-blue-600 text-xl mb-2">₹{trip.price}</div>
                  <Button
                    className="w-full"
                    onClick={() =>
                      router.push(
                        `/booking?id=${encodeURIComponent(trip._id)}&from=${encodeURIComponent(trip.from)}&to=${encodeURIComponent(trip.to)}&date=${encodeURIComponent(trip.date)}`
                      )
                    }
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </>


  );
};

export default HomeBanner;
