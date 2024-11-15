"use client";

import { useState, useEffect } from "react";
import { SidebarAdmin } from "@/components/admin/layouts/SidebarAdmin";
import { NavbarAdmin } from "@/components/admin/layouts/NavbarAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, EyeOff, Eye, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
// Importing the API hook
import {
  useGetAllProductsQuery,
  useUpdateProductStatusMutation,
} from "@/services/api/admin/adminApi";

export function ProductPage() {
  const toast = useToast();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { data: products = [], isLoading, error } = useGetAllProductsQuery();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateProductStatus, { isLoading: isUpdating }] =
    useUpdateProductStatusMutation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleToggleClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const confirmToggleProduct = async () => {
    if (selectedProduct) {
      try {
        await updateProductStatus({
          id: selectedProduct._id,
          listed: !selectedProduct.listed,
        }).unwrap();
        toast({
          title: "Success",
          Description: `Product ${
            selectedProduct.listed ? "unlisted" : "listed"
          } successfully.`,
          variant: "default",
        });
      } catch (error) {
        console.error("Failed to update product status:", error);
        toast({
          title: "Error",
          description: "Failed to update product status. Please try again.",
          variant: "destructive",
        });
      }
    }
    setShowModal(false);
    setSelectedProduct(null);
  };
  const cancelToggle = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading products.
      </div>
    );

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <SidebarAdmin />
      <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <NavbarAdmin
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          pageName="PRODUCTS"
        />
        <div className="p-6 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Product Management
            </h1>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
          <Card className="shadow-lg">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <CardTitle className="text-xl text-gray-800 dark:text-gray-200">
                Product List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.listed ? "success" : "secondary"}
                          className="font-semibold"
                        >
                          {product.listed ? "Listed" : "Unlisted"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit product</span>
                          </Button>
                          <Switch
                            checked={product.listed}
                            onCheckedChange={() => handleToggleClick(product)}
                            className="data-[state=checked]:bg-green-500"
                          >
                            <span className="sr-only">
                              {product.listed
                                ? "Unlist product"
                                : "List product"}
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

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Confirm Action
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              Are you sure you want to{" "}
              {selectedProduct?.listed ? "unlist" : "list"} this product? This
              action can be reversed later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={cancelToggle}
              className="mt-2 sm:mt-0"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={confirmToggleProduct}
              className="mt-2 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
