import asyncHandler from "express-async-handler";
import SelectListModel from "../models/SelectListModel.js";

const createOptionByProperty = asyncHandler(async (req, res) => {
  try {
    const SelectListItem = await SelectListModel.create({
      name: req.body.name,
      property: req.body.property,
      options: req.body.options,
    });
    if (SelectListItem) {
      res.status(201).send(SelectListItem);
    } else {
      res.status(400);
      throw new Error("Invalid data");
    }
  } catch (error) {}
});

export { createOptionByProperty };
