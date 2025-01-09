import { Coupon } from "../model/couponSchema.js    ";

export const addCoupon = async (req, res) => {
  try {
    const {
      couponCode,
      discountAmount,
      minPurchaseAmount,
      startDate,
      endDate,
    } = req.body.values;

    const coupon = new Coupon({
        couponCode,
        discountAmount,
        minPurchaseAmount,
        expirationDate: endDate,
        usedUsersId: []
    })

    await coupon.save()

  res.status(200).json({message: "Coupon Added Successfully"})
  
  } catch (error) {
    res.status(500).json({message: "Server error"})
    console.log(error)
  }
};
