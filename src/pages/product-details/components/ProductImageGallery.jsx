import React, { useState, useRef } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ images = [], productName = "", onARView = () => {}, on3DView = () => {} }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const handleImageClick = (e) => {
    if (!isZoomed) {
      setIsZoomed(true);
      const rect = e?.target?.getBoundingClientRect();
      const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
      const y = ((e?.clientY - rect?.top) / rect?.height) * 100;
      setZoomPosition({ x, y });
    } else {
      setIsZoomed(false);
    }
  };

  const handleMouseMove = (e) => {
    if (isZoomed) {
      const rect = e?.target?.getBoundingClientRect();
      const x = ((e?.clientX - rect?.left) / rect?.width) * 100;
      const y = ((e?.clientY - rect?.top) / rect?.height) * 100;
      setZoomPosition({ x, y });
    }
  };

  if (!images || images?.length === 0) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Icon name="ImageOff" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-background rounded-lg overflow-hidden shadow-warm">
        <div className="aspect-square relative">
          <Image
            ref={imageRef}
            src={images?.[currentImageIndex]?.url}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : ''
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition?.x}% ${zoomPosition?.y}%`,
                  }
                : {}
            }
            onClick={handleImageClick}
            onMouseMove={handleMouseMove}
          />
          
          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 shadow-warm"
                onClick={handlePrevImage}
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 shadow-warm"
                onClick={handleNextImage}
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images?.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 px-3 py-1 rounded-full text-sm font-caption">
              {currentImageIndex + 1} / {images?.length}
            </div>
          )}

          {/* Zoom Indicator */}
          {!isZoomed && (
            <div className="absolute top-4 right-4 bg-background/80 px-2 py-1 rounded-md text-xs font-caption flex items-center space-x-1">
              <Icon name="ZoomIn" size={14} />
              <span>Click to zoom</span>
            </div>
          )}
        </div>

        {/* AR/3D Controls */}
        <div className="absolute top-4 left-4 flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={on3DView}
            iconName="Box"
            iconPosition="left"
            className="bg-background/90 hover:bg-background"
          >
            3D View
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onARView}
            iconName="Smartphone"
            iconPosition="left"
            className="bg-background/90 hover:bg-background"
          >
            AR View
          </Button>
        </div>
      </div>
      {/* Thumbnail Gallery */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentImageIndex(index);
                setIsZoomed(false);
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-smooth ${
                index === currentImageIndex
                  ? 'border-primary shadow-warm'
                  : 'border-border hover:border-accent'
              }`}
            >
              <Image
                src={image?.url}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* AI Enhancement Badge */}
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground font-caption">
        <Icon name="Sparkles" size={16} className="text-accent" />
        <span>AI-Enhanced Images</span>
      </div>
    </div>
  );
};

export default ProductImageGallery;