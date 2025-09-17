import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart, onViewAR, onView3D }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen || !product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
    onClose();
  };

  const handleTextToSpeech = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(product.description);
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const images = product?.images || [product?.image];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-warm-xl"
        onClick={(e) => e?.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-semibold text-foreground text-lg">
            Quick View
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={images?.[selectedImageIndex]}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              {images?.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {images?.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 border-2 transition-colors ${
                        selectedImageIndex === index 
                          ? 'border-primary' :'border-transparent'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product?.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* AR/3D Buttons */}
              <div className="flex space-x-2">
                {product?.hasAR && (
                  <Button
                    variant="outline"
                    onClick={() => onViewAR?.(product)}
                    iconName="Smartphone"
                    iconSize={16}
                    className="flex-1"
                  >
                    View in AR
                  </Button>
                )}
                {product?.has3D && (
                  <Button
                    variant="outline"
                    onClick={() => onView3D?.(product)}
                    iconName="Box"
                    iconSize={16}
                    className="flex-1"
                  >
                    3D Model
                  </Button>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h1 className="font-heading font-bold text-foreground text-2xl mb-2">
                  {product?.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="font-heading font-bold text-primary text-xl">
                    {formatPrice(product?.price)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < Math.floor(product?.rating) 
                          ? "fill-warning text-warning" :"text-muted-foreground/30"
                        }
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      ({product?.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Artisan Info */}
              <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-background">
                  <Image
                    src={product?.artisan?.avatar}
                    alt={product?.artisan?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {product?.artisan?.name}
                  </p>
                  <p className="text-sm text-muted-foreground font-caption flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{product?.location}</span>
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-semibold text-foreground">
                    Description
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleTextToSpeech}
                    iconName={isPlaying ? "Pause" : "Play"}
                    iconSize={16}
                  >
                    {isPlaying ? 'Pause' : 'Listen'}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product?.description}
                </p>
              </div>

              {/* Product Story */}
              {product?.story && (
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">
                    Artisan's Story
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product?.story}
                  </p>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-foreground">
                    Quantity:
                  </label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <span className="w-12 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    iconName="Heart"
                    iconSize={16}
                  >
                    Add to Wishlist
                  </Button>
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={handleAddToCart}
                    iconName="ShoppingCart"
                    iconSize={16}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;