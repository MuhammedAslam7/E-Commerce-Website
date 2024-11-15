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
//
import { useAddProductsMutation } from "@/services/api/admin/adminApi";

export function ProductAddPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [images, setImages] = useState([]);
  const [addProducts, { isLoading }] = useAddProductsMutation();

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

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      <SidebarAdmin />
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <NavbarAdmin
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          pageName="ADD PRODUCT"
        />
        <div className="flex-1 overflow-auto p-4">
          <Card className="w-full max-w-7xl mx-auto">
            <CardContent className="p-4">
              <form className="space-y-4">
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
                      placeholder="Enter stock quantity"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category
                  </Label>
                  <Select>
                    <SelectTrigger id="category" className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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

                <div className="flex flex-col items-center">
                  <Button
                    type="submit"
                    className="w-1/2 text-sm font-medium py-2"
                  >
                    Add Product
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
