import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MainNavigation from '../../components/ui/MainNavigation';
import LanguageSelector from '../../components/ui/LanguageSelector';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all dashboard components
import ProductManagementTable from './components/ProductManagementTable';
import ProductUploadArea from './components/ProductUploadArea';
import AnalyticsPanel from './components/AnalyticsPanel';
import ProfileEditingSection from './components/ProfileEditingSection';
import SocialMediaIntegration from './components/SocialMediaIntegration';
import RevenueTracking from './components/RevenueTracking';
import MultiLanguageContentManager from './components/MultiLanguageContentManager';

const SellerDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock seller data
  const sellerData = {
    name: 'Maria Rodriguez',
    email: 'maria@artisanhub.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    verified: true,
    joinDate: '2023-03-15',
    totalProducts: 24,
    totalSales: 156,
    rating: 4.8,
    revenue: 12847.50
  };

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'Handcrafted Ceramic Bowl',
      description: 'Beautiful ceramic bowl with traditional glazing techniques',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      status: 'active',
      views: 234,
      sales: 12,
      category: 'Pottery'
    },
    {
      id: 2,
      name: 'Sterling Silver Ring',
      description: 'Elegant handmade silver ring with intricate patterns',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      status: 'active',
      views: 189,
      sales: 8,
      category: 'Jewelry'
    },
    {
      id: 3,
      name: 'Woven Textile Scarf',
      description: 'Traditional woven scarf with vibrant colors',
      price: 32.50,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=300&h=300&fit=crop',
      status: 'draft',
      views: 67,
      sales: 3,
      category: 'Textiles'
    },
    {
      id: 4,
      name: 'Wooden Cutting Board',
      description: 'Handcrafted cutting board from sustainable wood',
      price: 28.75,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      status: 'sold',
      views: 145,
      sales: 15,
      category: 'Woodwork'
    }
  ];

  // Language content
  const content = {
    en: {
      title: 'Seller Dashboard - ArtisanHub',
      heading: 'Artisan Dashboard',
      welcome: `Welcome back, ${sellerData?.name}`,
      sections: {
        overview: 'Overview',
        products: 'Products',
        upload: 'Upload',
        analytics: 'Analytics',
        profile: 'Profile',
        social: 'Social Media',
        revenue: 'Revenue',
        languages: 'Languages'
      },
      stats: {
        products: 'Products',
        sales: 'Total Sales',
        rating: 'Rating',
        revenue: 'Revenue'
      }
    },
    es: {
      title: 'Panel del Vendedor - ArtisanHub',
      heading: 'Panel del Artesano',
      welcome: `Bienvenido de nuevo, ${sellerData?.name}`,
      sections: {
        overview: 'Resumen',
        products: 'Productos',
        upload: 'Subir',
        analytics: 'Análisis',
        profile: 'Perfil',
        social: 'Redes Sociales',
        revenue: 'Ingresos',
        languages: 'Idiomas'
      },
      stats: {
        products: 'Productos',
        sales: 'Ventas Totales',
        rating: 'Calificación',
        revenue: 'Ingresos'
      }
    },
    fr: {
      title: 'Tableau de Bord Vendeur - ArtisanHub',
      heading: 'Tableau de Bord Artisan',
      welcome: `Bon retour, ${sellerData?.name}`,
      sections: {
        overview: 'Aperçu',
        products: 'Produits',
        upload: 'Télécharger',
        analytics: 'Analyses',
        profile: 'Profil',
        social: 'Médias Sociaux',
        revenue: 'Revenus',
        languages: 'Langues'
      },
      stats: {
        products: 'Produits',
        sales: 'Ventes Totales',
        rating: 'Note',
        revenue: 'Revenus'
      }
    }
  };

  const currentContent = content?.[currentLanguage] || content?.en;

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && content?.[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  const handleProductEdit = (productId) => {
    console.log('Edit product:', productId);
    // Navigate to product edit page or open modal
  };

  const handleProductToggleStatus = (productId) => {
    console.log('Toggle product status:', productId);
    // Update product status
  };

  const handleProductAnalytics = (productId) => {
    console.log('View product analytics:', productId);
    setActiveSection('analytics');
  };

  const handleSocialPost = (productId) => {
    console.log('Social media post for product:', productId);
    setActiveSection('social');
  };

  const handleProductUpload = (productData) => {
    console.log('Upload new product:', productData);
    // Handle product upload
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const sidebarSections = [
    { id: 'overview', icon: 'LayoutDashboard', label: currentContent?.sections?.overview },
    { id: 'products', icon: 'Package', label: currentContent?.sections?.products },
    { id: 'upload', icon: 'Upload', label: currentContent?.sections?.upload },
    { id: 'analytics', icon: 'BarChart3', label: currentContent?.sections?.analytics },
    { id: 'profile', icon: 'User', label: currentContent?.sections?.profile },
    { id: 'social', icon: 'Share2', label: currentContent?.sections?.social },
    { id: 'revenue', icon: 'DollarSign', label: currentContent?.sections?.revenue },
    { id: 'languages', icon: 'Globe', label: currentContent?.sections?.languages }
  ];

  const renderOverviewSection = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6 shadow-warm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{sellerData?.totalProducts}</p>
              <p className="text-sm text-muted-foreground">{currentContent?.stats?.products}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 shadow-warm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="ShoppingCart" size={24} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{sellerData?.totalSales}</p>
              <p className="text-sm text-muted-foreground">{currentContent?.stats?.sales}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 shadow-warm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Star" size={24} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{sellerData?.rating}</p>
              <p className="text-sm text-muted-foreground">{currentContent?.stats?.rating}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 shadow-warm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={24} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">
                {formatCurrency(sellerData?.revenue)}
              </p>
              <p className="text-sm text-muted-foreground">{currentContent?.stats?.revenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-warm">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            onClick={() => setActiveSection('upload')}
            iconName="Plus"
            iconPosition="left"
            fullWidth
          >
            Add Product
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveSection('analytics')}
            iconName="BarChart3"
            iconPosition="left"
            fullWidth
          >
            View Analytics
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveSection('social')}
            iconName="Share2"
            iconPosition="left"
            fullWidth
          >
            Social Media
          </Button>
          <Button
            variant="outline"
            onClick={() => setActiveSection('revenue')}
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <ProductManagementTable
        products={mockProducts?.slice(0, 3)}
        onEditProduct={handleProductEdit}
        onToggleStatus={handleProductToggleStatus}
        onViewAnalytics={handleProductAnalytics}
        onSocialPost={handleSocialPost}
      />
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverviewSection();
      case 'products':
        return (
          <ProductManagementTable
            products={mockProducts}
            onEditProduct={handleProductEdit}
            onToggleStatus={handleProductToggleStatus}
            onViewAnalytics={handleProductAnalytics}
            onSocialPost={handleSocialPost}
          />
        );
      case 'upload':
        return <ProductUploadArea onProductUpload={handleProductUpload} />;
      case 'analytics':
        return <AnalyticsPanel />;
      case 'profile':
        return <ProfileEditingSection />;
      case 'social':
        return <SocialMediaIntegration />;
      case 'revenue':
        return <RevenueTracking />;
      case 'languages':
        return <MultiLanguageContentManager />;
      default:
        return renderOverviewSection();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentContent?.title}</title>
        <meta name="description" content="Manage your artisan business with comprehensive tools for product management, analytics, and customer engagement." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <MainNavigation
          isAuthenticated={true}
          userRole="seller"
          userName={sellerData?.name}
        />

        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between py-6 border-b border-border">
              <div>
                <BreadcrumbNavigation />
                <h1 className="text-3xl font-bold text-foreground mt-2">
                  {currentContent?.heading}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {currentContent?.welcome}
                </p>
              </div>
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>

            <div className="flex gap-6 py-6">
              {/* Sidebar */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="bg-card rounded-lg border border-border shadow-warm p-4 sticky top-24">
                  <nav className="space-y-2">
                    {sidebarSections?.map((section) => (
                      <button
                        key={section?.id}
                        onClick={() => setActiveSection(section?.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-smooth ${
                          activeSection === section?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon name={section?.icon} size={18} />
                        <span className="text-sm font-medium">{section?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Mobile Section Selector */}
              <div className="lg:hidden w-full mb-6">
                <select
                  value={activeSection}
                  onChange={(e) => setActiveSection(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {sidebarSections?.map((section) => (
                    <option key={section?.id} value={section?.id}>
                      {section?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;