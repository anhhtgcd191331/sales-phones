import express from "express";
import {
  addProduct,
  CommentProduct,
  deleteProduct,
  filterProductByType,
  getAllProduct,
  getProductById,
  PinCommentProduct,
  RateProduct,
  RepCommentProduct,
  updateProduct,
} from "../controllers/ProductController.js";
import { admin, protect } from "../middlewares/Auth.js";
import { upload } from "../untils/untils.js";

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProduct);
ProductRouter.get("/:type", filterProductByType);
ProductRouter.get("/detail/:id", getProductById);

ProductRouter.post("/rate/:id", RateProduct);
ProductRouter.post("/comment/:id", CommentProduct);
ProductRouter.post("/pin/comment/:id", PinCommentProduct);
ProductRouter.post("/rep/comment/:id", RepCommentProduct);

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
