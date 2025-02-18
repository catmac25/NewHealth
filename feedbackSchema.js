const mongoose = require("mongoose");

const feedback = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    feedback: { type: String, required: true },
    servicesUsed: { type: [String], required: true }, // Stores selected options
    rating: { type: Number, required: true, min: 1, max: 5 } // Rating between 1-5
});
module.exports = mongoose.model("Feedback", feedback);