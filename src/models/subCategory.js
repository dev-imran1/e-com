import mongoose, { Schema } from "mongoose";

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
        type: mongoose.Types.ObjectId,
        ref: "category"
    }
}, { timestamps: true })


const subcategory = mongoose.model("subcategory", subCategorySchema)