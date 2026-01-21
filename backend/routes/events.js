import express from "express";
import { Event } from "../models/Events.js";

const eventRouter = express.Router();

eventRouter.get("/", async (req, res) => {
	try {
		const now = new Date();
		const events = await Event.find({ date: { $gt: now } }).sort({ date: 1 });
		return res.status(200).json({ events });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to fetch events", error: error.message });
	}
});

eventRouter.get("/:id", async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) {
			return res.status(404).json({ message: "Event not found" });
		}
		return res.status(200).json({ event });
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Failed to fetch event", error: error.message });
	}
});

export default eventRouter;
