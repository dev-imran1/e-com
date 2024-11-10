import mongoose, { Schema } from "mongoose";


const inventorySchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    variation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variation"
    },
    purchasePrice: Number,
    sellingPrice: Number,

    discountPrice: {
        price: {
            type: Number,
        },
        typeOfDiscount: {
            type: String,
            enum: ["amount", "parcentage"]
        }
    },
    quantity:{
        type:Number
    }

}, {
    timestamps: true
})

export const Inventory = mongoose.model("Inventory", inventorySchema)