require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./Routes/User");
const app = express();
app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200        
};

app.use(cors(corsOptions));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(3001)
        console.log("Connected")
    })
    .catch((err) => {
        console.log(err)
    })

    app.use("/users", userRoute)
