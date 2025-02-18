const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./Routes/auth.js");
const userRoute = require("./Routes/user.js");
const feedbackRoute = require("./Routes/feedback.js");

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
// middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors()); //frontend access backend
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/feedback',feedbackRoute);
app.get('/', (req,res)=>{
    res.send("server is started");
})
mongoose.connect ("mongodb://127.0.0.1:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("MongoDB connected locally"))
.catch(err=>console.error(err));

app.listen(port, ()=>{
    console.log("server started")
});