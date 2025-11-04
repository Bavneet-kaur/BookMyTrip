"use client";
import { useSearchParams } from "next/navigation";
import Button from "../components/Button";

export default function ConfirmationPage() {
  const params = useSearchParams();
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");
  const seats = params.get("seats");
  const fare = params.get("fare") || "USD 360.00";
  const departureTime = params.get("departureTime");
  const arrivalTime = params.get("arrivalTime");

  return (
    <div className="flex flex-col items-center justify-center py-16 min-h-[70vh]">
      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
        <span style={{ fontSize: 36 }}>✔️</span>
      </div>
      <div className="text-2xl font-bold mb-2 text-center">Booking Confirmed!</div>
      <div className="text-gray-600 text-center mb-8">Your trip is successfully booked. Enjoy your journey!</div>
      <div className="max-w-md w-full bg-white rounded-xl shadow p-6 mb-8">
        <div className="bg-blue-600 rounded-t-xl px-6 py-4 mb-3">
          <span className="text-white font-semibold text-lg">Flight Ticket</span>
          <span className="text-blue-100 block text-xs mt-1">
            Booking ID: #TXN{Math.floor(Math.random() * 900000 + 100000)}
          </span>
        </div>
        <div className="flex justify-between py-2">
          <div>
            <div className="font-bold text-2xl">{from || "LAX"}</div>
            <div className="text-xs text-gray-600">{departureTime || "09:30 AM"}</div>
            <div className="text-gray-400 text-sm">New York</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span style={{ fontSize: 20 }}>✈️</span>
            <span className="text-xs text-gray-400">
              {departureTime && arrivalTime ? (
                <>
                  {departureTime} - {arrivalTime}
                </>
              ) : "2h 30min"}
            </span>
          </div>
          <div>
            <div className="font-bold text-2xl">{to || "SFO"}</div>
            <div className="text-xs text-gray-600">{arrivalTime || "12:00 PM"}</div>
            <div className="text-gray-400 text-sm">Boston</div>
          </div>
        </div>
        <div className="flex justify-between mt-3 mb-2 text-sm">
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="font-semibold">Date</div>
            <div>{date}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="font-semibold">Seats</div>
            <div>{seats}</div>
          </div>
        </div>
        <div className="mt-4 mb-3 text-right font-bold text-green-600 text-lg">
          Total Fare Paid {fare}
        </div>
        <div className="flex justify-center mb-2">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=your-ticket-id-here" alt="QR code" className="rounded" />
        </div>
        <div className="text-center text-gray-500 text-sm mb-2">
          Scan this QR code at the boarding gate
        </div>
        <div className="flex gap-2 justify-center">
          <Button>Download Ticket</Button>
          <Button style={{ background: "#fff", color: "#2563eb", border: "1px solid #2563eb" }}>
            View Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}
