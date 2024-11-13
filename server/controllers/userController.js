import { Product } from "../model/product.js";

export const userHome = async (req, res) => {
  try {
    console.log("hello");
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name description price thumbnailImage images");

    console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
