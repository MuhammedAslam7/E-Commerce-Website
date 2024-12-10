"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SidebarAdmin } from "@/components/admin/layouts/SidebarAdmin";
import { NavbarAdmin } from "@/components/admin/layouts/NavbarAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload } from "lucide-react";
import {
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
} from "@/services/api/admin/adminApi";
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
import { ImageCropModal } from "@/components/admin/modals/ImageCropModal";
export function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [images, setImages] = useState([]);
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateProductByIdMutation();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    totalStock: "",
    category: "",
    color: "",
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        totalStock: product.totalStock?.toString() || "",
        category: product.category || "", // Added category
        color: product.variants?.[0]?.color || "",
      });
      if (
        product.variants &&
        product.variants[0] &&
        Array.isArray(product.variants[0].images)
      ) {
        setImages(
          product.variants[0].images.map((url) => ({
            preview: url,
            file: null,
          }))
        );
      } else {
        setImages([]);
      }
    }
  }, [product]);
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.preview && image.file) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);
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
    console.log(croppedImageUrl);
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
    const productData = new FormData();
    for (const key in formData) {
      productData.append(key, formData[key]);
    }
    const existingImages = images
      .filter((image) => !image.file)
      .map((image) => image.preview);
    productData.append("existingImages", JSON.stringify(existingImages));
    images
      .filter((image) => image.file)
      .forEach((image) => {
        productData.append(`images`, image.file);
      });
    try {
      await updateProduct({ id, productData }).unwrap();
      toast({
        title: "Success",
        description: "Product updated successfully!",
      });
      navigate("/admin/products");
    } catch (error) {
      console.error("Failed to update product:", error);
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error: {error.message}
      </div>
    );
  }
  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      <SidebarAdmin />
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <NavbarAdmin
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          pageName="EDIT PRODUCT"
        />
        <div className="flex-1 overflow-auto p-6">
          <Card className="w-full h-full">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="h-full flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="totalStock"
                          className="text-sm font-medium"
                        >
                          Total Stock
                        </Label>
                        <Input
                          id="totalStock"
                          type="number"
                          name="totalStock"
                          value={formData.totalStock}
                          onChange={handleInputChange}
                          placeholder="Enter total stock"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="color" className="text-sm font-medium">
                          Color
                        </Label>
                        <Input
                          id="color"
                          name="color"
                          value={formData.color}
                          onChange={handleInputChange}
                          placeholder="Enter color"
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
                        rows={5}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category
                      </Label>
                      <Input
                        id="category"
                        name="category"
                        value={formData.category.name}
                        onChange={handleInputChange}
                        placeholder="Enter category"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.preview}
                              alt={`Product image ${index + 1}`}
                              className="cursor-pointer w-full h-24 object-cover rounded-md"
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
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/products")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating Product..." : "Update Product"}
                  </Button>
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
            <DialogTitle>Confirm Product Update</DialogTitle>
            <DialogDescription>
              Are you sure you want to update this product?
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
