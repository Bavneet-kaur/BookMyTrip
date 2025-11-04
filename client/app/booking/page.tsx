"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const defaultSeatRows = ["A", "B", "C", "D", "E", "F"];
const seatsPerRow = 6;
function generateSeatLabels(numSeats: number) {
    const rows = defaultSeatRows.slice(0, Math.ceil(numSeats / seatsPerRow));
    let labels: string[] = [];
    for (let i = 0; i < rows.length; i++) {
        for (let j = 1; j <= seatsPerRow; j++) {
            let seatNum = i * seatsPerRow + j;
            if (seatNum > numSeats) break;
            labels.push(`${rows[i]}${j}`);
        }
    }
    return labels;
}
export default function BookingPage() {
    const params = useSearchParams();
    const tripId = params.get("id");
    const from = params.get("from");
    const to = params.get("to");
    const date = params.get("date");
    const [trip, setTrip] = useState<any>(null);
    const [selected, setSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        // Get trip info and booked seats from backend
        async function fetchTrip() {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/trips/${tripId}`);
            const data = await res.json();
            setTrip(data);
            setLoading(false);
        }
        fetchTrip();
    }, [tripId]);
    if (loading || !trip) return <div>Loading trip...</div>;
    const seatLabels = generateSeatLabels(trip.seats);
    const isBooked = (seat: string) => trip.bookedSeats?.includes(seat);
    const isSelected = (seat: string) => selected.includes(seat);
    const handleSeatClick = (seat: string) => {
        if (isBooked(seat)) return;
        if (isSelected(seat)) {
            setSelected(selected.filter(s => s !== seat));
        } else {
            setSelected([...selected, seat]);
        }
    }
    const rows = [];
    for (let i = 0; i < seatLabels.length; i += seatsPerRow) {
        rows.push(seatLabels.slice(i, i + seatsPerRow));
    }
    return (
        <div className="max-w-7xl mx-auto py-20">
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b" alt="Trip" className="rounded-xl mt-8 w-full h-60 object-cover mb-6" />
            <div className="bg-white rounded-xl shadow p-6 mb-5">
                <h2 className="text-xl font-semibold mb-2">Trip Details</h2>
                <div className="flex justify-between">
                    <div>
                        <div className="font-semibold">From</div>
                        <div>{from}</div>
                    </div>
                    <div>
                        <div className="font-semibold">To</div>
                        <div>{to}</div>
                    </div>
                    <div>
                        <div className="font-semibold">Date</div>
                        <div>{date}</div>
                    </div>
                    {/* Add more fields/time/price dynamically */}
                </div>
                <div className="mt-4 text-blue-500 font-bold text-xl">Fare per seat: $48.00</div>
            </div>
            {/* Add seat selector and other UI as per your attached image */}
            <div className="bg-white rounded-xl shadow p-6 mb-5">
                <h3 className="font-semibold mb-2">Select Your Seat</h3>
                <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-2 items-center">
                    <div className="mb-2 font-semibold text-gray-700 text-center">
                        Deluxe Cabin
                    </div>
                    {rows.map((row, i) => (
                        <div key={i} className="flex gap-3 mb-1">
                            {row.map(seat => (
                                <button
                                    key={seat}
                                    className={`w-10 h-10 rounded 
                    ${isBooked(seat) ? "bg-red-200 text-gray-500 cursor-not-allowed" : ""}
                    ${isSelected(seat) ? "bg-blue-500 text-white" : "bg-gray-100"}
                    border font-semibold`}
                                    disabled={isBooked(seat)}
                                    onClick={() => handleSeatClick(seat)}
                                >
                                    {seat}
                                </button>
                            ))}
                        </div>
                    ))}
                    <div className="flex gap-4 mt-2">
                        <span><span className="inline-block w-4 h-4 bg-gray-100 border mr-1" /> Available</span>
                        <span><span className="inline-block w-4 h-4 bg-red-200 mr-1" /> Booked</span>
                        <span><span className="inline-block w-4 h-4 bg-blue-500 mr-1" /> Selected</span>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow p-5 mb-4">
                <div className="font-semibold text-gray-800 mb-2">Selected Seats</div>
                {selected.length === 0 ? "None" : selected.join(", ")}
            </div>
            <div className="flex w-64 justify-center text-center">
                <Button
                    onClick={() => {
                        // After PATCH booking to backend, navigate to checkout with seat info
                        router.push(
                            `/checkout?id=${tripId}&from=${from}&to=${to}&date=${date}&seats=${selected.join(",")}`
                        );
                    }}
                    disabled={selected.length === 0}
                >
                    Confirm Booking
                </Button>
            </div>
        </div>

    );
}
