import express from "express";
import { createOptionByProperty } from "../controllers/SelectListController.js";

const SelectListrouter = express.Router();

SelectListrouter.post("/create", createOptionByProperty);

export default SelectListrouter;
