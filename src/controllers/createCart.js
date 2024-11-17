import { Cart } from "../models/cartSchema.js";

const createCart = async (req, res) => {
  try {
    const { user, product, inventory, quantity } = req.body;
    if ([user, product, inventory, quntity].some((field) => field === "")) {
      res.json("all fills required");
    }

    const isCart = await Cart.findOne({ user, inventory });
    console.log({ isCart });
    if (isCart) {
      const cart = await Cart.findByIdAndUpdate(
        { _id: isCart.id },
        { $inc: { quantity: 1 } },
        { new: true }
      );
    } else {
      const cart = await Cart.create({ user, product, inventory, quantity });
      res.json("cart crete");
    }
  } catch (error) {
    console.log("error categoryControllers", error.message);
  }
};
const updateQuntity = async (req, res) => {
  try {
    const { user, inventory, value } = req.body;
    if ([user, inventory, value].some((field) => field === "")) {
      res.send("all files required");
    }
    if (value === "plus") {
      const cart = await Cart.findOneAndUpdate(
        { user, inventory },
        { $inc: { quantity: 1 } },
        { new: true }
      );
      return res.json("value plus");
    } else if (value === "minus") {
      const cart = await Cart.findOneAndUpdate(
        { user, inventory },
        { $inc: { quantity: -1 } },
        { new: true }
      );
      return res.json("value minus");
    }
  } catch (error) {
    console.log(error, "updatequntity");
  }
};

export { createCart, updateQuntity };
