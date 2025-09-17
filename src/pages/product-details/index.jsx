import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import LanguageSelector from '../../components/ui/LanguageSelector';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import CustomerReviews from './components/CustomerReviews';
import ArtisanProfile from './components/ArtisanProfile';
import VoiceInteraction from './components/VoiceInteraction';
import RelatedProducts from './components/RelatedProducts';

const ProductDetailsPage = () => {
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [showAROverlay, setShowAROverlay] = useState(false);
  const [show3DOverlay, setShow3DOverlay] = useState(false);

  // Mock product images
  const productImages = [
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      alt: "Handcrafted Ceramic Vase - Main View"
    },
    {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      alt: "Handcrafted Ceramic Vase - Side View"
    },
    {
      url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
      alt: "Handcrafted Ceramic Vase - Detail View"
    },
    {
      url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
      alt: "Handcrafted Ceramic Vase - In Use"
    }
  ];

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Mock authentication check
    const mockAuth = localStorage.getItem('mockAuth');
    if (mockAuth) {
      const authData = JSON.parse(mockAuth);
      setIsAuthenticated(true);
      setUserRole(authData?.role);
      setUserName(authData?.name);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  const handleVoiceCommand = (action) => {
    switch (action) {
      case 'readDescription': handleTextToSpeech('description');
        setActiveTab('description');
        break;
      case 'readReviews': handleTextToSpeech('reviews');
        setActiveTab('reviews');
        break;
      case 'addToCart':
        handleAddToCart();
        break;
      case 'showArtisan': setActiveTab('artisan');
        break;
      case 'viewAR':
        handleARView();
        break;
      case 'view3D':
        handle3DView();
        break;
      case 'shareProduct':
        handleShare();
        break;
      case 'addToWishlist':
        handleAddToWishlist();
        break;
      case 'showHelp':
        // Show help modal or section
        break;
      default:
        console.log('Unknown voice command:', action);
    }
  };

  const handleTextToSpeech = (content) => {
    // Mock text-to-speech functionality
    console.log('Reading content:', content);
    // In a real implementation, this would use the Web Speech API
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    // Show success notification
  };

  const handleAddToWishlist = (product) => {
    console.log('Adding to wishlist:', product);
    // Show success notification
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Handcrafted Ceramic Vase',
        text: 'Check out this beautiful handcrafted ceramic vase!',
        url: window.location?.href,
      });
    } else {
      // Fallback to copy URL
      navigator.clipboard?.writeText(window.location?.href);
      console.log('URL copied to clipboard');
    }
  };

  const handleARView = () => {
    setShowAROverlay(true);
  };

  const handle3DView = () => {
    setShow3DOverlay(true);
  };

  const handleMessageArtisan = () => {
    console.log('Opening message dialog with artisan');
    // Open messaging interface
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Products', path: '/product-details' },
    { label: 'Handcrafted Ceramic Vase', path: location?.pathname }
  ];

  const tabs = [
    { id: 'description', label: currentLanguage === 'es' ? 'Descripción' : 'Description', icon: 'FileText' },
    { id: 'reviews', label: currentLanguage === 'es' ? 'Reseñas' : 'Reviews', icon: 'Star' },
    { id: 'artisan', label: currentLanguage === 'es' ? 'Artesano' : 'Artisan', icon: 'User' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MainNavigation 
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        userName={userName}
      />
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header with Breadcrumbs and Language Selector */}
          <div className="flex items-center justify-between mb-6">
            <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>

          {/* Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Product Images */}
            <div className="space-y-6">
              <ProductImageGallery
                images={productImages}
                productName="Handcrafted Ceramic Vase"
                onARView={handleARView}
                on3DView={handle3DView}
              />
              
              {/* Voice Interaction - Mobile */}
              <div className="lg:hidden">
                <VoiceInteraction
                  currentLanguage={currentLanguage}
                  onVoiceCommand={handleVoiceCommand}
                  isListening={isVoiceListening}
                  onToggleListening={() => setIsVoiceListening(!isVoiceListening)}
                />
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              <ProductInfo
                currentLanguage={currentLanguage}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onShare={handleShare}
                onTextToSpeech={handleTextToSpeech}
              />
              
              {/* Voice Interaction - Desktop */}
              <div className="hidden lg:block">
                <VoiceInteraction
                  currentLanguage={currentLanguage}
                  onVoiceCommand={handleVoiceCommand}
                  isListening={isVoiceListening}
                  onToggleListening={() => setIsVoiceListening(!isVoiceListening)}
                />
              </div>
            </div>
          </div>

          {/* Tabbed Content Section */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p className="text-lg leading-relaxed">
                      {currentLanguage === 'es' ?'Descubre la belleza atemporal de este exquisito jarrón de cerámica, creado a mano por artesanos maestros en el corazón de la Toscana. Cada pieza es única, con variaciones sutiles que reflejan el toque humano en su creación.' :'Discover the timeless beauty of this exquisite ceramic vase, handcrafted by master artisans in the heart of Tuscany. Each piece is unique, with subtle variations that reflect the human touch in its creation.'
                      }
                    </p>
                  </div>
                  
                  {/* Additional product details can be added here */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card rounded-lg border border-border p-6">
                      <h3 className="font-semibold text-foreground mb-4">
                        {currentLanguage === 'es' ? 'Características Técnicas' : 'Technical Features'}
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-success" />
                          <span>{currentLanguage === 'es' ? 'Cerámica de alta calidad' : 'High-quality ceramic'}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-success" />
                          <span>{currentLanguage === 'es' ? 'Hecho a mano' : 'Handmade craftsmanship'}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-success" />
                          <span>{currentLanguage === 'es' ? 'Materiales sostenibles' : 'Sustainable materials'}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-card rounded-lg border border-border p-6">
                      <h3 className="font-semibold text-foreground mb-4">
                        {currentLanguage === 'es' ? 'Cuidado y Mantenimiento' : 'Care & Maintenance'}
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center space-x-2">
                          <Icon name="Droplets" size={16} className="text-accent" />
                          <span>{currentLanguage === 'es' ? 'Lavar a mano recomendado' : 'Hand wash recommended'}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Icon name="Shield" size={16} className="text-accent" />
                          <span>{currentLanguage === 'es' ? 'Evitar cambios de temperatura' : 'Avoid temperature changes'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <CustomerReviews currentLanguage={currentLanguage} />
              )}

              {activeTab === 'artisan' && (
                <ArtisanProfile 
                  currentLanguage={currentLanguage}
                  onMessageArtisan={handleMessageArtisan}
                />
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <RelatedProducts currentLanguage={currentLanguage} />
          </div>
        </div>
      </main>
      {/* AR Overlay */}
      {showAROverlay && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="bg-background rounded-lg p-6 max-w-md mx-4">
            <div className="text-center space-y-4">
              <Icon name="Smartphone" size={48} className="mx-auto text-accent" />
              <h3 className="text-xl font-semibold text-foreground">AR View</h3>
              <p className="text-muted-foreground">
                {currentLanguage === 'es' ?'La vista AR se abriría aquí con la cámara del dispositivo para visualizar el producto en tu espacio.' :'AR view would open here with device camera to visualize the product in your space.'
                }
              </p>
              <Button onClick={() => setShowAROverlay(false)}>
                {currentLanguage === 'es' ? 'Cerrar' : 'Close'}
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* 3D Overlay */}
      {show3DOverlay && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="bg-background rounded-lg p-6 max-w-md mx-4">
            <div className="text-center space-y-4">
              <Icon name="Box" size={48} className="mx-auto text-accent" />
              <h3 className="text-xl font-semibold text-foreground">3D View</h3>
              <p className="text-muted-foreground">
                {currentLanguage === 'es' ?'La vista 3D interactiva se mostraría aquí para explorar el producto desde todos los ángulos.' :'Interactive 3D view would be displayed here to explore the product from all angles.'
                }
              </p>
              <Button onClick={() => setShow3DOverlay(false)}>
                {currentLanguage === 'es' ? 'Cerrar' : 'Close'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;