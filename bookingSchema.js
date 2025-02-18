const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    appointmentType: {
        type: String, 
        enum: ["Routine-Checkup", "Personal Consultation",
            "Lab Appointments and Diagnostics", "Mental Health Consultation"
        ],
        required: true
    }, 
    date: {
        type: Date,  
        required: true
    },
    slot:{
        type : String, 
        required: true
    },
    query:{
        type: String, 
        default:""
    }
})

module.exports = mongoose.model("Appointment", appointmentSchema);