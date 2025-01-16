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
import { X, Upload, Plus, Minus } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [images, setImages] = useState([]);
  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateProductByIdMutation();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const { product, categories } = data || {};

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    variants: [],
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
        category: product.category?.name || "",
        brand: product.brand?.name || "",
        variants: product.variants || [],
      });
      if (product.variants && product.variants.length > 0) {
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
  console.log(formData)
  const handleVariantChange = (index, field, value) => {
    setFormData((prevData) => {
      const newVariants = [...prevData.variants];
      newVariants[index] = { ...newVariants[index], [field]: value };
      return { ...prevData, variants: newVariants };
    });
  };
  const removeVariant = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      variants: prevData.variants.filter((_, i) => i !== index),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };
  const confirmSubmit = async () => {
    setIsConfirmModalOpen(false);
    try {
      console.log(formData);
      await updateProduct({ id, formData }).unwrap();
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
          <Card className="w-full">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="h-full flex flex-col">
                <div className="grid lg:grid-cols-[400px_1fr] gap-6 flex-grow">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
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
                    <div>
                      <Label htmlFor="brand" className="text-sm font-medium">
                        Brand
                      </Label>
                      <Input
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="Enter brand"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category
                      </Label>
                      <Select
                        id="category"
                        name="category"
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange({
                            target: { name: "category", value },
                          })
                        }
                        className="mt-1"
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Headphone">Headphone</SelectItem>
                          <SelectItem value="Earbuds">Earbuds</SelectItem>
                          <SelectItem value="Neckband">Neckband</SelectItem>
                          <SelectItem value="Speaker">Speaker</SelectItem>
                          <SelectItem value="Earphone">Earphone</SelectItem>
                        </SelectContent>
                      </Select>
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
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {formData?.variants?.map((variant, index) => (
                        <div key={index} className="mt-2 p-4 border rounded-md">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-lg text-yellow-500 font-semibold">
                              {variant?.color}
                            </h4>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeVariant(index)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor={`color-${index}`}
                                className="text-sm font-medium"
                              >
                                Color
                              </Label>
                              <Input
                                id={`color-${index}`}
                                value={variant.color}
                                onChange={(e) =>
                                  handleVariantChange(
                                    index,
                                    "color",
                                    e.target.value
                                  )
                                }
                                placeholder="Enter color"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor={`stock-${index}`}
                                className="text-sm font-medium"
                              >
                                Stock
                              </Label>
                              <Input
                                id={`stock-${index}`}
                                type="number"
                                value={variant.stock}
                                onChange={(e) =>
                                  handleVariantChange(
                                    index,
                                    "stock",
                                    parseInt(e.target.value)
                                  )
                                }
                                placeholder="Enter stock"
                                className="mt-1"
                              />
                            </div>
                          </div>
                          <div className="mt-2">
                            <Label className="text-sm font-medium">
                              Images
                            </Label>
                            <div className="grid grid-cols-3 gap-2 mt-1">
                              {variant.images.map((image, imgIndex) => (
                                <div key={imgIndex} className="relative group">
                                  <img
                                    src={image}
                                    alt={`Variant ${index + 1} image ${
                                      imgIndex + 1
                                    }`}
                                    className="w-full h-24 object-cover rounded-md"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newVariants = [
                                        ...formData.variants,
                                      ];
                                      newVariants[index].images = newVariants[
                                        index
                                      ].images.filter((_, i) => i !== imgIndex);
                                      setFormData({
                                        ...formData,
                                        variants: newVariants,
                                      });
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
