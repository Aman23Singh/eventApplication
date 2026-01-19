import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Event", 
        required: true 
    },
    seatsBooked: { 
        type: Number, 
        required: true,
        min: [1, "Must book at least 1 seat"]
    },
    totalAmount: { 
        type: Number, 
        required: true 
    },
    bookingDate: { 
        type: Date, 
        default: Date.now 
    }
});

export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);