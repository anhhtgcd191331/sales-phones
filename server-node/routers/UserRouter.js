import express from "express";
import {
  changePassword,
  deleteUser,
  getAllUser,
  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/UserController.js";
import { admin, protect } from "../middlewares/Auth.js";

const UserRouter = express.Router();

//****************Public Route******************
UserRouter.post("/add-user", registerUser);
UserRouter.post("/login", loginUser);

UserRouter.put("/update", protect, updateProfile);
UserRouter.delete("/delete/:id", protect, admin, deleteUser);
UserRouter.put("/password", protect, changePassword);

UserRouter.get("/", protect, admin, getAllUser);

export default UserRouter;
