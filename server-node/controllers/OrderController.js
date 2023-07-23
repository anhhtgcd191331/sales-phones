import asyncHandler from "express-async-handler";
import OrderModel from "../models/OrderModel";

const createOrder = asyncHandler(async (req, res) => {
  try {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: "Cart is emty" });
    }
    const order = await OrderModel.create({
      order_code: "",
      to_ward_code: req.body.to_ward_code,
      to_district_id: req.body.to_district_id,
      cancelOrder: false,

      orderItems: req.body.orderItems,
      shippingAddress: {
        province: req.body.shippingAddress.province,
        district: req.body.shippingAddress.district,
        ward: req.body.shippingAddress.ward,
        detail: req.body.shippingAddress.more,
        name: req.body.shippingAddress.name,
        phone: req.body.shippingAddress.phone,
      },
      paymentMethod: req.body.paymentMethod,
      paymentResult: req.body.paymentResult
        ? {
            id: req.body.paymentResult.id,
            status: req.body.paymentResult.status,
            update_time: req.body.paymentResult.update_time,
            email_address: req.body.paymentResult.payer.email_address,
          }
        : "",
      totalPrice: req.body.totalPrice,
      status: req.body.status ? req.body.status : "pendding",
      name: req.body.name,
      user: req.body.user,
    });
    if (order) {
      res.status(201).json({ message: "new order created", order: order });
    } else {
      res.status(400);
      throw new Error("Invalid order data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
