import mongoose, { Schema } from "mongoose";

const categroySchema = new Schema({
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
    subCategory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subcategory"
        }
    ]
}, { timestamps: true })


export const Category = mongoose.model("Category", categroySchema)
