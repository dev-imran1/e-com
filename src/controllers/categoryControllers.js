import { Category } from "../models/categorySchema.js";

export const categoryCreate = async (req, res) => {
    try {
        let newSlug
        const { name, slug } = req.body
        if (!name) {
            return res.status(400).json({ error: "Category name is required" });
        }
        if (!slug) {
            newSlug = name.replaceAll(" ", "-").toLowerCase();
        } else {
            newSlug = slug.replaceAll(" ", "-").toLowerCase();
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: "Category name already exists" });
        }
        const category = await Category.create({ name, slug: newSlug });
        return res.status(201).json({category});

    } catch (error) {
        console.log('error categoryControllers',error.message)
    }
}
