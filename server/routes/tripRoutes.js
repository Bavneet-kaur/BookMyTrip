import express from "express";
import { createTrip, getTrips, deleteTrip, updateTrip, bookSeats, getTripById } from "../controllers/tripController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Public: view all trips
router.get("/", getTrips);

// Protected: only admins can create trips
router.post("/", protect, adminOnly, createTrip);
router.route("/:id")
  .put(protect, adminOnly, updateTrip)
  .delete(protect, adminOnly, deleteTrip);
router.patch("/:id/book", bookSeats);
router.get("/:id", getTripById);
export default router;
