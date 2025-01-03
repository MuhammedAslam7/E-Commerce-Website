import { Category } from "../model/category.js";
import { Offer } from "../model/offerSchema.js";
import { Order } from "../model/orderSchema.js";

import {Product} from '../model/product.js'

export const addOffer = async(req, res) => {
    try {
        const {
            title,
            description,
            discountType,
            discountValue,
            startDate,
            endDate,
            items,
            category,
          } = req.body;

          const newOffer = new Offer({
            title,
            description,
            discountType,
            discountValue,
            startDate,
            endDate,

          })
    
          if(product) {
            const offerProduct = await Order.findById(product)


          }
          if(!product) {
            const offerCategory = await Category.findById(category)
          }

        
        
    } catch (error) {
        
    }

}

export const getProductAndCategories = async(req,res)=>{
  
  try {
    const products = await Product.find()

    const categories = await Category.find()

    res.status(200).json({products, categories})
    
  } catch (error) {
    res.status(500).json({message: "Internal server error"})
    
  }
}