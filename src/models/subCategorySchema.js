import {mongoose, Schema } from "mongoose";

const subCategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
}, { timestamps: true })


export const SubCategory = mongoose.model("SubCategory", subCategorySchema)
