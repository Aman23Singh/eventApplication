import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },

    description: {
        type: String 
    },

    date: {
        type: Date,
        required: true
    },

    venue:{
        type: String,
        required: true 
    },

    totalSeats: {
        type: Number,
        required: true
    },

    availableSeats: {
        type: Number, required: true
    },

    price: {
        type: Number, 
        required: true 
    }
    
}, { timestamps: true });

export const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);