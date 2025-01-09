import { NavbarAdmin } from "@/components/admin/layouts/NavbarAdmin";
import { SidebarAdmin } from "@/components/admin/layouts/SidebarAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge, Edit, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCouponsQuery } from "@/services/api/admin/adminApi";

export const CouponPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const { data: coupons, isLoading } = useGetCouponsQuery();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <SidebarAdmin />
      <main className="flex-1">
        <NavbarAdmin 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          pageName="COUPON PAGE" 
        />
        
        <div className="p-6 space-y-8">
          <div className="flex justify-end items-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate("/admin/coupons/add-coupon")}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Coupon
            </Button>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <CardTitle className="text-xl text-gray-800 dark:text-gray-200">
                Coupon List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-orange-600 uppercase">Coupon Code</TableHead>
                    <TableHead className="text-orange-600 uppercase">Discount Amount</TableHead>
                    <TableHead className="text-orange-600 uppercase">Min Purchase</TableHead>
                    <TableHead className="text-orange-600 uppercase">Expiration Date</TableHead>
                    <TableHead className="text-orange-600 uppercase">Status</TableHead>
                    <TableHead className="text-orange-600 uppercase">Used Count</TableHead>
                    <TableHead className="text-right text-orange-600 uppercase">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons?.map((coupon) => (
                    <TableRow key={coupon._id}>
                      <TableCell className="font-medium">{coupon.couponCode}</TableCell>
                      <TableCell>{formatAmount(coupon.discountAmount)}</TableCell>
                      <TableCell>{formatAmount(coupon.minPurchaseAmount)}</TableCell>
                      <TableCell>{formatDate(coupon.expirationDate)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={coupon.listed ? "success" : "secondary"}
                          className={`font-semibold ${
                            coupon.listed ? "bg-green-600" : "bg-red-600"
                          }`}
                        >
                          {coupon.listed ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{coupon.usedUsersId?.length || 0}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => navigate(`/admin/coupons/edit/${coupon._id}`)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit coupon</span>
                          </Button>
                          <Switch
                            checked={coupon.listed}
                            className="data-[state=checked]:bg-green-500"
                          >
                            <span className="sr-only">
                              {coupon.listed ? "Deactivate coupon" : "Activate coupon"}
                            </span>
                          </Switch>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};