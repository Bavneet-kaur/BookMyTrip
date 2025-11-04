"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { IoAirplane } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CheckoutPage() {
    const params = useSearchParams();
    const tripId = params.get("id");
    const from = params.get("from");
    const to = params.get("to");
    const date = params.get("date");
    const seats = params.get("seats"); // e.g. "E5,E6"
    const price = params.get("price") || "180"; // Use the numeric price per ticket
    const departureTime = params.get("departureTime") || "10: 30";
    const arrivalTime = params.get("arrivalTime") || "18:00";
    const transport = params.get("transport") || "Flight";
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("card");

    const [form, setForm] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "9999999999",
        cardNumber: "4111 1111 1111 1111",
        cardholder: "",
        expiry: "12/28",
        cvv: "123"
    });
    const seatList = (seats || "").split(",").filter(Boolean);
    const totalFare = seatList.length * Number(price);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
        setForm(f => ({
            ...f,
            name: userData.name || f.name,
            email: userData.email || f.email,
            cardholder: userData.name || "guest"
            // phone: userData.phone || f.phone
        }));
    }, []);
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const bookingRes = await fetch(`http://localhost:5000/api/trips/${tripId}/book`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ seatsToBook: seatList }) // seatList is ["E5","E6"]
        });
        if (bookingRes.ok) {
            router.push(
                `/confirmation?from=${from}&to=${to}&date=${date}&departureTime=${departureTime}&arrivalTime=${arrivalTime}&seats=${seats}&price=${price}`
            );
        } else {
            alert("Booking failed, please try again.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Panel */}
            <div>
                <h2 className="text-lg font-bold mb-6">Checkout & Payment</h2>

                {/* Your Information */}
                <div className="bg-white rounded-xl shadow p-5 mb-6">
                    <h3 className="font-semibold mb-2">Your Information</h3>
                    <p className="text-gray-500 text-sm mb-4">
                        Please provide your contact details for this booking
                    </p>
                    <Input
                        label="Full Name"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Email Address"
                        name="email"
                        placeholder="Your Email Address"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Phone Number"
                        name="phone"
                        placeholder="Your Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-xl shadow p-5 mb-2">
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <div className="mb-3 flex flex-col gap-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={() => setPaymentMethod("card")}
                                style={{ marginRight: 8 }}
                            />
                            <span className="font-medium">Credit or Debit Card</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="wallet"
                                checked={paymentMethod === "wallet"}
                                onChange={() => setPaymentMethod("wallet")}
                                style={{ marginRight: 8 }}
                            />
                            <span className="font-medium">Digital Wallet (PayPal, Apple Pay)</span>
                        </label>
                    </div>

                    {/* Card Details */}
                    {paymentMethod === "card" && (
                        <>
                            <Input
                                label="Card Number"
                                name="cardNumber"
                                placeholder="**** **** **** ****"
                                value={form.cardNumber}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Cardholder Name"
                                name="cardholder"
                                placeholder="Name"
                                value={form.cardholder}
                                onChange={handleChange}
                                required
                            />
                            <div className="flex gap-4">
                                <Input
                                    label="Expiry Date"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={form.expiry}
                                    onChange={handleChange}
                                    required
                                    style={{ flex: 1 }}
                                />
                                <Input
                                    label="CVV"
                                    name="cvv"
                                    placeholder="***"
                                    value={form.cvv}
                                    onChange={handleChange}
                                    required
                                    type="password"
                                    style={{ flex: 1 }}
                                />
                            </div>
                        </>
                    )}
                </div>

            </div>

            {/* Right Panel */}
            <div className="bg-white rounded-xl shadow p-5 mb-2">
                <h3 className="font-semibold mb-2">Booking Summary</h3>
                <div className="flex items-center justify-center bg-gray-800 rounded mb-4 p-6">
                    <span style={{ fontSize: 36, color: "#fff" }}><IoAirplane /></span>
                </div>
                <div className="mb-2 flex justify-between">
                    <span className="text-gray-600">Route:</span>
                    <span className="font-medium">{from} &rarr; {to}</span>
                </div>
                <div className="mb-2 flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{date}</span>
                </div>
                <div className="mb-2 flex justify-between">
                    <span className="text-gray-600">Departure Time:</span>
                    <span className="font-medium">{departureTime}</span>
                </div>
                <div className="mb-2 flex justify-between">
                    <span className="text-gray-600">Arrival Time:</span>
                    <span className="font-medium">{arrivalTime}</span>
                </div>
                <div className="mb-2 flex justify-between">
                    <span className="text-gray-600">Transport:</span>
                    <span className="font-medium">{transport}</span>
                </div>
                <div className="mb-2 flex justify-between">
                    <span className="text-gray-600">Seats:</span>
                    <span className="font-medium">{seats}</span>
                </div>
                <hr className="my-4" />
                <div className="mb-4 flex justify-between items-center text-lg">
                    <span className="font-semibold">Total Fare:</span>
                    <span className="text-blue-600 font-bold">${totalFare}</span>
                </div>
                <Button
                    type="button"
                    onClick={async () => {
                        toast.success("Payment Successful!");
                        router.push(
                            `/confirmation?from=${from}&to=${to}&date=${date}&departureTime=${departureTime}&arrivalTime=${arrivalTime}&seats=${seats}&price=${price}`
                        );
                    }}
                >
                    Complete Payment
                </Button>
            </div>

        </div>
    );
}
