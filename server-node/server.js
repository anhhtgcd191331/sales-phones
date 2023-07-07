import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import router from "./routers/Routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("", (req, res) => {
  res.send("API is running>>>");
});

app.use("/api", router);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
