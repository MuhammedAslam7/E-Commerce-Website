"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageCropModal } from "./SampleComponent";

export function SamplePage() {
  const [images, setImages] = useState([]);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const openCropModal = (image, index) => {
    setCurrentImage(image);
    setCurrentImageIndex(index);
    setCropModalOpen(true);
  };

  const handleCropComplete = (croppedImageUrl) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[currentImageIndex] = croppedImageUrl;
      return newImages;
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button asChild>
          <span>Upload Images</span>
        </Button>
      </label>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={image}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-full object-cover cursor-pointer border border-gray-200 rounded-lg"
              onClick={() => openCropModal(image, index)}
            />
          </div>
        ))}
      </div>

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
