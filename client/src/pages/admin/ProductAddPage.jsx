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

import { useToaster } from "@/utils/Toaster";

import { ImageCropModal } from "@/components/admin/modals/ImageCropModal";
import { ConfirmDialog } from "@/components/admin/modals/ConfirmDilalog";
import axios from "axios";

export function ProductAddPage() {
  const toast = useToaster();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [images, setImages] = useState([]);
  const [addProducts, { isLoading }] = useAddProductsMutation();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    stock: "",
    description: "",
    categoryName: "",
    brandName: "",
    color: "",
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // useEffect(() => {
  //   return () => images.forEach((image) => URL.revokeObjectURL(image.preview));
  // }, [images]);

  const handleImageUpload = useCallback((files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 5));
  }, []);

  const openCropModal = (image, index) => {
    setCurrentImage(image.preview);
    setCurrentImageIndex(index);
    setCropModalOpen(true);
  };

  const handleCropComplete = (croppedImageUrl) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[currentImageIndex] = {
        ...newImages[currentImageIndex],
        preview: croppedImageUrl,
      };
      return newImages;
    });
  };

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

    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image.file);
          formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUD_NAME
            }/image/upload`,
            formData
          );
          return response.data.secure_url;
        })
      );

      const productData = {
        ...formData,
        images: imageUrls,
      };

      await addProducts(productData).unwrap();
      toast("Success", "Product Added Successfully", "#22c55e");
      setFormData({
        productName: "",
        price: "",
        stock: "",
        description: "",
        categoryName: "",
        brandName: "",
        color: "",
      });
      setImages([]);
    } catch (error) {
      console.log({ error: error.message });
      toast("Error", "Failed to add product. Please try again", "#ff0000");
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
          <Card className="w-full max-w-7xl mx-auto h-full">
            <CardContent className="p-4 h-full flex flex-col">
              <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
                <div className="grid grid-cols-3 gap-4 h-full">
                  <div className="col-span-2 space-y-6">
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
                          value={formData?.productName}
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
                          name="brandName"
                          value={formData?.brandName}
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
                          value={formData?.price}
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
                          value={formData?.stock}
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
                        value={formData?.description}
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
                          value={formData?.categoryName}
                          onValueChange={(value) =>
                            setFormData({ ...formData, categoryName: value })
                          }
                        >
                          <SelectTrigger id="category" className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Head Phone">
                              Head Phone
                            </SelectItem>
                            <SelectItem value="Neck Band">Neck Band</SelectItem>
                            <SelectItem value="Ear Buds">Ear Buds</SelectItem>
                            <SelectItem value="Speaker">Speaker</SelectItem>
                            <SelectItem value="Ear Phone">Ear Phone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="color" className="text-sm font-medium">
                          Color
                        </Label>
                        <Select
                          value={formData?.color}
                          onValueChange={(value) =>
                            setFormData({ ...formData, color: value })
                          }
                        >
                          <SelectTrigger id="color" className="mt-1">
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Black">Black</SelectItem>
                            <SelectItem value="White">White</SelectItem>
                            <SelectItem value="Red">Red</SelectItem>
                            <SelectItem value="Blue">Blue</SelectItem>
                            <SelectItem value="Green">Green</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 space-y-6">
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

                    {images?.length > 0 && (
                      <div className="flex flex-wrap sm:grid sm:grid-cols-3 sm:flex-col gap-2 mt-2">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image?.preview}
                              alt={`Product image ${index + 1}`}
                              className="cursor-pointer w-full object-cover rounded-md"
                              onClick={() => openCropModal(image, index)}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
      <ConfirmDialog
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmSubmit}
        title="Confirm Product Addition"
        description="Are you sure you want to add this product?"
      />
      {currentImage && (
        <ImageCropModal
          isOpen={cropModalOpen}
          onClose={() => setCropModalOpen(false)}
          imageUrl={currentImage}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
}
