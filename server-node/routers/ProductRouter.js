import express from "express";
import {
  addProduct,
  deleteProduct,
  filterProductByType,
  getAllProduct,
  updateProduct,
} from "../controllers/ProductController.js";
import { admin, protect } from "../middlewares/Auth.js";
import { upload } from "../untils/untils.js";

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProduct);
ProductRouter.get("/:type", filterProductByType);

// private router admin
ProductRouter.post(
  "/add-product",
  upload.single("image"),
  protect,
  admin,
  addProduct
);
ProductRouter.put(
  "/update",
  upload.single("image"),
  protect,
  admin,
  updateProduct
);
ProductRouter.delete(
  "/delete/:id",
  upload.single("image"),
  protect,
  admin,
  deleteProduct
);

export default ProductRouter;
