import React, { useState, useEffect } from 'react';

import MainNavigation from '../../components/ui/MainNavigation';
import LanguageSelector from '../../components/ui/LanguageSelector';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ProductCard from './components/ProductCard';
import FilterPanel from './components/FilterPanel';
import RecommendationPanel from './components/RecommendationPanel';
import QuickViewModal from './components/QuickViewModal';
import VoiceAssistant from './components/VoiceAssistant';
import ChatBot from './components/ChatBot';
import StatsPanel from './components/StatsPanel';

const CustomerDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [activeTab, setActiveTab] = useState('browse'); // 'browse', 'stats'
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: { min: 0, max: 1000 },
    location: 'all',
    sortBy: 'relevance',
    hasAR: false,
    has3D: false,
    aiRecommended: false,
    inStock: false,
    search: ''
  });

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Handcrafted Ceramic Vase",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop"
      ],
      location: "Portland, OR",
      rating: 4.8,
      reviewCount: 24,
      isNew: true,
      hasAR: true,
      has3D: true,
      isFavorited: false,
      artisan: {
        id: 1,
        name: "Maria Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      description: `This beautiful ceramic vase is handcrafted using traditional techniques passed down through generations. Each piece is unique, featuring organic shapes and earthy glazes that bring natural beauty to any space.`,
      story: `Created in my studio overlooking the Pacific Northwest mountains, this vase represents my connection to the earth and my passion for sustainable ceramics. The clay is sourced locally, and each piece is fired in my wood-burning kiln.`,
      category: 'pottery'
    },
    {
      id: 2,
      name: "Woven Textile Wall Art",
      price: 156.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop"
      ],
      location: "Santa Fe, NM",
      rating: 4.9,
      reviewCount: 18,
      isNew: false,
      hasAR: false,
      has3D: false,
      isFavorited: true,
      artisan: {
        id: 2,
        name: "James Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      description: `Hand-woven textile art piece featuring natural fibers and traditional patterns. This contemporary interpretation of ancient weaving techniques creates a stunning focal point for modern interiors.`,
      story: `Inspired by the rich textile traditions of the Southwest, this piece combines traditional Navajo weaving techniques with contemporary design sensibilities.`,
      category: 'textiles'
    },
    {
      id: 3,
      name: "Silver Jewelry Collection",
      price: 245.50,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop"
      ],
      location: "Asheville, NC",
      rating: 4.7,
      reviewCount: 32,
      isNew: false,
      hasAR: true,
      has3D: false,
      isFavorited: false,
      artisan: {
        id: 3,
        name: "Elena Vasquez",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      description: `Handcrafted sterling silver jewelry featuring organic forms and natural gemstones. Each piece is designed to celebrate the beauty of imperfection and the uniqueness of handmade artistry.`,
      story: `Working with silver for over 15 years, I draw inspiration from the natural world around my mountain studio. Each piece tells a story of connection between earth and sky.`,
      category: 'jewelry'
    },
    {
      id: 4,
      name: "Wooden Coffee Table",
      price: 890.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop"
      ],
      location: "Burlington, VT",
      rating: 4.9,
      reviewCount: 15,
      isNew: true,
      hasAR: true,
      has3D: true,
      isFavorited: false,
      artisan: {
        id: 4,
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      description: `Solid walnut coffee table with live edge design and hand-rubbed finish. This piece showcases the natural beauty of the wood grain while providing functional elegance for modern living spaces.`,
      story: `Crafted from sustainably sourced Vermont walnut, this table represents my commitment to both environmental responsibility and timeless design.`,
      category: 'woodwork'
    },
    {
      id: 5,
      name: "Glass Art Sculpture",
      price: 320.75,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
      ],
      location: "Seattle, WA",
      rating: 4.6,
      reviewCount: 21,
      isNew: false,
      hasAR: false,
      has3D: true,
      isFavorited: true,
      artisan: {
        id: 5,
        name: "Anna Williams",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face"
      },
      description: `Blown glass sculpture featuring flowing forms and vibrant colors. This contemporary art piece captures light and movement, creating an ever-changing display of beauty and craftsmanship.`,
      story: `Working with molten glass requires precision, patience, and passion. Each sculpture is born from fire and shaped by breath, creating unique pieces that dance with light.`,
      category: 'glasswork'
    },
    {
      id: 6,
      name: "Leather Messenger Bag",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"
      ],
      location: "Austin, TX",
      rating: 4.8,
      reviewCount: 28,
      isNew: false,
      hasAR: true,
      has3D: false,
      isFavorited: false,
      artisan: {
        id: 6,
        name: "David Martinez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      description: `Full-grain leather messenger bag handcrafted with traditional techniques. Features brass hardware, hand-stitched details, and a design that improves with age and use.`,
      story: `Using leather from ethical sources and time-honored techniques, I create bags that are built to last a lifetime while developing character with every adventure.`,
      category: 'leather'
    }
  ];

  // Mock recommendations data
  const mockRecommendations = [
    {
      id: 7,
      name: "Ceramic Tea Set",
      price: 125.00,
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop",
      rating: 4.7,
      artisan: { name: "Lisa Park" },
      aiReason: "Based on your interest in ceramic vases and tea-related items"
    },
    {
      id: 8,
      name: "Macrame Plant Hanger",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      rating: 4.5,
      artisan: { name: "Sophie Chen" },
      aiReason: "Complements your textile wall art preferences"
    },
    {
      id: 9,
      name: "Copper Wind Chimes",
      price: 78.50,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      rating: 4.8,
      artisan: { name: "Robert Kim" },
      aiReason: "Perfect for outdoor spaces, matches your metalwork interests"
    }
  ];

  // Load language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  // Filter products based on current filters
  const filteredProducts = mockProducts?.filter(product => {
    if (filters?.category !== 'all' && product?.category !== filters?.category) return false;
    if (product?.price < filters?.priceRange?.min || product?.price > filters?.priceRange?.max) return false;
    if (filters?.hasAR && !product?.hasAR) return false;
    if (filters?.has3D && !product?.has3D) return false;
    if (filters?.search && !product?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts]?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'price_low':
        return a?.price - b?.price;
      case 'price_high':
        return b?.price - a?.price;
      case 'rating':
        return b?.rating - a?.rating;
      case 'newest':
        return b?.isNew - a?.isNew;
      default:
        return 0;
    }
  });

  // Handle product actions
  const handleFavorite = (productId, isFavorited) => {
    if (isFavorited) {
      setFavorites(prev => [...prev, productId]);
    } else {
      setFavorites(prev => prev?.filter(id => id !== productId));
    }
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev?.find(item => item?.id === product?.id);
      if (existing) {
        return prev?.map(item => 
          item?.id === product?.id 
            ? { ...item, quantity: item?.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command?.toLowerCase();
    
    if (lowerCommand?.includes('show') && lowerCommand?.includes('pottery')) {
      setFilters(prev => ({ ...prev, category: 'pottery' }));
    } else if (lowerCommand?.includes('show') && lowerCommand?.includes('jewelry')) {
      setFilters(prev => ({ ...prev, category: 'jewelry' }));
    } else if (lowerCommand?.includes('sort') && lowerCommand?.includes('price')) {
      setFilters(prev => ({ ...prev, sortBy: 'price_low' }));
    } else if (lowerCommand?.includes('clear') && lowerCommand?.includes('filter')) {
      setFilters({
        category: 'all',
        priceRange: { min: 0, max: 1000 },
        location: 'all',
        sortBy: 'relevance',
        hasAR: false,
        has3D: false,
        aiRecommended: false,
        inStock: false,
        search: ''
      });
    }
  };

  const handleRefreshRecommendations = () => {
    // Mock refresh - in real app would fetch new recommendations
    console.log('Refreshing recommendations...');
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'My Account', path: '/customer-dashboard' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MainNavigation 
        isAuthenticated={true}
        userRole="customer"
        userName={currentUser?.name}
      />
      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="flex-1">
              <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />
              <div className="flex items-center space-x-4 mt-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={currentUser?.avatar} 
                    alt={currentUser?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-foreground">
                    Welcome back, {currentUser?.name?.split(' ')?.[0]}!
                  </h1>
                  <p className="text-muted-foreground font-caption">
                    Discover amazing handcrafted products from talented artisans
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
              
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  iconName="Grid3X3"
                  iconSize={16}
                />
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  iconName="List"
                  iconSize={16}
                />
              </div>

              {/* Cart */}
              <div className="relative">
                <Button variant="outline" size="sm" iconName="ShoppingCart" iconSize={16}>
                  Cart
                </Button>
                {cartItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {cartItems?.reduce((sum, item) => sum + item?.quantity, 0)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 bg-muted rounded-lg p-1 w-fit">
            <Button
              variant={activeTab === 'browse' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('browse')}
              iconName="Search"
              iconSize={16}
            >
              Browse Products
            </Button>
            <Button
              variant={activeTab === 'stats' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('stats')}
              iconName="BarChart3"
              iconSize={16}
            >
              My Insights
            </Button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'browse' ? (
            <div className="flex gap-8">
              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={() => setFilters({
                  category: 'all',
                  priceRange: { min: 0, max: 1000 },
                  location: 'all',
                  sortBy: 'relevance',
                  hasAR: false,
                  has3D: false,
                  aiRecommended: false,
                  inStock: false,
                  search: ''
                })}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />

              {/* Main Content */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-heading font-semibold text-foreground">
                      {sortedProducts?.length} Products Found
                    </h2>
                    <p className="text-sm text-muted-foreground font-caption">
                      Handcrafted items from talented artisans
                    </p>
                  </div>
                </div>

                {/* Products Grid */}
                <div className={`grid gap-6 mb-8 ${
                  viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :'grid-cols-1'
                }`}>
                  {sortedProducts?.map(product => (
                    <ProductCard
                      key={product?.id}
                      product={product}
                      onFavorite={handleFavorite}
                      onQuickView={handleQuickView}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>

                {/* Empty State */}
                {sortedProducts?.length === 0 && (
                  <div className="text-center py-16">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      No products found
                    </h3>
                    <p className="text-muted-foreground font-caption mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setFilters({
                        category: 'all',
                        priceRange: { min: 0, max: 1000 },
                        location: 'all',
                        sortBy: 'relevance',
                        hasAR: false,
                        has3D: false,
                        aiRecommended: false,
                        inStock: false,
                        search: ''
                      })}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>

              {/* Recommendations Panel */}
              <div className="hidden xl:block">
                <RecommendationPanel
                  recommendations={mockRecommendations}
                  onProductClick={handleQuickView}
                  onRefreshRecommendations={handleRefreshRecommendations}
                />
              </div>
            </div>
          ) : (
            <StatsPanel stats={{
              totalPurchases: 39,
              totalFavorites: 118,
              totalSpent: 2847,
              artisansFollowed: 23
            }} />
          )}
        </div>
      </div>
      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => {
          setIsQuickViewOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
        onViewAR={(product) => console.log('View AR:', product)}
        onView3D={(product) => console.log('View 3D:', product)}
      />
      {/* Voice Assistant */}
      <VoiceAssistant
        onVoiceCommand={handleVoiceCommand}
        onToggleListening={setIsVoiceListening}
      />
      {/* AI ChatBot */}
      <ChatBot currentLanguage={currentLanguage} />
    </div>
  );
};

export default CustomerDashboard;