import { Category } from "../models/categorySchema.js";
import { Inventory } from "../models/inventorySchema.js";
import { Product } from "../models/productModelSchema.js";
import { cloudinaryUpload } from "../services/cloudinary.js";

const createProduct = async (req, res) => {
  try {
    const { title, category, subCategory, slug } = req.body;
    const { thumbnail } = req.files;
    if ([title, slug, category, subCategory].some((field) => field === "")) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!thumbnail) {
      return res.json("thumnail required");
    }
    let newSlug;
    if (!slug) {
      newSlug = title.replace(" ", "-").toLowerCase() + "-" + Date.now();
    } else {
      const isSlugUniqe = await Product.findOne({ slug });
      if (isSlugUniqe) {
        return res.json("slug must be unique");
      }
      newSlug = slug.replace(" ", "-").toLowerCase() + "-" + Date.now();
    }
    const { path } = thumbnail[0];
    const result = await cloudinaryUpload(path, slug, "product");

    const product = new Product();
    if (req.files?.gallery) {
      let public_id;

      const { gallery } = req.files;
      const galleryImages = gallery.map((item) => item);

      for (let image of galleryImages) {
        public_id =
          image.filename + Date.now() + "-" + Math.round(Math.random() * 1e9);
        const uploadGalleryImage = await cloudinaryUpload(
          image.path,
          public_id,
          "product/gallery"
        );

        product.gallery.push({
          imagePath: uploadGalleryImage.optimizeUrl,
          public_Id: public_id,
        });
      }
    }
    product.title = title;
    product.category = category;
    product.subCategory = subCategory;
    product.slug = newSlug;
    product.thumbnail.imagePath = result.optimizeUrl;
    product.thumbnail.public_Id = result.uploadResult.public_id;
    await product.save();
    console.log(product);
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    Inventory.deleteMany({ product: id });
    Inventory.findByIdAndDelete({ _id: id });
    return res.send("product deleted");
  } catch (error) {
    console.log(error, "catch error in deleteProduct controller");
  }
};

const pagination = async (req, res) => {
  try {
    const { page, limit, category } = req.query;
    let filter = {};
    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id //buji nai
      }
    }

    const produts = await Product.find(filter).populate({path:"category",select:"name"})
    console.log(produts)
  } catch (error) {
    return res.json(error.message);
  }
  // try {
  //   const { page, limit } = req.query;
  //   let currentPage = 1;
  //   if (page < 1) {
  //     const baseUrl = limit || 2;
  //     const skip = Number(currentPage - 1) * baseUrl;
  //     const products = await Product.find().skip(skip).limit(baseUrl);
  //     const totalProductCount = await Product.countDocuments();
  //     const totalpage = await Math.ceil((totalProductCount/baseUrl))
  //     console.log(totalpage)
  //   } else {
  //     const baseUrl = limit || 2;
  //     const skip = Number(currentPage - 1) * baseUrl;
  //     const products = await Product.find().skip(skip).limit(baseUrl);
  //     const totalProductCount = await Product.countDocuments();
  //     // console.log(totalProductCount);
  //     const totalpage = await Math.ceil((totalProductCount/baseUrl))
  //     console.log(totalpage,'aaa')
  //   }
  // } catch (error) {
  //   console.log(error, "catch error in pagination controller");
  // }
};

export { createProduct, deleteProduct, pagination };
