import { Order } from "../models/orderSchema.js";
import { Shipping } from "../models/shippingSchema.js";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (req, res) => {
  try {
    const {
      total,
      subTotal,
      name,
      address,
      city,
      distict,
      postcode,
      phone,
      email,
      shippingCost,
      paymentType,
      orderedProducts,
      isShipping,
      sname,
      saddress,
      scity,
      sdistict,
      spostcode,
      sphone,
      semail,
    } = req.body;

    const orderId = uuidv4();
    const orderDetails = new Order();
    if (isShipping) {
      const shippingDetails = await Shipping.create({
        sname,
        saddress,
        scity,
        sdistict,
        spostcode,
        sphone,
        semail,
      });
      orderDetails.user = req.user._id;
      orderDetails.user = orderId;
      orderDetails.total = total;
      orderDetails.subTotal = subTotal;
      orderDetails.name = name;
      orderDetails.address = address;
      orderDetails.city = city;
      orderDetails.distict = distict;
      orderDetails.postcode = postcode;
      orderDetails.phone = phone;
      orderDetails.email = email;
      orderDetails.isShipping = isShipping;
      orderDetails.shippingCost = shippingCost;
      orderDetails.paymentType = paymentType;
      orderDetails.orderedProducts = orderedProducts;
      orderDetails.shipping = shippingDetails._id;
      await orderDetails.save();
      return res.json(orderDetails);
    } else {
      orderDetails.user = req.user._id;
      orderDetails.user = orderId;
      orderDetails.total = total;
      orderDetails.subTotal = subTotal;
      orderDetails.name = name;
      orderDetails.address = address;
      orderDetails.city = city;
      orderDetails.distict = distict;
      orderDetails.postcode = postcode;
      orderDetails.phone = phone;
      orderDetails.email = email;
      orderDetails.shippingCost = shippingCost;
      orderDetails.paymentType = paymentType;
      orderDetails.orderedProducts = orderedProducts;
      await orderDetails.save();
      return res.json(orderDetails);
    }
  } catch (error) {
    console.log(error.message, "order controller error");
  }
};

export const allOrders = async (req, res) => {
  try {
    const allOrders = await Order.find()
      .populate("user")
      .populate("shipping")
      .populate("orderedProducts.product")
      .populate("orderedProducts.inventory")
      return res.json(allOrders)
  } catch (error) {
    return res.json(error.message)
  }
};
