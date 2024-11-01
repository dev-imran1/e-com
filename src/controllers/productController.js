
import { Product } from "../models/productModelSchema.js";
import { cloudinaryUpload } from "../services/cloudinary.js";

const createProduct = async (req, res) => {
    try {


        const { title, category, subCategory, slug } = req.body;
        console.log(req.files);
        console.log(title, category, subCategory, slug)
        // const { thumbnail } = req.files
        // // console.log("thumnail",thumbnail)
        

        // if ([title, slug, category, subCategory].some((field) => field === "")) {
        //     return res.status(400).json({ error: "All fields are required" });
        // }

        // if (!thumbnail) {
        //     return res.json("thumnail required")
        // }
        // let newSlug
        // if (!slug) {
        //     newSlug = title.replace(" ", "-").toLowerCase() + "-" + Date.now()
        // } else {
        //     const isSlugUniqe = await Product.findOne({ slug })
        //     if (isSlugUniqe) {
        //         return res.json("slug must be unique")
        //     }
        //     newSlug = slug.replace(" ", "-").toLowerCase() + "-" + Date.now();
        // }
        // const { path } = thumbnail[0]
        // const result = await cloudinaryUpload(path, slug, "product")

        // let resultAll
        // if (req.files?.gallery) {
        //     const { gallery } = req.files
        //     const allResolvePromisesCloudinary = gallery.map(async ({ path }) => {
        //        return await cloudinaryUpload(path, slug, "productGallery");
        //     });
        //     resultAll = await Promise.all(allResolvePromisesCloudinary)
        // }
        // const product = new Product()
        // product.title = title
        // product.category = category
        // product.subCategory = subCategory
        // product.slug = newSlug
        // product.thumbnail.imagePath = result.optimizeUrl
        // product.thumbnail.public_Id = result.uploadResult.public_id
        // await product.save()
        // res.json("product create", { product })
    } catch (error) {
        console.log(error.message)
    }
}

export { createProduct }




// import { Product } from "../models/productModelSchema.js";
// import { cloudinaryUpload } from "../services/cloudinary.js";

// const createProduct = async (req, res) => {
//     try {
//         const { title, category, subCategory, slug } = req.body;
//         const { thumbnail } = req.files;
//         console.log("Uploaded files:", req.files);
//         // Validate required fields
//         if ([title, slug, category, subCategory].some((field) => !field)) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         // Validate thumbnail
//         if (!thumbnail || thumbnail.length === 0) {
//             return res.status(400).json({ error: "Thumbnail is required" });
//         }

//         // Generate unique slug if not provided
//         let newSlug;
//         if (!slug) {
//             newSlug = `${title.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}`;
//         } else {
//             const isSlugUnique = await Product.findOne({ slug });
//             if (isSlugUnique) {
//                 return res.status(400).json({ error: "Slug must be unique" });
//             }
//             newSlug = `${slug.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}`;
//         }

//         // Upload thumbnail
//         const { path: thumbnailPath } = thumbnail[0];
//         const thumbnailUploadResult = await cloudinaryUpload(thumbnailPath, newSlug, "product");

//         // Handle gallery uploads if provided
//         let galleryResults = [];
//         if (req.files?.gallery) {
//             const { gallery } = req.files;
//             const galleryUploadPromises = gallery.map(({ path }) => cloudinaryUpload(path, newSlug, "productGallery"));
//             galleryResults = await Promise.all(galleryUploadPromises);
//         }

//         // Create new product instance
//         const product = new Product({
//             title,
//             category,
//             subCategory,
//             slug: newSlug,
//             thumbnail: {
//                 url: thumbnailUploadResult.optimizeUrl,
//                 public_id: thumbnailUploadResult.uploadResult.public_id,
//             },
//             gallery: galleryResults,
//         });

//         // Save product to database
//         await product.save();

//         // Return response
//         res.status(201).json({ message: "Product created successfully", product });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: "An error occurred while creating the product" });
//     }
// };

// export { createProduct };

