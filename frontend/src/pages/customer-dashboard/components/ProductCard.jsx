import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onFavorite, onQuickView, onAddToCart }) => {
  const [isFavorited, setIsFavorited] = useState(product?.isFavorited || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Mock API call
      setIsFavorited(!isFavorited);
      onFavorite?.(product?.id, !isFavorited);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickView = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onQuickView?.(product);
  };

  const handleAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onAddToCart?.(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavorite}
              disabled={isLoading}
              className="bg-background/90 hover:bg-background shadow-warm"
            >
              <Icon 
                name={isFavorited ? "Heart" : "Heart"} 
                size={16} 
                className={isFavorited ? "fill-error text-error" : "text-muted-foreground"}
              />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleQuickView}
              className="bg-background/90 hover:bg-background shadow-warm"
            >
              <Icon name="Eye" size={16} className="text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Product Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product?.isNew && (
            <span className="px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded-md">
              New
            </span>
          )}
          {product?.hasAR && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-md flex items-center space-x-1">
              <Icon name="Smartphone" size={10} />
              <span>AR</span>
            </span>
          )}
          {product?.has3D && (
            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-md flex items-center space-x-1">
              <Icon name="Box" size={10} />
              <span>3D</span>
            </span>
          )}
        </div>
      </div>
      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
              {product?.name}
            </h3>
            <p className="text-xs text-muted-foreground font-caption mt-1 flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>{product?.location}</span>
            </p>
          </div>
          <div className="text-right ml-2">
            <p className="font-heading font-bold text-primary text-sm">
              {formatPrice(product?.price)}
            </p>
          </div>
        </div>

        {/* Artisan Info */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
            <Image
              src={product?.artisan?.avatar}
              alt={product?.artisan?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground font-caption">
            by {product?.artisan?.name}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={12}
                className={i < Math.floor(product?.rating) 
                  ? "fill-warning text-warning" :"text-muted-foreground/30"
                }
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-caption">
            ({product?.reviewCount})
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleQuickView}
            className="flex-1 text-xs"
            iconName="Eye"
            iconSize={14}
          >
            Quick View
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleAddToCart}
            className="flex-1 text-xs"
            iconName="ShoppingCart"
            iconSize={14}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;