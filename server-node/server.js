import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { connectDB } from "./config/db/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import UserRouter from "./routers/UserRouter.js";
import ProductRouter from "./routers/ProductRouter.js";
import ChatRouter from "./routers/ChatRouter.js";
import { ConnectSocket } from "./config/socket/socket.js";

dotenv.config();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

ConnectSocket(server);
connectDB();

app.get("", (req, res) => {
  res.send("API is running>>>");
});

app.use("/api/users", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/chats", ChatRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
