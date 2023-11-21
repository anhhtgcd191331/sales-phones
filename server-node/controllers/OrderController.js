import asyncHandler from "express-async-handler";
import OrderModel from "../models/OrderModel.js";
import axios from "axios";

const GetAllOrder = asyncHandler(async (req, res) => {
  try {
    const Order = await OrderModel.find({}).sort({ createdAt: -1 });
    if (Order) {
      res.json(Order);
    } else {
      res.status(401).json({ message: "no order" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const createOrder = asyncHandler(async (req, res) => {
  try {
    if (req.body.orderItems.length === 0) {
      res.json({ message: "Cart is emty" });
    } else {
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
        res.status(201).send({ message: "new order created", order: order });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const clientCancelOrder = asyncHandler(async (req, res) => {
  try {
    const updateOrder = await OrderModel.findById({ _id: req.params.id });

    if (updateOrder) {
      updateOrder.cancelOrder = true;
      await updateOrder.save();
    }
    res.json(updateOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  try {
    const updateOrder = await OrderModel.findById({ _id: req.params.id });
    let items = [];
    if (updateOrder) {
      items = updateOrder.orderItems?.map((x) => {
        return {
          name: x.name,
          code: "phonedemo",
          quantity: parseInt(x.qty),
          price: x.salePrice,
          weight: 12,
          length: 12,
          width: 12,
          height: 1200,
          category: {
            level1: "phone",
          },
        };
      });
    }

    console.log(items);

    const orderGhn = {
      payment_type_id: 2,
      note: "Demo test",
      required_note: "KHONGCHOXEMHANG",
      from_name: "Tien Anh",
      from_phone: "0705944385",
      from_address: "K1050 Ngo Quyen",
      from_ward_name: "An Hải Bắc",
      from_district_name: "Sơn Trà",
      from_province_name: "DN",
      return_name: "Hoang Tien Anh",
      return_phone: "0705944385",
      return_address: "K1050 Ngo Quyen",
      return_district_id: null,
      return_ward_code: "",
      client_order_code: "",
      return_ward_name: "An Hai Bac",
      return_district_name: "Quận Sơn Tra",
      return_province_name: "DN",
      to_name: updateOrder.name,
      to_phone: updateOrder.shippingAddress.phone,
      to_address: `${updateOrder.shippingAddress.province}, ${updateOrder.shippingAddress.district}, ${updateOrder.shippingAddress.ward}, ${updateOrder.shippingAddress.detail}`,
      to_ward_code: "20308",
      to_district_id: 1444,
      cod_amount:
        updateOrder.paymentMethod === "payOnline" ? 0 : updateOrder.totalPrice,
      content: "Theo New York Times",
      weight: 200,
      length: 1,
      width: 19,
      height: 10,
      cod_failed_amount: 2000,
      pick_station_id: 1444,
      deliver_station_id: null,
      insurance_value: 10,
      service_id: 0,
      service_type_id: 2,
      coupon: null,
      pick_shift: null,
      pickup_time: 1665272576,
      pick_shift: [2],
      items: items,
    };
    const headers = {
      "Content-Type": "application/json",
      ShopId: "4405018",
      Token: "4203512c-2ec6-11ee-a59f-a260851ba65c",
    };

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(orderGhn),
    };

    const data = fetch(
      "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    const order_code = data.order_code;
    updateOrder.order_code = order_code;
    await updateOrder.save();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PrintOrderGhn = asyncHandler(async (req, res) => {
  try {
    const Order = await OrderModel.findById({ _id: req.params.id });
    if (Order) {
      let token;
      try {
        const { data } = await axios.get(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token",
          {
            headers: {
              Token: "4203512c-2ec6-11ee-a59f-a260851ba65c",
            },
            params: {
              order_codes: Order.order_code,
            },
          }
        );

        token = data.data.token;
        Order.token = token;
        await Order.save();

        const result = await axios.get(
          `https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${token}`,
          {
            headers: {
              Token: "4203512c-2ec6-11ee-a59f-a260851ba65c",
            },
          }
        );
        res.send(result.config.url);
      } catch (error) {}
    } else {
      res.send({ message: "order not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const GetAllOrderPaypal = asyncHandler(async (req, res) => {
  try {
    const Order = await OrderModel.find({ paymentMethod: "payOnline" }).sort({
      createdAt: -1,
    });
    if (Order) {
      res.json(Order);
    } else {
      res.status(401).json({ message: "no order" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const GetAllOrderPendding = asyncHandler(async (req, res) => {
  try {
    const Order = await OrderModel.find({
      $or: [{ status: "pendding" }, { paymentMethod: "payOnline" }],
    }).sort({
      createdAt: -1,
    });
    if (Order) {
      res.json(Order);
    } else {
      res.status(401).json({ message: "no order" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const GetAllOrderShipping = asyncHandler(async (req, res) => {
  try {
    const Order = await OrderModel.find({ status: "shipping" }).sort({
      createdAt: -1,
    });
    if (Order) {
      res.send(Order);
    } else {
      res.status(401).send({ message: "no order" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const GetAllOrderPaid = asyncHandler(async (req, res) => {
  try {
    const Order = await OrderModel.find({ status: "paid" }).sort({
      createdAt: -1,
    });
    if (Order) {
      res.json(Order);
    } else {
      res.status(401).json({ message: "no order" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const DeleteOrder = asyncHandler(async (req, res) => {
  try {
    const deleteOrder = await OrderModel.findById({ _id: req.params.id });

    if (deleteOrder) {
      await OrderModel.deleteOne(deleteOrder);
      res.json({ message: "product deleted" });
    } else {
      res.json("error in delete order");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const ShippingProduct = asyncHandler(async (req, res) => {
  try {
    const status = "shipping";
    const Order = await OrderModel.findById({ _id: req.params.id });
    if (Order) {
      Order.status = status;
      await Order.save();
      res.json(Order);
    } else {
      res.status(401).json({ message: "no order" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PaidProduct = asyncHandler(async (req, res) => {
  try {
    const status = "paid";
    const Order = await OrderModel.findByIdAndUpdate(
      { _id: req.params.id },
      { status: status }
    );
    if (Order) {
      res.json(Order);
    } else {
      res.status(401).json({ message: "no order" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const GetOrderByUser = asyncHandler(async (req, res) => {
  try {
    const Order = await OrderModel.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (Order) {
      res.json(Order);
    } else {
      res.status(401).json({ message: "no order by user" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const GetOrderPaypalByUser = asyncHandler(async (req, res) => {
  try {
    const Order = await OrderModel.find({
      user: req.params.id,
      status: "payOnline",
    }).sort({ createdAt: -1 });
    if (Order) {
      res.json(Order);
    } else {
      res.status(401).json({ message: "no order by user" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const GetOrderPenddingByUser = asyncHandler(async (req, res) => {
  try {
    const Order = await OrderModel.find({
      user: req.params.id,
      status: "pendding",
    }).sort({ createdAt: -1 });
    if (Order) {
      res.json(Order);
    } else {
      res.status(401).json({ message: "no order by user" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const GetOrderPaidByUser = asyncHandler(async (req, res) => {
  try {
    const Order = await OrderModel.find({
      user: req.params.id,
      status: "paid",
    }).sort({ createdAt: -1 });
    if (Order) {
      res.json(Order);
    } else {
      res.status(401).json({ message: "no order by user" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const GetOrderShippingByUser = asyncHandler(async (req, res) => {
  try {
    const Order = await OrderModel.find({
      user: req.params.id,
      status: "shipping",
    }).sort({ createdAt: -1 });
    if (Order) {
      res.json(Order);
    } else {
      res.status(401).json({ message: "no order by user" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  GetAllOrder,
  createOrder,
  clientCancelOrder,
  updateOrder,
  GetOrderPaidByUser,
  GetOrderShippingByUser,
  GetOrderPenddingByUser,
  GetOrderPaypalByUser,
  GetOrderByUser,
  PaidProduct,
  ShippingProduct,
  DeleteOrder,
  GetAllOrderPaid,
  GetAllOrderShipping,
  GetAllOrderPendding,
  GetAllOrderPaypal,
  PrintOrderGhn,
};
