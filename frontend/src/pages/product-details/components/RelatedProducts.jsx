import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ currentLanguage = 'en' }) => {
  // Mock related products data with multi-language support
  const relatedProductsData = {
    en: {
      title: "You Might Also Like",
      products: [
        {
          id: 1,
          name: "Handwoven Ceramic Bowl",
          price: 45.99,
          originalPrice: 55.99,
          currency: "USD",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
          artisan: "Giuseppe Bianchi",
          rating: 4.8,
          reviews: 89,
          isOnSale: true,
          discount: 18,
          location: "Florence, Italy",
          category: "Ceramics"
        },
        {
          id: 2,
          name: "Rustic Dinner Plate Set",
          price: 120.00,
          currency: "USD",
          image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400",
          artisan: "Elena Conti",
          rating: 4.9,
          reviews: 156,
          isOnSale: false,
          location: "Tuscany, Italy",
          category: "Dinnerware"
        },
        {
          id: 3,
          name: "Mediterranean Serving Tray",
          price: 78.50,
          currency: "USD",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
          artisan: "Marco Rossi",
          rating: 4.7,
          reviews: 67,
          isOnSale: false,
          location: "Sicily, Italy",
          category: "Serving"
        },
        {
          id: 4,
          name: "Artisan Coffee Mug Set",
          price: 65.00,
          originalPrice: 80.00,
          currency: "USD",
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
          artisan: "Lucia Ferretti",
          rating: 4.6,
          reviews: 134,
          isOnSale: true,
          discount: 19,
          location: "Venice, Italy",
          category: "Drinkware"
        }
      ]
    },
    es: {
      title: "También Te Puede Gustar",
      products: [
        {
          id: 1,
          name: "Cuenco Cerámico Tejido a Mano",
          price: 45.99,
          originalPrice: 55.99,
          currency: "USD",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
          artisan: "Giuseppe Bianchi",
          rating: 4.8,
          reviews: 89,
          isOnSale: true,
          discount: 18,
          location: "Florencia, Italia",
          category: "Cerámica"
        },
        {
          id: 2,
          name: "Set de Platos Rústicos",
          price: 120.00,
          currency: "USD",
          image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400",
          artisan: "Elena Conti",
          rating: 4.9,
          reviews: 156,
          isOnSale: false,
          location: "Toscana, Italia",
          category: "Vajilla"
        }
      ]
    }
  };

  const currentData = relatedProductsData?.[currentLanguage] || relatedProductsData?.en;

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: currency
    })?.format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">{currentData?.title}</h2>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentData?.products?.map((product) => (
          <Link
            key={product?.id}
            to={`/product-details?id=${product?.id}`}
            className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-warm-lg transition-smooth"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Sale Badge */}
              {product?.isOnSale && (
                <div className="absolute top-3 left-3 bg-error text-error-foreground px-2 py-1 rounded-md text-xs font-medium">
                  -{product?.discount}%
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-smooth space-y-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="w-8 h-8 bg-background/90 hover:bg-background"
                  onClick={(e) => {
                    e?.preventDefault();
                    // Handle wishlist
                  }}
                >
                  <Icon name="Heart" size={16} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="w-8 h-8 bg-background/90 hover:bg-background"
                  onClick={(e) => {
                    e?.preventDefault();
                    // Handle quick view
                  }}
                >
                  <Icon name="Eye" size={16} />
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {/* Product Info */}
              <div className="space-y-1">
                <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                  {product?.name}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="MapPin" size={12} />
                  <span className="font-caption">{product?.location}</span>
                </div>
              </div>

              {/* Artisan */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={12} color="var(--color-accent-foreground)" />
                </div>
                <span className="text-sm text-muted-foreground font-caption">{product?.artisan}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(product?.rating)}
                </div>
                <span className="text-sm font-medium text-foreground">{product?.rating}</span>
                <span className="text-sm text-muted-foreground">({product?.reviews})</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(product?.price, product?.currency)}
                  </span>
                  {product?.isOnSale && product?.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product?.originalPrice, product?.currency)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded font-caption">
                  {product?.category}
                </span>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="ShoppingCart"
                iconPosition="left"
                onClick={(e) => {
                  e?.preventDefault();
                  // Handle add to cart
                }}
                className="opacity-0 group-hover:opacity-100 transition-smooth"
              >
                Add to Cart
              </Button>
            </div>
          </Link>
        ))}
      </div>
      {/* AI Recommendations Badge */}
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground font-caption">
        <Icon name="Sparkles" size={16} className="text-accent" />
        <span>AI-Powered Recommendations</span>
      </div>
    </div>
  );
};

export default RelatedProducts;