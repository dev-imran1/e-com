import { Order } from "../models/orderSchema.js";
import { Shipping } from "../models/shippingSchema.js";

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

      (orderDetails.total = total),
        (orderDetails.subTotal = subTotal),
        (orderDetails.name = name),
        (orderDetails.address = address),
        (orderDetails.city = city),
        (orderDetails.distict = distict),
        (orderDetails.postcode = postcode),
        (orderDetails.phone = phone),
        (orderDetails.email = email),
        (orderDetails.shippingCost = shippingCost),
        (orderDetails.paymentType = paymentType),
        (orderDetails.orderedProducts = orderedProducts),
        (orderDetails.shipping = shippingDetails._id);
      await orderDetails.save();
      return res.json(orderDetails);
    } else {
      (orderDetails.total = total),
        (orderDetails.subTotal = subTotal),
        (orderDetails.name = name),
        (orderDetails.address = address),
        (orderDetails.city = city),
        (orderDetails.distict = distict),
        (orderDetails.postcode = postcode),
        (orderDetails.phone = phone),
        (orderDetails.email = email),
        (orderDetails.shippingCost = shippingCost),
        (orderDetails.paymentType = paymentType),
        (orderDetails.orderedProducts = orderedProducts),
        (orderDetails.shipping = shippingDetails._id);
      await orderDetails.save();
      return res.json(orderDetails);
    }
  } catch (error) {
    console.log(error, "order controller error");
  }
};
