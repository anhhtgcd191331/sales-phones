import express from "express";
import { registerUser } from "../controllers/UserController.js";

const router = express.Router();

//****************Public Route******************
//User
router.post("/users/add-user", registerUser);

export default router;
