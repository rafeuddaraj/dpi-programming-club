"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

const images = [
  { src: "/placeholder.svg?height=300&width=400", alt: "Event 1" },
  { src: "/placeholder.svg?height=300&width=400", alt: "Event 2" },
  { src: "/placeholder.svg?height=300&width=400", alt: "Event 3" },
  { src: "/placeholder.svg?height=300&width=400", alt: "Event 4" },
  { src: "/placeholder.svg?height=300&width=400", alt: "Event 5" },
  { src: "/placeholder.svg?height=300&width=400", alt: "Event 6" },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (index) => setSelectedImage(index);
  const closeModal = () => setSelectedImage(null);

  const navigateImage = (direction) => {
    if (selectedImage === null) return;
    const newIndex =
      direction === "prev"
        ? (selectedImage - 1 + images.length) % images.length
        : (selectedImage + 1) % images.length;
    setSelectedImage(newIndex);
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8">Event Gallery</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Card
              key={index}
              className="cursor-pointer"
              onClick={() => openModal(index)}
            >
              <CardContent className="p-2">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                className="w-full h-auto"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white"
                onClick={closeModal}
              >
                <X className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white"
                onClick={() => navigateImage("prev")}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white"
                onClick={() => navigateImage("next")}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
