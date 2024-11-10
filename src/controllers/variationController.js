import { Variation } from "../models/variationSchema.js";

const createVariation = async (req, res) => {
  try {
    const { name } = req.body;
    const { variation } = await Variation.create({ name });
    return res.send(variation);
  } catch (error) {}
};

export { createVariation };
