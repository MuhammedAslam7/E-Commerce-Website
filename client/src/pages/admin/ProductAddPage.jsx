"use client";

import { useState, useEffect, useCallback } from "react";
import { SidebarAdmin } from "@/components/admin/layouts/SidebarAdmin";
import { NavbarAdmin } from "@/components/admin/layouts/NavbarAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload } from "lucide-react";
import { useAddProductsMutation } from "@/services/api/admin/adminApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export function ProductAddPage() {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [images, setImages] = useState([]);
  const [addProducts, { isLoading }] = useAddProductsMutation();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    color: "",
  });

  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.preview));
  }, [images]);

  const handleImageUpload = useCallback((files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 5));
  }, []);

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const confirmSubmit = async () => {
    setIsConfirmModalOpen(false);
    const productData = new FormData();

    for (const key in formData) {
      productData.append(key, formData[key]);
    }
    images.forEach((image) => {
      productData.append("images", image.file);
    });

    try {
      await addProducts(productData).unwrap();
      toast({
        title: "Success",
        description: "Product added successfully!",
      });
      setFormData({
        productName: "",
        brand: "",
        price: "",
        stock: "",
        description: "",
        category: "",
        color: "",
      });
      setImages([]);
    } catch (error) {
      console.log({ error: error.message });
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      <SidebarAdmin />
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <NavbarAdmin
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          pageName="ADD PRODUCT"
        />
        <div className="flex-1 overflow-auto p-4 ">
          <Card className="w-full max-w-7xl mx-auto h-[600px]">
            <CardContent className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="productName"
                          className="text-sm font-medium"
                        >
                          Product Name
                        </Label>
                        <Input
                          id="productName"
                          name="productName"
                          value={formData.productName}
                          onChange={handleInputChange}
                          placeholder="Enter product name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="brand" className="text-sm font-medium">
                          Brand
                        </Label>
                        <Input
                          id="brand"
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          placeholder="Enter brand name"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price" className="text-sm font-medium">
                          Price
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="Enter price"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stock" className="text-sm font-medium">
                          Stock
                        </Label>
                        <Input
                          id="stock"
                          type="number"
                          name="stock"
                          value={formData.stock}
                          onChange={handleInputChange}
                          placeholder="Enter stock quantity"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="description"
                        className="text-sm font-medium"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter product description"
                        rows={3}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="category"
                          className="text-sm font-medium"
                        >
                          Category
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData({ ...formData, category: value })
                          }
                        >
                          <SelectTrigger id="category" className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="head-phones">
                              Head phones
                            </SelectItem>
                            <SelectItem value="neck-band">Neck Band</SelectItem>
                            <SelectItem value="ear-buds">Ear Buds</SelectItem>
                            <SelectItem value="speakers">Speakers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="color" className="text-sm font-medium">
                          Color
                        </Label>
                        <Select
                          value={formData.color}
                          onValueChange={(value) =>
                            setFormData({ ...formData, color: value })
                          }
                        >
                          <SelectTrigger id="color" className="mt-1">
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 space-y-4">
                    <div>
                      <Label htmlFor="images" className="text-sm font-medium">
                        Product Images
                      </Label>
                      <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-4">
                        <label
                          htmlFor="images"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload className="h-8 w-8 text-gray-400" />
                          <span className="mt-2 text-sm text-gray-500">
                            Upload images (max 5)
                          </span>
                          <Input
                            id="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleImageUpload(e.target.files)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.preview}
                              alt={`Product image ${index + 1}`}
                              className="h-16 w-16 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full text-sm font-medium py-2 mt-4"
                      disabled={isLoading}
                    >
                      {isLoading ? "Adding Product" : "Add Product"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Toaster />
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Product Addition</DialogTitle>
            <DialogDescription>
              Are you sure you want to add this product?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmSubmit}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
