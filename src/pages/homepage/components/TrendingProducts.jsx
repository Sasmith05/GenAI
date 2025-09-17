import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingProducts = ({ currentLanguage = 'en' }) => {
  const [favorites, setFavorites] = useState(new Set());

  const content = {
    en: {
      title: "Trending Artisan Products",
      subtitle: "Discover the most popular handcrafted items loved by our community",
      viewAll: "View All Products",
      addToFavorites: "Add to Favorites",
      view3D: "View in 3D",
      viewAR: "Try AR",
      byArtisan: "by"
    },
    es: {
      title: "Productos Artesanales Tendencia",
      subtitle: "Descubre los artículos hechos a mano más populares amados por nuestra comunidad",
      viewAll: "Ver Todos los Productos",
      addToFavorites: "Agregar a Favoritos",
      view3D: "Ver en 3D",
      viewAR: "Probar AR",
      byArtisan: "por"
    },
    fr: {
      title: "Produits Artisanaux Tendance",
      subtitle: "Découvrez les articles faits main les plus populaires aimés par notre communauté",
      viewAll: "Voir Tous les Produits",
      addToFavorites: "Ajouter aux Favoris",
      view3D: "Voir en 3D",
      viewAR: "Essayer AR",
      byArtisan: "par"
    }
  };

  const currentContent = content?.[currentLanguage] || content?.en;

  const products = [
    {
      id: 1,
      name: "Handwoven Ceramic Bowl",
      price: "$89.99",
      artisan: "Elena Rodriguez",
      artisanAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 127,
      isNew: true,
      has3D: true,
      hasAR: true,
      location: "Barcelona, Spain"
    },
    {
      id: 2,
      name: "Artisan Leather Wallet",
      price: "$124.50",
      artisan: "Marcus Thompson",
      artisanAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 89,
      isNew: false,
      has3D: true,
      hasAR: false,
      location: "Portland, USA"
    },
    {
      id: 3,
      name: "Hand-carved Wooden Sculpture",
      price: "$299.00",
      artisan: "Yuki Tanaka",
      artisanAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      image: "https://images.pixabay.com/photo/2016/11/29/12/30/wood-1869210_1280.jpg?w=400&h=400&fit=crop",
      rating: 5.0,
      reviews: 45,
      isNew: true,
      has3D: true,
      hasAR: true,
      location: "Kyoto, Japan"
    },
    {
      id: 4,
      name: "Embroidered Silk Scarf",
      price: "$156.75",
      artisan: "Priya Sharma",
      artisanAvatar: "https://randomuser.me/api/portraits/women/41.jpg",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 203,
      isNew: false,
      has3D: false,
      hasAR: true,
      location: "Mumbai, India"
    },
    {
      id: 5,
      name: "Artisan Glass Vase",
      price: "$189.99",
      artisan: "Giovanni Rossi",
      artisanAvatar: "https://randomuser.me/api/portraits/men/52.jpg",
      image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 76,
      isNew: true,
      has3D: true,
      hasAR: true,
      location: "Venice, Italy"
    },
    {
      id: 6,
      name: "Handmade Silver Jewelry",
      price: "$245.00",
      artisan: "Sarah Mitchell",
      artisanAvatar: "https://randomuser.me/api/portraits/women/35.jpg",
      image: "https://images.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 134,
      isNew: false,
      has3D: true,
      hasAR: false,
      location: "Edinburgh, UK"
    }
  ];

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites?.has(productId)) {
        newFavorites?.delete(productId);
      } else {
        newFavorites?.add(productId);
      }
      return newFavorites;
    });
  };

  const handleTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'es' ? 'es-ES' : currentLanguage === 'fr' ? 'fr-FR' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {currentContent?.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {currentContent?.subtitle}
          </p>
          <Link to="/product-details">
            <Button variant="outline" size="lg" iconName="ArrowRight" iconPosition="right">
              {currentContent?.viewAll}
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div
              key={product?.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-smooth"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth-slow"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product?.isNew && (
                    <span className="bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium">
                      New
                    </span>
                  )}
                  {product?.has3D && (
                    <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                      3D
                    </span>
                  )}
                  {product?.hasAR && (
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      AR
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product?.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-smooth hover:bg-white"
                >
                  <Icon
                    name="Heart"
                    size={20}
                    className={favorites?.has(product?.id) ? 'text-red-500 fill-current' : 'text-muted-foreground'}
                  />
                </button>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <div className="flex gap-3">
                    {product?.has3D && (
                      <Button variant="default" size="sm" iconName="Box">
                        {currentContent?.view3D}
                      </Button>
                    )}
                    {product?.hasAR && (
                      <Button variant="secondary" size="sm" iconName="Smartphone">
                        {currentContent?.viewAR}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < Math.floor(product?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product?.rating} ({product?.reviews})
                  </span>
                </div>

                {/* Product Name & Price */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading font-semibold text-foreground text-lg leading-tight flex-1 mr-2">
                    {product?.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTextToSpeech(product?.name)}
                    iconName="Volume2"
                    className="flex-shrink-0"
                  />
                </div>

                <p className="text-2xl font-bold text-primary mb-4">
                  {product?.price}
                </p>

                {/* Artisan Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={product?.artisanAvatar}
                    alt={product?.artisan}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground">
                      {currentContent?.byArtisan} <span className="font-medium text-foreground">{product?.artisan}</span>
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      {product?.location}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link to="/product-details" className="flex-1">
                    <Button variant="default" fullWidth>
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => toggleFavorite(product?.id)}
                    iconName="Heart"
                    className={favorites?.has(product?.id) ? 'text-red-500' : ''}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;