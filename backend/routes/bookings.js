import express from "express";
import auth from "../middleware/auth.js";
import { Booking } from "../models/Bookings.js";
import { Event } from "../models/Events.js";

const bookingRouter = express.Router();

bookingRouter.post("/", auth, async (req, res) => {
	try {
		const { eventId, seatsBooked } = req.body;

		if (!eventId || !seatsBooked) {
			return res.status(400).json({ message: "Please provide event and seats" });
		}

		const event = await Event.findById(eventId);
		if (!event) {
			return res.status(404).json({ message: "Event not found" });
		}

		if (seatsBooked > event.availableSeats) {
			return res.status(400).json({ message: "Not enough seats available" });
		}

		const totalAmount = seatsBooked * event.price;

		const booking = await Booking.create({
			userId: req.userId,
			eventId: event._id,
			seatsBooked,
			totalAmount,
		});

		event.availableSeats = event.availableSeats - seatsBooked;
		await event.save();

		return res.status(201).json({
			message: "Booking successful",
			booking,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to create booking", error: error.message });
	}
});

bookingRouter.get("/my", auth, async (req, res) => {
	try {
		const bookings = await Booking.find({ userId: req.userId })
			.populate("eventId", "title date venue")
			.sort({ bookingDate: -1 });

		return res.status(200).json({ bookings });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to fetch bookings", error: error.message });
	}
});

export default bookingRouter;
