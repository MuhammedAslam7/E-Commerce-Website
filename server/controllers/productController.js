import { Product } from "../model/product.js";
import { cloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import path from "path";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const imageUrls = [];
    console.log(req.body);

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "E-commerce-products",
      });
      imageUrls.push(result.secure_url);


      fs.unlinkSync(path.resolve(file.path));
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      //   category,
      images: imageUrls,
      thumbnailImage: imageUrls[0],
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
};
