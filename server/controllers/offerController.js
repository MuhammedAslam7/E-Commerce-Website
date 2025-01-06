import { Category } from "../model/category.js";
import { Offer } from "../model/offerSchema.js";
import { Order } from "../model/orderSchema.js";

import {Product} from '../model/product.js'


export const getProductAndCategories = async(req,res)=>{
  
  try {
    const products = await Product.find()

    const categories = await Category.find()

    res.status(200).json({products, categories})
    
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
    
  }
  
}



export const addOffer = async (req, res) => {
  try {
    const {
      title,
      description,
      discountType,
      discountValue,
      applicationType,
      categoryId,
      productId,
      startDate,
      endDate,
    } = req.body.values;

    console.log(
      title,
      description,
      discountType,
      discountValue,
      applicationType,
      categoryId,
      productId,
      startDate,
      endDate
    );

    const offer = new Offer({
      title,
      description,
      discountType,
      discountValue,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      products: applicationType === "product" ? productId : [],
      categories: applicationType === "category" ? categoryId : [],
    });

    await offer.save();

    if (applicationType === "category") {
      const products = await Product.find({
        category: { $in: categoryId },
        listed: true,
      });

      await Promise.all(
        products.map(async (product) => {
          let discountedPrice;

          if (discountType === "percentage") {
            discountedPrice = Math.ceil((product.price * (100 - discountValue)) / 100);
          } else if (discountType === "flat") {
            discountedPrice = Math.ceil(product.price - discountValue);
          }

          await Product.updateOne(
            { _id: product._id },
            { $set: { discountedPrice }, $push: { offers: offer._id } }
          );
        })
      );
    } else {
      const products = await Product.find({
        _id: { $in: productId },
        listed: true,
      });

      await Promise.all(
        products.map(async (product) => {
          let discountedPrice;

          if (discountType === "percentage") {
            discountedPrice = Math.ceil((product.price * (100 - discountValue)) / 100);
          } else if (discountType === "flat") {
            discountedPrice = Math.ceil(product.price - discountValue);
          }

          await Product.updateOne(
            { _id: product._id },
            { $set: { discountedPrice }, $push: { offers: offer._id } }
          );
        })
      );
    }

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      offer,
    });
  } catch (error) {
    console.error("Error in addOffer:", error);
    res.status(500).json({
      success: false,
      message: "Error creating offer",
      error: error.message,
    });
  }
};

///////////////////////////////////////////////////////////
export const getActiveOffers = async (req, res) => {
  try {
    const currentDate = new Date();
    const offers = await Offer.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      listed: true,
    }).populate("products categories");

    res.status(200).json({
      success: true,
      offers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching offers",
      error: error.message,
    });
  }
};

export const getProductsWithOffers = async (req, res) => {
  try {
    const currentDate = new Date();
    
    // Get products with active offers
    const products = await Product.aggregate([
      {
        $match: { listed: true }
      },
      {
        $lookup: {
          from: "offers",
          let: { 
            productId: "$_id",
            categoryId: "$category"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $lte: ["$startDate", currentDate] },
                    { $gte: ["$endDate", currentDate] },
                    { $eq: ["$listed", true] },
                    {
                      $or: [
                        { $in: ["$$productId", "$products"] },
                        { $in: ["$$categoryId", "$categories"] }
                      ]
                    }
                  ]
                }
              }
            }
          ],
          as: "activeOffers"
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails"
        }
      },
      {
        $addFields: {
          categoryDetails: { $arrayElemAt: ["$categoryDetails", 0] },
          hasActiveOffer: { $gt: [{ $size: "$activeOffers" }, 0] },
          bestOffer: {
            $reduce: {
              input: "$activeOffers",
              initialValue: null,
              in: {
                $cond: {
                  if: {
                    $or: [
                      { $eq: ["$$value", null] },
                      {
                        $gt: [
                          { $ifNull: ["$$this.discountValue", 0] },
                          { $ifNull: ["$$value.discountValue", 0] }
                        ]
                      }
                    ]
                  },
                  then: "$$this",
                  else: "$$value"
                }
              }
            }
          }
        }
      },
      {
        $addFields: {
          discountedPrice: {
            $cond: {
              if: { $eq: ["$hasActiveOffer", true] },
              then: {
                $cond: {
                  if: { $eq: ["$bestOffer.discountType", "percentage"] },
                  then: {
                    $subtract: [
                      "$price",
                      {
                        $multiply: [
                          "$price",
                          { $divide: ["$bestOffer.discountValue", 100] }
                        ]
                      }
                    ]
                  },
                  else: {
                    $subtract: ["$price", "$bestOffer.discountValue"]
                  }
                }
              },
              else: "$price"
            }
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products with offers",
      error: error.message,
    });
  }
};