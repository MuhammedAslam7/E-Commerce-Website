import { Product } from "../model/product.js";
import { Category } from "../model/category.js";
import { Brand } from "../model/brand.js";
//////////////////////////////////////////////////////////
export const addProduct = async (req, res) => {
  try {
    const {
      productName,
      color,
      description,
      price,
      stock,
      categoryName,
      brandName,
      images,
    } = req.body;
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const brand = await Brand.findOne({ name: brandName });

    if (!brand) {
      return res.status(404).json({ message: "Brand Not found" });
    }

    const product = new Product({
      productName,
      description,
      price,
      totalStock: stock,
      category,
      brand,
      thumbnailImage: images[0],
      variants: [{ color, stock, images }],
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
};
/////////////////////////////////////////////////////////
export const addVariants = async (req, res) => {
  const { productId } = req.params;
  const { color, stock, images } = req.body.productData;
  console.log(productId, color, stock, images);

  if (!color || !stock || !images) {
    return res
      .status(400)
      .json({ message: "All fields are required for adding Variant" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $push: { variants: { color, stock, images } },
      },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res
      .status(200)
      .json({ message: "Varinat added Successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find()
      .populate("category")
      .populate("brand");

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
    const product = await Product.findById(id)
      .populate("category")
      .populate("brand");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(product);
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
/////////////////////////////////////////////////////////////////
export const getBrandAndCategory = async(req, res) => {
  try {
    
    const category = await Category.find({}, {name: 1, _id: 0})
    const brands = await Brand.find({}, {name: 1, _id: 0})


    res.status(200).json({message: "Brands and catagories",
       categories: category.map((category) => category.name),
        brands: brands.map((brand) => brand.name)})

  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
}
