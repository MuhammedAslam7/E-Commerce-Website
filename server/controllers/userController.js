import { Cart } from "../model/cart.js";
import { Product } from "../model/product.js";
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
  const { productId, userId } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await new Cart({
        userId,
        items: [{ productId }],
        totalPrice: product.price,
      });
    } else {
      let productExist = await cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (productExist) {
        console.log("Product exist");
        return res.status(409).json({
          message: "Item is already exist on the cart. Please check Your Cart",
        });
      }
      cart.items.push({ productId });

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
    const cartItems = await Cart.findOne({ userId })
      .populate(
        "items.productId",
        "productName description price thumbnailImage"
      )
      .exec();

    if (!cartItems) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }
    console.log(cartItems);
  } catch (error) {}
};

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
    const addressData = {
      fullName,
      email,
      phone,
      country,
      state,
      city,
      landMark,
      pincode,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: addressData } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Address added successfully",
      addresses: user.addresses,
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
    const user = await User.findById(userId).select("addresses");

    res.status(200).json({
      message: "Address fetched successfully",
      addresses: user.addresses || [],
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
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
        "addresses._id": id,
      },
      {
        $set: {
          "addresses.$.fullName": updatedData.fullName,
          "addresses.$.email": updatedData.email,
          "addresses.$.phone": updatedData.phone,
          "addresses.$.country": updatedData.country,
          "addresses.$.state": updatedData.state,
          "addresses.$.city": updatedData.city,
          "addresses.$.landMark": updatedData.landMark,
          "addresses.$.pincode": updatedData.pincode,
        },
      },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User or address not found" });
    }

    res.status(200).json({
      message: "Address updated successfully",
      updatedUser: user,
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
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = await User.updateOne(
      { _id: userId },
      { $pull: { addresses: { _id: id } } }
    );
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
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
