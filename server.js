import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import path from 'path'
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ["https://deluxe-dragon-51cfa9.netlify.app"];
//const allowedOrigins=['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({ origin: allowedOrigins,  credentials: true })
);
// app.use(cors())

// define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//static file
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

//api
app.get("/", (req, res) => res.send("API Working Fine"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server running on ${port}`));
