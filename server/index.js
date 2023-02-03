require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const cityRouter = require("./routes/city");
const cors = require("cors");

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-weather.xjyca5q.mongodb.net/mern-weather?retryWrites=true&w=majority`
        );
        console.log("mongoDB connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/cities", cityRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
