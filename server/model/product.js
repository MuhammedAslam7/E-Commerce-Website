import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  stock: { type: Number, required: true },
  images: { type: [String], required: true },
});

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // discountPrice: {
    //   type: Number,
    // },
    thumbnailImage: {
      type: String,
      required: true,
    },
    totalStock: {
      type: Number,
      required: true,
    },
    listed: {
      type: Boolean,
      default: true,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    variants: [variantSchema],
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: "text" });
export const Product = mongoose.model("Product", productSchema);
