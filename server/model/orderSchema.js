import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    orderAt: {
      type: Date,
      default: Date.now,
    },
    paymentId: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true
    },
    payableAmount: {
      type: Number,
      required: true
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        itemStatus: {
          type: String,
          required: true,
          enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
          default: "Pending",
        },
     
      
      },
    ],
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema)
