import asyncHandler from "express-async-handler";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, address, phone } = req.body;
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
      address,
      phone,
      isAdmin: false,
    });
    if (user) {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { registerUser };
