import { Address } from "../model/addressSchema.js";
import { Cart } from "../model/cart.js";
import { Order } from "../model/orderSchema.js";
import { Product } from "../model/product.js";
import User from "../model/userModel.js";

export const placeOrder = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(404).json({ message: "User is not valid" });
  }
  const { addressId, paymentMethod } = req.body;

  try {
    const user = await User.findById(userId);

    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) return res.status(404).json({ message: "Address not found" });
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "price"
    );

    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const products = cart.items.map((item) => ({
      productId: item.productId._id,
      variantId: item.variantId,
      quantity: item.quantity,
      productPrice: item.productId.price,
    }));
    console.log(products);
    const payableAmount = products.reduce(
      (sum, product) => sum + product.productPrice * product.quantity,
      0
    );
    const newOrder = new Order({
      userId,
      addressId,
      paymentMethod,
      payableAmount,
      products,
    });

    for (let item of products) {
      const { productId, variantId, quantity } = item;

      const product = await Product.findOne({
        _id: productId,
        "variants._id": variantId,
      });

      const variant = product.variants.find((variant) =>
        variant._id.equals(variantId)
      );

      if (variant) {
        variant.stock = Math.max(0, variant.stock - quantity);

        await product.save();
      }
    }
    // easy way
    // const bulkOps = data.map(({ productId, variantId, quantity }) => ({
    //   updateOne: {
    //     filter: { _id: productId, "variants._id": variantId },
    //     update: { $inc: { "variants.$.stock": -quantity } },
    //   },
    // }));

    // await Product.bulkWrite(bulkOps);

    await newOrder.save();

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/////////////////////////////////////////////////////////////////
export const myOrders = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(404).json({ message: "User is not valid" });
  }

  try {
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate("addressId")
      .populate("products.productId")
      .exec();

    const detailedOrders = await Promise.all(
      orders.map(async (order) => {
        const productsWithVariants = await Promise.all(
          order.products.map(async (product) => {
            const fullProduct = await Product.findById(product.productId);
            const variant = fullProduct.variants.id(product.variantId);

            return {
              productId: product.productId._id,
              productName: product.productId.productName,
              price: product.productId.price,
              quantity: product.quantity,
              itemStatus: product.itemStatus,
              variant: variant
                ? {
                    color: variant.color,
                    images: variant.images,
                  }
                : null,
            };
          })
        );
        return {
          orderId: order._id,
          paymentMethod: order.paymentMethod,
          payableAmount: order.payableAmount,
          products: productsWithVariants,
          orderAt: order.orderAt,
          orderStatus: order.orderStatus,
          address: {
            fullName: order.addressId.fullName,
            email: order.addressId.email,
            phone: order.addressId.phone,
            country: order.addressId.country,
            state: order.addressId.state,
            city: order.addressId.city,
            landMark: order.addressId.landMark,
            pincode: order.addressId.pincode,
          },
        };
      })
    );

    res.status(200).json({ success: true, orders: detailedOrders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//////////////////////////////////////////////////////////////
export const orderDetails = async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    return res.status(401).json({ message: "User is not valid" });
  }
  const { id } = req.params;
  console.log(id);

  try {
    const order = await Order.findOne({ _id: id, userId })
      .populate("addressId")
      .populate("products.productId")
      .exec();

    if (!order) {
      res.status(404).json({ message: "The Order is not exist" });
    }
    
    const allCancelled = await order.products.every(product => product.itemStatus == "Cancelled")
    if(allCancelled) {
      order.orderStatus = "Cancelled"
      await order.save()
    }

    const productsWithVariants = await Promise.all(
      order.products.map(async (product) => {
        const fullProduct = await Product.findById(product.productId);
        const variant = fullProduct.variants.id(product.variantId);

        return {
          productId: product.productId._id,
          productName: product.productId.productName,
          price: product.productId.price,
          quantity: product.quantity,
          itemStatus: product.itemStatus,
          itemId: product._id,
          variant: variant
            ? {
                color: variant.color,
                images: variant.images,
              }
            : null,
        };
      })
    );

    const detailedOrder = {
      orderId: order._id,
      paymentMethod: order.paymentMethod,
      payableAmount: order.payableAmount,
      products: productsWithVariants,
      orderAt: order.orderAt,
      orderStatus: order.orderStatus,
      address: {
        fullName: order.addressId.fullName,
        email: order.addressId.email,
        phone: order.addressId.phone,
        country: order.addressId.country,
        state: order.addressId.state,
        city: order.addressId.city,
        landMark: order.addressId.landMark,
        pincode: order.addressId.pincode,
      },
    };


    res.status(200).json({ order: detailedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
///////////////////////////////////////////////////////////////
export const cancelOrder = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(404).json({ message: "User is not valid" });
  }
  const { id } = req.body;

  try {
    const order = await Order.updateOne(
      { _id: id },
      {
        $set: {
          orderStatus: "Cancelled",
          "products.$[].itemStatus": "Cancelled",
        },
      }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not existed" });
    }
    res.status(200).json({ message: "Order cancelled Successfully", order });
  } catch (error) {
    console.log(error);
  }
};
////////////////////////////////////////////////////////////////////////
export const cancelItem = async (req, res) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(404).json({ message: "User is not valid" });
  }

  const { orderId, itemId } = req.body;

  try {
    const updatedItem = await Order.findOneAndUpdate({
      _id: orderId,
      "products._id": itemId,
    }, {$set: {"products.$.itemStatus" : "Cancelled"}}, {new: true});

    if(!updatedItem) {
      return res.status(404).json({message: "Unable to cancel the item"})
    }

    res.status(200).json(updatedItem)
  } catch (error) {
    res.status(500).json({message: "Internal sever error"})
  }
};
