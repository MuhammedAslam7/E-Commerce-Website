import { Cart } from "../model/cart.js";
import { Product } from "../model/product.js";
import {Address} from "../model/addressSchema.js"
import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";

export const userHome = async (req, res) => {
  try {
    const products = await Product.find({ listed: true })
      .sort({ createdAt: -1 })
      .limit(8)
      .select("productName description price thumbnailImage images");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const productPage = async (req, res) => {
  try {
    const products = await Product.find({ listed: true }).sort({
      createdAt: -1,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//////////////////////////////////////////
export const addToCart = async (req, res) => {
  const {userId} = req.user
  if(!userId) {
    return res.status(404).json({message: "User is not valid"})
  }

  const { productId, color } = req.body;
  console.log(productId, color)

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    
    let variant = product.variants.find((v) => v.color === color);

    if (variant.stock === 0) {
      return res.status(409).json({ message: "Selected color is out of stock" });
    }
    const variantId = variant._id


    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await new Cart({
        userId,
        items: [{ productId,variantId,  color }],
        totalPrice: product.price,
      });
    } else {
      let productExist = await cart.items.some(
        (item) => item.productId.toString() === productId &&
        item.color === color
      );
      if (productExist) {
        return res.status(409).json({
          message: "Item is already exist on the cart. Please check Your Cart",
        });
      }
      cart.items.push({ productId,variantId, color });

      cart.totalPrice += product.price;
    }
    await cart.save();
    res.status(200).json({ message: "Product Added to Cart. Go to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
/////////////////////////////////////////
export const cartItems = async (req, res) => {
  const { userId } = req?.query;

  try {
    const cart = await Cart.findOne({ userId })
      .populate(
        "items.productId",
        "productName description price thumbnailImage variants"
      )
      .exec();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }

    const items = await cart.items.map((item) => {
      const product = item.productId

      if(!product) return item

      const variant = product.variants.find((variant) => variant._id.toString() == item.variantId.toString())
      return {
        productId: product._id,
        productName: product?.productName,
        description: product?.description,
        price: product?.price,
        thumbnailImage: product?.thumbnailImage,
        color: item.color,
        quantity: item.quantity,
        variant: variant || {}
      };

    })


    res.status(200).json({
      cartId: cart._id,
      userId: cart.userId,
      items,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error)
  }
};
//////////////////////////////////////////////////////////
export const updateCartQuantity = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(404).json({ message: "User in not valid" });
  }
  const { productId, variantId, newQuantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const productInCart = await cart.items.find(
      (item) => item.productId.toString() == productId
    );
    if (!productInCart) {
      return res.status(404).json({ message: "Product not found in cart." });
    }
    const variantInCart = await cart.items.find((item) => item.variantId.toString() == variantId)
    if (!variantInCart) {
      return res.status(404).json({ message: "This products variant not found in cart." });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const difference = newQuantity - variantInCart.quantity;
    cart.totalPrice += product.price * difference;

    variantInCart.quantity = newQuantity;

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully.", cart });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};
///////////////////////////////////////////////////////////////////////

export const deleteCartItem = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(404).json({ message: "User in not valid" });
  }
  const { productId, variantId} = req?.body;
  console.log(productId, variantId)

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.variantId.toString() === variantId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart." });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    const removedItem = cart.items[itemIndex];
    cart.totalPrice -= removedItem.quantity * product.price;

    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.status(200).json({ message: "Product removed from cart.", cart });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};
//////////////////////////////////////////////
export const addAddress = async (req, res) => {
  const { userId } = req?.user;
  const { fullName, email, phone, country, state, city, landMark, pincode } =
    req.body.newAddress;

  try {
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "country",
      "state",
      "city",
      "landMark",
      "pincode",
    ];

    for (const field of requiredFields) {
      if (!req.body.newAddress[field]) {
        return res
          .status(400)
          .json({ message: `Missing required field: ${field}` });
      }
    }
    const newAddress =  new Address({
      userId,
      fullName,
      email,
      phone,
      country,
      state,
      city,
      landMark,
      pincode,
    });

    const savedAddress = await newAddress.save()

    res.status(200).json({
      message: "Address added successfully",

    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
///////////////////////////////////////////////////////
export const getAddress = async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    return res.status(400).json({ message: "User is not valid" });
  }
  try {
    const addresses = await Address.find({userId})

    res.status(200).json({
      message: "Address fetched successfully",
      addresses: addresses || [],
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
  }
};
////////////////////////////////////////////////////

export const updateAddress = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(400).json({ message: "User is not valid" });
  }
  const { id, updatedData } = req.body;

  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: id, userId }, 
      {
        $set: {
          fullName: updatedData.fullName,
          email: updatedData.email,
          phone: updatedData.phone,
          country: updatedData.country,
          state: updatedData.state,
          city: updatedData.city,
          landMark: updatedData.landMark,
          pincode: updatedData.pincode,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found or invalid user" });
    }

    res.status(200).json({
      message: "Address updated successfully",
      updatedAddress,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
/////////////////////////////////////////////////////////

export const deleteAddress = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.body;
  try {
    const deletedAddress = await Address.findByIdAndDelete({_id: id, userId})

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found or invalid user" });
    }

    res.status(200).json({
      message: "Address deleted successfully",
      deletedAddress,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
///////////////////////////////////////////////////////
export const changePassword = async (req, res) => {
  const { userId } = req.user;

  const { password, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const matchPassword = await bcryptjs.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Current Password is Incorrect" });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
/////////////////////////////////////////////////////////////
export const profileDetails = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(400).json({ message: "User is not valid" });
  }
  try {
    const user = await User.findById(userId, "username email phone");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
////////////////////////////////////////////////////////
export const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { username, email, phone } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User is not valid" });
  }
  try {
    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Sever Error" });
  }
};
