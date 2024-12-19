import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Truck, Package, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavbarUser } from "@/components/user/layouts/NavbarUser";
import { SecondNavbarUser } from "@/components/user/layouts/SecondNavbarUser";
import { SidebarProfile } from "@/components/user/layouts/SidebarProfile";
import { useMyOrdersQuery } from "@/services/api/user/userApi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FooterUser } from "@/components/user/layouts/FooterUser";

export function OrdersPage() {
  const navitate = useNavigate();
  const { data, isLoading, isError } = useMyOrdersQuery();
  const [orders, setOrders] = useState([]);
  console.log(data);
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Delivered":
        return "green";
      case "Cancelled":
        return "red";
      case "Shipped":
        return "blue";
      default:
        return "gray";
    }
  };

  useEffect(() => {
    if (data?.orders) {
      setOrders(data?.orders);
    }
  }, [data?.orders]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <div>
      <NavbarUser />
      <SecondNavbarUser />
      <div className="max-w-5xl mx-auto flex mt-8 px-4 space-x-6">
        <SidebarProfile heading="My Orders" />

        {orders?.length == 0 ? (
          <div className="flex w-full flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              No Orders Found
            </h1>
            <p className="text-gray-600 mb-6">
              You have not placed any orders yet. Start exploring our products
              now!
            </p>
            <button onClick={() => navitate("/home")} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6 flex-1">
            {orders?.map((order) => (
              <Card
                key={order?.orderId}
                className="w-full mx-auto shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-l font-bold">
                      Order #{order.orderId}
                    </CardTitle>
                    <Badge
                      style={{
                        backgroundColor: getStatusColor(order?.orderStatus),
                        fontWeight: "bold",
                      }}
                    >
                      {order?.orderStatus?.charAt(0)?.toUpperCase() +
                        order?.orderStatus?.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                    <Calendar className="w-4 h-4 font" />
                    <span className="text-black font-mono">
                      {order?.orderAt
                        ? format(
                            new Date(order.orderAt),
                            "EEE, MMM dd, yyyy, h:mm a"
                          )
                        : "Invalid date"}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  <div className="space-y-4">
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            {product.variant?.images?.[0] ? (
                              <img
                                src={product.variant.images[0]}
                                alt={product.productName}
                                className=" w-full h-full object-contain"
                              />
                            ) : (
                              <Package className="w-8 h-8 text-gray-400 absolute inset-0 m-auto" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-base">
                              {product.productName}
                            </p>
                            {product.variant?.color && (
                              <p className="text-sm text-muted-foreground">
                                {product.variant.color}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {product.quantity} x ₹{product.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ₹{(product.quantity * product.price).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount:</span>
                    <div>₹{order.payableAmount.toFixed(2)}</div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between pt-4 space-x-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Truck className="w-4 h-4 mr-2" />
                    Track Order
                  </Button>
                  <Button
                    onClick={() => navitate(`/order-details/${order.orderId}`)}
                    variant="default"
                    size="sm"
                    className="flex-1"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      <FooterUser />
    </div>
  );
}
