import { NavbarAdmin } from "@/components/admin/layouts/NavbarAdmin";
import { SidebarAdmin } from "@/components/admin/layouts/SidebarAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@radix-ui/react-switch";
import { Badge, Edit, Plus, Table } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const OfferPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
  return (
    <div className={`flex min-h-screen ${isDarkMode ? "dark" : ""}`}>
        <SidebarAdmin />
        <main className="flex-1">
            <NavbarAdmin 
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                pageName="OFFER PAGE" />
        
        <div className="p-6 space-y-8">
          <div className="flex justify-end items-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate("/admin/offers/add-offer")}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Offers
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
                    <TableHead className="text-orange-600 uppercase">
                      Offers
                    </TableHead>
                    <TableHead className="text-orange-600 uppercase">
                      Status
                    </TableHead>
                    <TableHead className="text-right text-orange-600 uppercase ">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {categories?.map((category) => (
                    <TableRow key={category?._id}>
                      <TableCell className="font-medium">
                        {category?.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={category?.listed ? "success" : "secondary"}
                          className={`font-semibold bh bg-red-700 ${
                            category?.listed ? "bg-green-600" : "bg-red-600"
                          }`}
                        >
                          {category?.listed ? "Listed" : "Unlisted"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleEdit(category)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit category</span>
                          </Button>
                          <Switch
                            checked={category?.listed}
                            onCheckedChange={() => handleToggleClick(category)}
                            className="data-[state=checked]:bg-green-500"
                          >
                            <span className="sr-only">
                              {category?.listed
                                ? "Unlist category"
                                : "List category"}
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
