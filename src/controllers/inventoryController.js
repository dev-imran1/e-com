import { Inventory } from "../models/inventorySchema.js";
import { Product } from "../models/productModelSchema.js";

const createInventory = async (req, res) => {
  try {
    const {product,variation,purchasePrice,sellingPrice,discountPrice,quantity} = req.body;
    if ([product, variation, purchasePrice, sellingPrice, discountPrice, quantity].some((field) => field === "")) {
      return res.json("All fields are required")
    }
    const inventory = await Inventory.create({product,variation,purchasePrice,sellingPrice,discountPrice,quantity})
    
    await Product.findByIdAndUpdate({_id:product}),{$push:{inventory:inventory._id}}

    return res.send(inventory)
  } catch (error) {
    console.log(error,'catch error in createInventory controller')
  }
};


const updateInventory = async (req, res) => {
  try {
    const {id} = req.params
    const {product,variation,purchasePrice,sellingPrice,discountPrice,quantity} = req.body;

    if ([product, variation, purchasePrice, sellingPrice, discountPrice, quantity].some((field) => field === "")) {
      return res.json("All fields are required")
    }
    
    const isFound = await Inventory.findById({_id:id})
    if (!isFound) {
      return res.json("Inventory not found")
    }
    const inventory = await Inventory.findByIdAndUpdate({_id:id},{$set:{product,variation,purchasePrice,sellingPrice,discountPrice,quantity}},{new:true})
    await Product.findByIdAndUpdate({_id:product}),{$push:{inventory:inventory._id}} //ager data theke jasse , notun kore add hosse
    return res.send(inventory)
  } catch (error) {
    console.log(error,'catch error in createInventory controller')
  }
};

const allInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate("product").populate("variation")
    return res.json(inventory)

  } catch (error) {
    
  }
};
const deleteInventory = async (req, res) => {
  try {
    const {id} = req.params
    const inventory = await Inventory.findByIdAndDelete({_id:id})
   return res.send("inventory deleted")
    // return res.json(inventory)

  } catch (error) {
    
  }
};

export { createInventory ,updateInventory,allInventory,deleteInventory};
