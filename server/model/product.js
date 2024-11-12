import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
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
    },
    images: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: true,
    // },

    // brand: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Brand",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: "text" });
export const Product = mongoose.model("Product", productSchema);
