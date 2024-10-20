// import { sub } from "../models/categorySchema.js";
import { SubCategory } from "../models/subCategorySchema.js";

export const subCategoryCreate = async (req, res) => {
    try {
        let newSlug
        const { name, slug,category} = req.body
        if (!name) {
            return res.status(400).send({ error: "Category name is required" });
        }

        if (!slug) {
            newSlug = name.replace(/\s+/g, "-").toLowerCase(); // Replace all spaces with hyphens
        } else {
            newSlug = slug.replace(/\s+/g, "-").toLowerCase();
        }

        const existingCategory = await subCategory.findOne({ name });
        if (existingCategory) {
            return res.status(400).send({ error: "Category name already exists" });
        }

        // Create a new category
        const subCategory = await SubCategory.create({ name, slug: newSlug });
        // await category.save()
        return res.status(201).send(subCategory,"subCategroycontrollers");

    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            return res.status(400).send({ error: "Category with this name or slug already exists" });
        }

        console.error("Error creating category:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};
