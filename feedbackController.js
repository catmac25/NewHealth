const Feedback = require("../models/feedbackSchema");
const User = require("../models/userSchema");
const getFeedback = async (req , res)=>{
    try {
        const userid = req.params.id;
        const userExists = await User.findById(userid);
        if (!userExists) {
            return res.status(404).json({ message: "Invalid credentials" });
        }
        
        const feedbacks = await Feedback.find({ user: userid });
        if (feedbacks.length === 0) {
            return res.status(404).json({ success: false, message: "No feedback found for this user" });
        }
        
        res.status(200).json({ success: true, message: "Feedback retrieved", data: feedbacks });
    } catch (error) {
        console.error("Error retrieving feedback:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const addFeedback = async (req, res) =>{
    const {email, firstName, lastName, feedback, selectedOptions, rating} = req.body;

    try{
        const user = await User.findOne({email});
        if (!user){
            return res.status(404).json({success:false, message: "User not found"});
        }

        const newFeedback = new Feedback (
            {
                user: user._id,
                firstName,
                lastName,
                feedback,
                services : selectedOptions,
                rating
            }
        );
        await newFeedback.save();
        res.status(201).json({success:true, message: "new feedback added"});
    }catch(error){
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

module.exports = {getFeedback, addFeedback};