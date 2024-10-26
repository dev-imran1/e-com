import { Category } from "../models/categorySchema.js";
import { SubCategory } from "../models/subCategorySchema.js";

const subCategoryCreate = async (req, res) => {
    let newSlug
    try {
        const { name, slug, category } = req.body
        if (!(name && category)) {
            return res.json({ error: "name and categrit is required" });
        }

        if (!slug) {
            newSlug = name.replace(" ", "-").toLowerCase();
        } else {
            newSlug = slug.replace(" ", "-").toLowerCase();
        }

        // const existingCategory = await subCategory.findOne({ name });
        // if (existingCategory) {
        //     return res.status(400).send({ error: "Category name already exists" });
        // }
        const subCategory = await SubCategory.create({ name, slug: newSlug, category });
        await Category.updateOne({_id:category},{$push:{subCategory:subCategory._id}})
        // // Create a new category
        // await category.save()
        return res.json({ subCategory });

    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            return res.json({ error: "Category with this name or slug already exists" });
        }
        console.error("Error creating category:", error);
        return res.json({ error: "Internal Server Error" });
    }
};


const allSubCategroy = async (req,res) => {
    try {
        const data = await SubCategory.find().populate("category")
        return res.json({data})
        
    } catch (error) {
        console.log(error)
    }
}


export {subCategoryCreate,allSubCategroy} 