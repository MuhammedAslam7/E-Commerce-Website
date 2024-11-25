"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarUser } from "@/components/user/layouts/NavbarUser";
import { SecondNavbarUser } from "@/components/user/layouts/SecondNavbarUser";
import { useProductDetailsQuery } from "@/services/api/user/userApi";
import { useParams } from "react-router-dom";

export function ProductDetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { id } = useParams();
  const { data: product, isLoading, error } = useProductDetailsQuery(id);

  const images = product?.variants[0]?.images || [];

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (isLoading) {
    return <p>Loading Product Details......</p>;
  }
  if (!product || error) {
    return <p>Unable to see product details, please try again later....</p>;
  }

  return (
    <div className="container mx-auto bg-gray-50">
      <NavbarUser />
      <SecondNavbarUser />

      <div className="grid md:grid-cols-2 gap-12 px-[220px] mt-10">
        {/* Product Image Carousel */}
        <Card className="relative overflow-hidden rounded-xl shadow-lg h-[500px]">
          <CardContent className="p-0">
            <div className="relative aspect-square">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={images[currentImage]}
                  alt={`boAt Rockerz 425 - Image ${currentImage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md transition-transform hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md transition-transform hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-4 pb-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentImage === index
                      ? "bg-primary scale-125"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Details */}
        <div className="space-y-4">
          <div className="space-y-1">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 hover:bg-green-200"
            >
              In Stock
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900">
              {product.productName}
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                - 2 Customer Reviews
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              ₹{product.price}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ₹6000
            </span>
            <Badge variant="destructive" className="text-xs">
              75% OFF
            </Badge>
          </div>

          <p className="text-sm text-gray-700 font-medium">
            {product.description}
          </p>

          <div className="space-y-1">
            <label
              htmlFor="quantity"
              className="block text-xs font-medium text-gray-700"
            >
              Quantity:
            </label>
            <div className="flex items-center gap-2">
              <Button
                onClick={decreaseQuantity}
                variant="outline"
                size="icon"
                className="h-8 w-8"
              >
                -
              </Button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-12 text-center border rounded-md p-1 text-sm"
                min="1"
              />
              <Button
                onClick={increaseQuantity}
                variant="outline"
                size="icon"
                className="h-8 w-8"
              >
                +
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm py-1">
              BUY NOW
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-sm py-1"
                    variant="secondary"
                  >
                    <ShoppingCart className="mr-1 h-3 w-3" /> ADD TO CART
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add this item to your cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Button
            variant="outline"
            className={`w-full flex items-center gap-1 transition-colors text-sm py-1 ${
              isWishlisted ? "bg-pink-100 text-pink-600 hover:bg-pink-200" : ""
            }`}
            onClick={toggleWishlist}
          >
            <Heart
              className={`h-3 w-3 ${isWishlisted ? "fill-current" : ""}`}
            />
            {isWishlisted ? "WISHLISTED" : "ADD TO WISHLIST"}
          </Button>

          <div className="space-y-2 pt-4 border-t text-xs">
            <p className="flex justify-between">
              <span className="font-medium text-gray-600">BRAND:</span>
              <span className="text-gray-800">BOAT</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium text-gray-600">CATEGORY:</span>
              <span className="text-gray-800">HEADPHONE</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium text-gray-600">WARRANTY:</span>
              <span className="text-gray-800">
                1 Year Manufacturer Warranty
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
