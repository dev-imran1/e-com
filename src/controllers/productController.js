import { Product } from "../models/productModelSchema.js";

const createProduct = async (req, res) => {
    try {
        if (req.files?.gallery) {
            const {gallery} = req.files
            const all = await Promise.all(gallery)
            console.log(all)
        }else{
            console.log("null gallery nai")
        }
        // const { title, category, subCategory, slug } = req.body;
        // const { thumbnail } = req.files

        // if ([title, slug, category, subCategory].some((field) => field === "")) {
        //     return res.status(400).json({ error: "All fields are required" });
        // }

        // if (!thumbnail) {
        //     return res.json("thumnail required")
        // }
        // let newSlug
        // if (!slug) {

        //     newSlug = title.replaceAll(" ", "-").toLowerCase() + "-" +  Date.now()
        // } else {
        //     const isSlugUniqe = await Product.findOne({ slug })
        //     if (isSlugUniqe) {
        //         return res.json("slug must be unique")
        //     }
        //     newSlug = slug.replaceAll(" ", "-").toLowerCase() + "-" + Date.now();
        // }
        // const {path} = thumbnail[0]
        // console.log(path)
    } catch (error) {
        console.log(error.message)
    }
}

export { createProduct }  