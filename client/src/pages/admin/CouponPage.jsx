import { NavbarAdmin } from "@/components/admin/layouts/NavbarAdmin";
import { SidebarAdmin } from "@/components/admin/layouts/SidebarAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge, Edit, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CouponPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <SidebarAdmin />
      <main className="flex-1">
        <NavbarAdmin 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          pageName="OFFER PAGE" 
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
                Offer List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-orange-600 uppercase">Title</TableHead>
                    <TableHead className="text-orange-600 uppercase">Discount</TableHead>
                    <TableHead className="text-orange-600 uppercase">Duration</TableHead>
                    <TableHead className="text-orange-600 uppercase">Status</TableHead>
                    <TableHead className="text-orange-600 uppercase">Products</TableHead>
                    <TableHead className="text-orange-600 uppercase">Categories</TableHead>
                    <TableHead className="text-right text-orange-600 uppercase">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {offers?.map((offer) => (
                    <TableRow key={offer._id}>
                      <TableCell className="font-medium">{offer.title}</TableCell>
                      <TableCell>
                        {offer.discountValue}
                        {offer.discountType === 'percentage' ? '%' : ' Rs'}
                      </TableCell>
                      <TableCell>
                        {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={offer.listed ? "success" : "secondary"}
                          className={`font-semibold ${
                            offer.listed ? "bg-green-600" : "bg-red-600"
                          }`}
                        >
                          {offer.listed ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {offer.products.map(product => product.productName).join(", ")}
                      </TableCell>
                      <TableCell>
                        {offer.categories.map(category => category.name).join(", ")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => navigate(`/admin/offers/edit/${offer._id}`)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit offer</span>
                          </Button>
                          <Switch
                            checked={offer.listed}
                            className="data-[state=checked]:bg-green-500"
                          >
                            <span className="sr-only">
                              {offer.listed ? "Deactivate offer" : "Activate offer"}
                            </span>
                          </Switch>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
