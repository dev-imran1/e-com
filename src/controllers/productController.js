
import { Product } from "../models/productModelSchema.js";
import { cloudinaryUpload } from "../services/cloudinary.js";

const createProduct = async (req, res) => {
    try {
        const { title, category, subCategory, slug } = req.body;
        const { thumbnail } = req.files
        console.log("thumnail",thumbnail)
        

        if ([title, slug, category, subCategory].some((field) => field === "")) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!thumbnail) {
            return res.json("thumnail required")
        }
        let newSlug
        if (!slug) {
            newSlug = title.replace(" ", "-").toLowerCase() + "-" + Date.now()
        } else {
            const isSlugUniqe = await Product.findOne({ slug })
            if (isSlugUniqe) {
                return res.json("slug must be unique")
            }
            newSlug = slug.replace(" ", "-").toLowerCase() + "-" + Date.now();
        }
        // const { path } = thumbnail[0]
        // const result = await cloudinaryUpload(path, slug, "product")
        let resultAll
        if (req.files?.gallery) {
            const { gallery } = req.files
            const allResolvePromisesCloudinary = gallery.map(async ({ path }) => {
               return await cloudinaryUpload(path, slug, "productGallery");
            });
            resultAll = await Promise.all(allResolvePromisesCloudinary)
        }
        // const product = new Product()
        // product.title = title
        // product.category = category
        // product.subCategory = subCategory
        // product.slug = newSlug
        // product.thumbnail = result.optimizeUrl
        // product.thumbnail.public_Id = result.uploadResult.public_id
        // await product.save()
        // res.json("product create", { product })
    } catch (error) {
        console.log(error.message)
    }
}

export { createProduct }


// // 46 minutes




// import { Product } from "../models/productModelSchema.js";
// import { cloudinaryUpload } from "../services/cloudinary.js";

// const createProduct = async (req, res) => {
//     try {
//         const { title, category, subCategory, slug } = req.body;
//         const { thumbnail } = req.files;

//         // Validate required fields
//         if ([title, category, subCategory].some((field) => !field)) {
//             return res.status(400).json({ error: "Title, Category, and SubCategory are required" });
//         }
//         if (!thumbnail) {
//             return res.status(400).json({ error: "Thumbnail is required" });
//         }

//         // Generate a unique slug
//         let newSlug;
//         if (!slug) {
//             newSlug = `${title.replace(/ /g, "-").toLowerCase()}-${Date.now()}`;
//         } else {
//             const isSlugUnique = await Product.findOne({ slug });
//             if (isSlugUnique) {
//                 return res.status(400).json({ error: "Slug must be unique" });
//             }
//             newSlug = `${slug.replace(/ /g, "-").toLowerCase()}-${Date.now()}`;
//         }

//         // Upload thumbnail to Cloudinary
//         const { path } = thumbnail[0];
//         const result = await cloudinaryUpload(path, newSlug, "product");

//         // Upload gallery images if provided
//         let galleryUrls = [];
//         if (req.files?.gallery) {
//             const { gallery } = req.files;
//             const galleryPromises = gallery.map(async (image) => {
//                 const galleryResult = await cloudinaryUpload(image.path, newSlug, "productGallery");
//                 return {
//                     url: galleryResult.optimizeUrl,
//                     publicId: galleryResult.uploadResult.public_id,
//                 };
//             });
//             galleryUrls = await Promise.all(galleryPromises);
//         }

//         // Save product data to the database
//         const product = new Product({
//             title,
//             category,
//             subCategory,
//             slug: newSlug,
//             thumbnail: {
//                 url: result.optimizeUrl,
//                 publicId: result.uploadResult.public_id,
//             },
//             gallery: galleryUrls,
//         });

//         await product.save();
//         res.status(201).json({ message: "Product created successfully", product });
//     } catch (error) {
//         console.error("Error creating product:", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// export { createProduct };
