import { Category } from "../models/categorySchema.js";
import apiResponse from "../utlis/ApiResponse.js";

const categoryCreate = async (req, res) => {
  try {
    let newSlug;
    const { name, slug } = req.body;
    if (!name) {
      return res.json(new apiResponse(400, "Category Name Required"));
    }
    if (!slug) {
      newSlug = name.replaceAll(" ", "-").toLowerCase();
    } else {
      newSlug = slug.replaceAll(" ", "-").toLowerCase();
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json(new apiResponse(400, "Category name already exists"));
    }
    const category = await Category.create({ name, slug: newSlug });
    return res.json(new apiResponse(200, "Category Create", { category }));
  } catch (error) {
    console.log("error categoryControllers", error.message);
  }
};
const getCategory = async (_, res) => {
  const categories = await Category.find();
  return res.json(categories)
};
export { categoryCreate, getCategory };
