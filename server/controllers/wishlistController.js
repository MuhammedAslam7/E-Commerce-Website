import { Product } from "../model/product.js";
import { Wishlist } from "../model/wishlistSchema.js";

export const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(404).json({ message: "User in not valid" });
    }
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ userId: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: userId, items: [] });
    }

    const productExists = wishlist.items.some(
      (item) => item.productId.toString() === productId
    );

    if (productExists) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    wishlist.items.push({
      productId: product._id,
      addedAt: new Date(),
    });

    await wishlist.save();

    return res
      .status(201)
      .json({ message: "Product added to wishlist", wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};
///////////////////////////////////////////////////////////////////////////////
export const wishlist = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(404).json({ message: "User in not valid" });
  }
  try {
    const wishlist = await Wishlist.findOne({ userId: userId }).populate(
      "items.productId"
    );

    if (!wishlist) {
      return res.status(404).status({ message: "No wishlit found" });
    }

    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
////////////////////////////////////////////////////////////////////
export const removeWishlistItem = async (req, res) => {

  try {

    const { userId } = req.user;
  if (!userId) {
    return res.status(404).json({ message: "User is not valid" });
  }

  const { productId } = req.body;

  const wishlistForUser = await Wishlist.findOne({ userId });

  if (!wishlistForUser) {
    return res.status(404).json({ message: "No wishlist for this user" });
  }

  const updatedWishlist = await Wishlist.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId: productId } } },
    { new: true }
  );
  if (!updatedWishlist) {
    return res.status(404).json({ message: "Wishlist not found for the user." });
  }

  res.status(200).json({
    message: "Product removed from wishlist",
    wishlist: updatedWishlist,
  });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
  
};
