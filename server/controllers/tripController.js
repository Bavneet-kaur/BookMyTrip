import Trip from "../models/tripModel.js";

// create trip
export const createTrip = async (req, res) => {
    try {
        const { from, to, date, departureTime, arrivalTime, price, seats } = req.body;
        if (!from || !to || !date || !departureTime || !arrivalTime || !price || !seats) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const trip = await Trip.create({
            from,
            to,
            date,
            departureTime,
            arrivalTime,
            price,
            seats,
            createdBy: req.user._id,
        });

        res.status(201).json(trip);
    } catch (error) {
        console.error("Error creating trip:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//get all the trips
export const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find().sort({ createdAt: -1 });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch trips" });
    }
};

// get trip by ID
export const getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) return res.status(404).json({ message: "Trip not found" });
        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//delete trip
export const deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        await trip.deleteOne();
        res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
        console.error("Error deleting trip:", error);
        res.status(500).json({ message: "Server error" });
    }
};


//update trip
export const updateTrip = async (req, res) => {
    try {
        const { from, to, date, departureTime, arrivalTime, price, seats } = req.body;
        if (!from || !to || !date || !departureTime || !arrivalTime || !price || !seats) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        trip.from = from;
        trip.to = to;
        trip.date = date;
        trip.departureTime = departureTime;
        trip.arrivalTime = arrivalTime;
        trip.price = price;
        trip.seats = seats;
        const updatedTrip = await trip.save();
        res.json(updatedTrip);
    } catch (error) {
        console.error("Error updating trip:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//book seats
export const bookSeats = async (req, res) => {
    try {
        const { seatsToBook } = req.body;
        const trip = await Trip.findById(req.params.id);

        if (!trip) return res.status(404).json({ message: "Trip not found" });

        // Prevent already booked seats
        const conflicted = seatsToBook.some(seat => trip.bookedSeats.includes(seat));
        if (conflicted) {
            return res.status(400).json({ message: "One or more seats already booked" });
        }

        trip.bookedSeats.push(...seatsToBook);
        await trip.save();

        res.status(200).json({ bookedSeats: trip.bookedSeats });
    } catch (error) {
        res.status(500).json({ message: "Booking failed", error });
    }
};

