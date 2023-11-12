import express, { Request, Response } from "express";
const cors = require("cors");
import dotenv from "dotenv"
dotenv.config()
import connectDB from "../config/ormconfig";
connectDB
import parkSpotsRoutes from "./routes/parkSpotsRoutes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/parkSpots", parkSpotsRoutes);

const port = process.env.PORT || process.env.SERVER_PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})