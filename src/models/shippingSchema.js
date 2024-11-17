import mongoose, { Schema } from "mongoose";

const shippingSchema = new Schema(
  {
    name: String,
    country: {
      type: String,
      default: "bangladesh",
    },
    address: String,
    city: String,
    distict: String,
    postcode: String,
    phone: String,
    email: String,
    shippingCost: Number,
  },
  {
    timestamps: true,
  }
);
