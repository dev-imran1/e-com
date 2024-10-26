import { Category } from "../models/categorySchema.js";

export const categoryCreate = async (req, res) => {
    try {
        let newSlug
        const { name, slug } = req.body
        if (!name) {
            return res.status(400).json({ error: "Category name is required" });
        }

        if (!slug) {
            newSlug = name.replace(/\s+/g, "-").toLowerCase(); // Replace all spaces with hyphens
        } else {
            newSlug = slug.replace(/\s+/g, "-").toLowerCase();
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: "Category name already exists" });
        }

        
        // Create a new category
        const category = await Category.create({ name, slug: newSlug });
        await category.save()
        return res.status(201).json({category});

    } catch (error) {
        console.log('error cacon',error.message)
    }
}
