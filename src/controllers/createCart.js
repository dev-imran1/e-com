import { Cart } from "../models/cartSchema.js";
import apiResponse from "../utlis/ApiResponse.js";


const createCart = async (req, res) => {
  try {
    const { user, product, inventory, quantity } = req.body;
    if ([user, product, inventory, quantity].some((field) => field === "")) {
      return res.json(new apiResponse(400,"all fills required"));
    }

    const isCart = await Cart.findOne({ user, inventory });
    if (isCart) {
      const cart = await Cart.findByIdAndUpdate(
        { _id: isCart.id },
        { $inc: { quantity: 1 } },
        { new: true }
      );
    } else {
      const cart = await Cart.create({ user, product, inventory, quantity });
      return res.json(new apiResponse(200,"cart crete",{cart}));
    }
  } catch (error) {
   return res.json(new apiResponse({error}))
  }
};
const updateQuntity = async (req, res) => {
  try {
    const { user, inventory, value } = req.body;
    if ([user, inventory, value].some((field) => field === "")) {
      return res.json(new apiResponse(400,"all files required"));
    }
    if (value === "plus") {
      const cart = await Cart.findOneAndUpdate(
        { user, inventory },
        { $inc: { quantity: 1 } },
        { new: true }
      );
      return res.json(new apiResponse("value Plus"));
    } else if (value === "minus") {
      const cart = await Cart.findOneAndUpdate(
        { user, inventory },
        { $inc: { quantity: -1 } },
        { new: true }
      );
      return res.json(new apiResponse("value minus"));
    }
  } catch (error) {
    return res.json(new apiResponse({error}))
  }
};

export { createCart, updateQuntity };
