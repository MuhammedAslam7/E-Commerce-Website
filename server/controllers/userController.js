import { Product } from "../model/product.js";

export const userHome = async (req, res) => {
  try {
    console.log("hello");
    const products = await Product.find({ listed: true })
      .sort({ createdAt: -1 })
      .limit(8)
      .select("productName description price thumbnailImage images");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
