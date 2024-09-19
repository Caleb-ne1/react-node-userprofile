require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./Routes/User");
const app = express();
app.use(express.json())
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(3001)
        console.log("Connected")
    })
    .catch((err) => {
        console.log(err)
    })

    app.use("/users", userRoute)
