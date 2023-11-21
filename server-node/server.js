import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import session from "express-session";
import { connectDB } from "./config/db/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import UserRouter from "./routers/UserRouter.js";
import ProductRouter from "./routers/ProductRouter.js";
import ChatRouter from "./routers/ChatRouter.js";
import { ConnectSocket } from "./config/socket/socket.js";
import SelectListrouter from "./routers/SelectListRouter.js";
import ListTypeProductRouter from "./routers/ListTypeProductRouter.js";
import OrderRouter from "./routers/OrderRouter.js";
import PaymentRouter from "./routers/PaymentRouter.js";
import passport from "./controllers/PassportController.js";
import UserModel from "./models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "./middlewares/Auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  session({
    secret: "sales_phone",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());

ConnectSocket(server);
connectDB();

app.get("", (req, res) => {
  res.send("API is running>>>");
});

app.use("/api/users", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/chats", ChatRouter);
app.use("/api/select-list", SelectListrouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/type-products", ListTypeProductRouter);
app.use("/api/orders", OrderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      const email = user.email;
      const userLogin = await UserModel.findOne({ email });
      res.redirect(
        `http://localhost:3000/google/success?id=${userLogin._id}&name=${
          userLogin.name
        }&email=${userLogin.email}&address=${userLogin.address}&isAdmin=${
          userLogin.isAdmin
        }&isAdmin=${userLogin.isAdmin}&token=${generateToken(userLogin._id)}`
      );
    });
  })(req, res, next);
});

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
