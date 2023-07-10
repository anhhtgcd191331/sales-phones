import express from "express";
import {
  addProduct,
  filterProductByType,
  getAllProduct,
} from "../controllers/ProductController.js";
import { upload } from "../untils/untils.js";

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProduct);
ProductRouter.get("/:type", filterProductByType);

// private router admin
ProductRouter.post("/add-product", upload.single("image"), addProduct);

export default ProductRouter;
