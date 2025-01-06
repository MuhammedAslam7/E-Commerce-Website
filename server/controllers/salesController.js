import { Order } from "../model/orderSchema.js";
import User from "../model/userModel.js";

export const dashboard = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $match: { orderStatus: "Delivered" },
      },
      {
        $group: {
          _id: null,
          totalPayableAmount: { $sum: "$payableAmount" },
        },
      },
    ]);

    const totalRevenue = result[0]?.totalPayableAmount || 0;
    const ordersCount = await Order.countDocuments();
    const customers = await User.find({ role: "user" }).countDocuments();
    const recentOrders = await Order.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 })
      .limit(5);

    res
      .status(200)
      .json({ totalRevenue, ordersCount, customers, recentOrders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const salesData = async (req, res) => {
    try {
      const { page = 1, limit = 10, startDate, endDate, dateRange } = req.query;
      const skip = (page - 1) * limit;
  

      let matchCondition = { orderStatus: "Delivered" };
  

      if (startDate && endDate) {
        matchCondition.orderAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
  

      const sales = await Order.aggregate([
        {
          $match: matchCondition
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails"
          }
        },
        {
          $unwind: "$userDetails"
        },
        {
          $project: {
            payableAmount: 1,
            orderAt: 1,
            orderStatus: 1,
            paymentStatus: 1,
            "userDetails.username": 1
          }
        },
        {
          $sort: { orderAt: -1 }
        },
        {
          $skip: skip
        },
        {
          $limit: parseInt(limit)
        }
      ]);
  

      const totalCount = await Order.countDocuments(matchCondition);
      const totalPage = Math.ceil(totalCount / limit);
      const currentPage = page;
  

      const revenueResult = await Order.aggregate([
        {
          $match: matchCondition
        },
        {
          $group: {
            _id: null,
            totalPayableAmount: { $sum: "$payableAmount" }
          }
        }
      ]);
  
      const totalRevenue = revenueResult[0]?.totalPayableAmount || 0;
      

      const ordersCount = await Order.countDocuments(matchCondition);

      const customers = await User.find({ role: "user" }).countDocuments();
  
      res.status(200).json({
        sales,
        totalRevenue,
        ordersCount,
        customers,
        totalPage,
        currentPage
      });
    } catch (error) {
      console.error('Error in salesData:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// const getDateRange = (option, startDate, endDate) => {
//     const now = new Date();
//     let start, end;
  
//     switch (option) {
//       case "currentMonth":
//         start = new Date(now.getFullYear(), now.getMonth(), 1);
//         end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//         break;
//       case "currentYear":
//         start = new Date(now.getFullYear(), 0, 1);
//         end = new Date(now.getFullYear(), 11, 31);
//         break;
//       case "currentDate":
//         start = new Date(now.setHours(0, 0, 0, 0));
//         end = new Date(now.setHours(23, 59, 59, 999));
//         break;
//       case "custom":
//         start = new Date(startDate);
//         end = new Date(endDate);
//         break;
//       default:
//         throw new Error("Invalid date range option");
//     }
  
//     return { start, end };
//   };
  
//   export const getSalesReportData = async (req, res) => {
//     try {
//         const { option, startDate, endDate } = req.query;
//         const { start, end } = getDateRange(option, startDate, endDate);
  
//       // Total Sales
//       const totalSales = await Order.aggregate([
//         {
//           $match: {
//             orderAt: { $gte: start, $lte: end },
//             orderStatus: { $ne: "Cancelled" },
//           },
//         },
//         {
//           $group: {
//             _id: null,
//             payableAmount: { $sum: "$payableAmount" },
//           },
//         },
//       ]);
  
//       // Total Customers
//       const totalCustomers = await User.countDocuments({
//         role: "user",
//         createdAt: { $gte: start, $lte: end },
//       });
  
//       // Total Orders
//       const totalOrders = await Order.countDocuments({
//         orderAt: { $gte: start, $lte: end },
//         orderStatus: { $ne: "Cancelled" },
//       });
  
//       // Sales Overview
//       const salesOverview = await Order.aggregate([
//         {
//           $match: {
//             orderAt: { $gte: start, $lte: end },
//             orderStatus: { $ne: "Cancelled" },
//           },
//         },
//         {
//           $group: {
//             _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderAt" } },
//             total: { $sum: "$payableAmount" },
//           },
//         },
//         { $sort: { _id: 1 } },
//       ]);
  
//       // Category Sales
//       const categorySales = await Order.aggregate([
//         {
//           $match: {
//             orderAt: { $gte: start, $lte: end },
//             orderStatus: { $ne: "Cancelled" },
//           },
//         },
//         { $unwind: "$products" },
//         {
//           $lookup: {
//             from: "products",
//             localField: "products.productId",
//             foreignField: "_id",
//             as: "product",
//           },
//         },
//         { $unwind: "$product" },
//         {
//           $group: {
//             _id: "$product.category",
//             total: {
//               $sum: {
//                 $multiply: ["$products.quantity", "$product.price"],
//               },
//             },
//           },
//         },
//         { $sort: { total: -1 } },
//       ]);
  
//       // Latest Orders
//       const latestOrders = await Order.find({
//         orderAt: { $gte: start, $lte: end },
//         orderStatus: { $ne: "Cancelled" },
//       })
//         .sort({ orderAt: -1 })
//         .limit(5)
//         .populate("userId", "username email") // Populate username and email from User schema
//         .lean();
  
//       res.json({
//         totalSales: totalSales[0]?.payableAmount || 0,
//         totalCustomers,
//         totalOrders,
//         salesOverview,
//         categorySales,
//         latestOrders,
//         dateRange: { start, end },
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "Error fetching sales report data",
//         error: error.message,
//       });
//     }
//   };