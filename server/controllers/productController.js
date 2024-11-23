import { Product } from "../model/product.js";
import { cloudinary } from "../utils/cloudinary.js";
import { Category } from "../model/category.js";
import fs from "fs";
import path from "path";
//////////////////////////////////////////////////////////
export const addProduct = async (req, res) => {
  try {
    const { productName, color, description, price, stock } = req.body;
    const imageUrls = [];
    console.log(productName, description, price, stock, color);

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "E-commerce-products",
      });
      imageUrls.push(result.secure_url);

      fs.unlinkSync(path.resolve(file.path));
    }

    const product = new Product({
      productName,
      description,
      price,
      totalStock: stock,
      // category,
      thumbnailImage: imageUrls[0],
      variants: [{ color, stock, images: imageUrls }],
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
};
/////////////////////////////////////////////////////////
export const getAllProducts = async (req, res) => {
  try {
    console.log("Product");
    const allProducts = await Product.find();

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Error on sending Products" });
  }
};
////////////////////////////////////////////////////////////
export const updateProductStatus = async (req, res) => {
  const { id } = req.params;
  const { listed } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { listed },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product Not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
///////////////////////////////////////////////////////////////////
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
///////////////////////////////////////////////////////////////
export const editProduct = async (req, res) => {
  const productData = req.body;
  console.log(req.files);
  console.log(productData);
  return res.status(200).json({ hsd: "fsdf" });
};
