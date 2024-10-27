import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory"
    },
    inventroy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Inventroy"
        }
    ],
    thumbnail: {
        type: String
    },
    gallery: [
        {
            type: String
        }
    ],
    description: {
        type: String
    }

}, {
    timestamps: true
})

export const Product = mongoose.model("Product", productSchema)