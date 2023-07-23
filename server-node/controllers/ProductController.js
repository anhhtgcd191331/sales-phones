import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary/cloudinary.js";
import ProductModel from "../models/ProductModel.js";
import { PinComment } from "../untils/untils.js";

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(400);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "cloudinary_phone",
    });
    const product = new ProductModel({
      name: req.body.name,
      price: req.body.price,
      salePrice: req.body.salePrice,
      amount: req.body.amount,
      type: req.body.type || "iphone",
      image: result.secure_url,
      cloudinary_id: result.public_id,
      rating: 0,

      os: req.body.os,
      ram: req.body.ram,
      battery: req.body.battery,
      rom: req.body.rom,
      camera: req.body.camera,
      special: req.body.special,
      design: req.body.design,
      screen: req.body.screen,
    });
    const newProduct = await product.save();
    if (newProduct) {
      res.status(201).send(newProduct);
    } else {
      res.status(400);
      throw new Error("Invalid product data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    amount,
    price,
    salePrice,
    type,
    os,
    ram,
    battery,
    rom,
    camera,
    special,
    design,
    screen,
  } = req.body;
  try {
    const product = await ProductModel.findById(req.body._id);
    await cloudinary.uploader.destroy(product.cloudinary_id);
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    if (product) {
      product.name = name || product.name;
      product.amount = amount || product.amount;
      product.price = price || product.price;
      product.salePrice = salePrice || product.salePrice;
      product.type = type || product.type;
      product.os = os || product.os;
      product.ram = ram || product.ram;
      product.image = result?.secure_url || product.image;
      product.rating = product.rating;
      product.cloulinary_id = result?.public_id || product.cloudinary_id;
      product.battery = battery || product.battery;
      product.rom = rom || product.rom;
      product.camera = camera || product.camera;
      product.special = special || product.special;
      product.design = design || product.design;
      product.screen = screen || product.screen;

      const updateProduct = await product.save();
      if (updateProduct) {
        res.json(updateProduct);
      }
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params);
    if (product) {
      await ProductModel.deleteOne(product);
      res.json({ message: "Product delete successfully" });
    } else {
      res.json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const filterProductByType = asyncHandler(async (req, res) => {
  try {
    const filterProductByType = await ProductModel.find({
      type: req.params.type,
    }).limit(5);

    res.json(filterProductByType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const RateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const existsUser = product.reviews.find((x) => x.name === req.body.name);
      if (existsUser) {
        res.json({ message: "You already rated this product" });
      } else {
        product.reviews.push(req.body);
        const updateProduct = await product.save();
        res.json(updateProduct);
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const CommentProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      product.comments.push(req.body);
      const updateCommentProduct = await product.save();
      res.send(updateCommentProduct);
    } else {
      res.status(400).send({ message: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const RepCommentProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const indexComment = product.comments.findIndex(
        (item) => item._id == req.body.idComment
      );
      product.comments[indexComment].replies.push(req.body);

      await product.save();
      res.json(product);
    } else {
      res.status(400).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PinCommentProduct = asyncHandler(async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const indexComment = product.comments.findIndex(
        (item) => item._id == req.body.idComment
      );
      product.comments[indexComment] = req.body;
      PinComment(product.comments, indexComment, 0);

      await product.save();
      res.send(product);
    } else {
      res.status(400).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  filterProductByType,
  deleteProduct,
  RateProduct,
  CommentProduct,
  RepCommentProduct,
  PinCommentProduct,
};
