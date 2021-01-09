const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const authRoutes = require("./routes/auth")
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const { signup,signin } = require("./controllers/auth");


app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

//middlewares

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());








//mongoose connection
const MONGODB_URL = 'mongodb+srv://Sayan_2000:Sayan2000@cluster0.elf4d.mongodb.net/test_DB?retryWrites=true&w=majority';


mongoose.connect( "mongodb://localhost/test_login_DB",{

    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {

    console.log("Mongoose is connected");
});






 //routes
app.get("/homepage", (req,res) => {
    res.sendFile(__dirname +"/index.html");
})

app.get("/signup", (req,res) => {
    res.sendFile(__dirname +"/signup.html");
})

app.get("/signin", (req,res) => {
    res.sendFile(__dirname +"/signin.html");
})

app.get("/venues", (req,res) => {
    res.sendFile(__dirname +"/venues.html");
})



app.post("/signup", signup)
app.post("/signin", signin)





app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})