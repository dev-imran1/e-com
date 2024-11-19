import mongoose, { Schema } from "mongoose";

const shippingSchema = new Schema(
  {
    sname: String,
    scountry: {
      type: String,
      default: "bangladesh",
    },
    saddress: String,
    scity: String,
    sdistict: String,
    spostcode: String,
    sphone: String,
    semail: String,
    // shippingCost: Number,
  },
  {
    timestamps: true,
  }
);

export const Shipping = mongoose.model("Shipping", shippingSchema);
