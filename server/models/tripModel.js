import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
    {
        from: { type: String, required: true },
        to: { type: String, required: true },
        date: { type: String, required: true },
        departureTime: { type: String, required: true },
        arrivalTime: { type: String, required: true },
        price: { type: String, required: true },
        seats: { type: Number, required: true },
        bookedSeats: {
            type: [String], // e.g. ["A1", "A2"]
            default: [],
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
