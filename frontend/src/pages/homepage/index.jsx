import React, { useState, useEffect } from 'react';
import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import HeroBanner from './components/HeroBanner';
import TrendingProducts from './components/TrendingProducts';
import PromotionalSection from './components/PromotionalSection';
import LanguageToggle from './components/LanguageToggle';
import ChatbotWidget from './components/ChatbotWidget';
import Icon from '../../components/AppIcon';

const Homepage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Handle language change
  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  // Mock authentication check (in real app, this would come from context/auth service)
  useEffect(() => {
    const mockAuth = localStorage.getItem('mockAuth');
    const mockUser = localStorage.getItem('mockUser');
    
    if (mockAuth && mockUser) {
      const userData = JSON.parse(mockUser);
      setIsAuthenticated(true);
      setUserRole(userData?.role);
      setUserName(userData?.name);
    }
  }, []);

  const content = {
    en: {
      pageTitle: "ArtisanHub - Discover Authentic Handcrafted Treasures",
      metaDescription: "Connect with skilled artisans worldwide and explore unique handcrafted products with AI-enhanced 3D/AR viewing experience.",
      footerText: "Connecting artisans with the world, one handcrafted piece at a time.",
      footerCopyright: `© ${new Date()?.getFullYear()} ArtisanHub. All rights reserved.`,
      footerLinks: {
        about: "About Us",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        help: "Help Center"
      }
    },
    es: {
      pageTitle: "ArtisanHub - Descubre Tesoros Auténticos Hechos a Mano",
      metaDescription: "Conecta con artesanos expertos de todo el mundo y explora productos únicos hechos a mano con experiencia de visualización 3D/AR mejorada por IA.",
      footerText: "Conectando artesanos con el mundo, una pieza hecha a mano a la vez.",
      footerCopyright: `© ${new Date()?.getFullYear()} ArtisanHub. Todos los derechos reservados.`,
      footerLinks: {
        about: "Acerca de Nosotros",
        contact: "Contacto",
        privacy: "Política de Privacidad",
        terms: "Términos de Servicio",
        help: "Centro de Ayuda"
      }
    },
    fr: {
      pageTitle: "ArtisanHub - Découvrez des Trésors Authentiques Faits Main",
      metaDescription: "Connectez-vous avec des artisans qualifiés du monde entier et explorez des produits uniques faits main avec une expérience de visualisation 3D/AR améliorée par l'IA.",
      footerText: "Connecter les artisans au monde, une pièce artisanale à la fois.",
      footerCopyright: `© ${new Date()?.getFullYear()} ArtisanHub. Tous droits réservés.`,
      footerLinks: {
        about: "À Propos",
        contact: "Contact",
        privacy: "Politique de Confidentialité",
        terms: "Conditions de Service",
        help: "Centre d\'Aide"
      }
    }
  };

  const currentContent = content?.[currentLanguage] || content?.en;

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
        {/* Top Bar with Language Toggle */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
              <BreadcrumbNavigation />
              <LanguageToggle 
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HeroBanner currentLanguage={currentLanguage} />
          </div>
        </section>

        {/* Trending Products Section */}
        <TrendingProducts currentLanguage={currentLanguage} />

        {/* Promotional Section */}
        <PromotionalSection currentLanguage={currentLanguage} />

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                {currentLanguage === 'es' ?'Experiencia Mejorada por IA'
                  : currentLanguage === 'fr' ?'Expérience Améliorée par IA' :'AI-Enhanced Experience'
                }
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {currentLanguage === 'es' ?'Descubre características innovadoras que hacen que comprar productos artesanales sea más inmersivo y accesible'
                  : currentLanguage === 'fr' ?'Découvrez des fonctionnalités innovantes qui rendent l\'achat de produits artisanaux plus immersif et accessible'
                  : 'Discover innovative features that make shopping for artisan products more immersive and accessible'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: 'Box',
                  title: currentLanguage === 'es' ? 'Vista 3D' : currentLanguage === 'fr' ? 'Vue 3D' : '3D Viewing',
                  description: currentLanguage === 'es' ?'Explora productos desde todos los ángulos con nuestra tecnología de visualización 3D'
                    : currentLanguage === 'fr' ?'Explorez les produits sous tous les angles avec notre technologie de visualisation 3D' :'Explore products from every angle with our 3D visualization technology'
                },
                {
                  icon: 'Smartphone',
                  title: currentLanguage === 'es' ? 'Realidad Aumentada' : currentLanguage === 'fr' ? 'Réalité Augmentée' : 'Augmented Reality',
                  description: currentLanguage === 'es' ?'Coloca virtualmente productos en tu espacio antes de comprar'
                    : currentLanguage === 'fr' ?'Placez virtuellement les produits dans votre espace avant d\'acheter' :'Virtually place products in your space before purchasing'
                },
                {
                  icon: 'Volume2',
                  title: currentLanguage === 'es' ? 'Texto a Voz' : currentLanguage === 'fr' ? 'Texte vers Parole' : 'Text-to-Speech',
                  description: currentLanguage === 'es' ?'Escucha descripciones de productos e historias de artesanos'
                    : currentLanguage === 'fr' ?'Écoutez les descriptions de produits et les histoires d\'artisans' :'Listen to product descriptions and artisan stories'
                },
                {
                  icon: 'MessageCircle',
                  title: currentLanguage === 'es' ? 'Asistente IA' : currentLanguage === 'fr' ? 'Assistant IA' : 'AI Assistant',
                  description: currentLanguage === 'es' ?'Obtén ayuda personalizada para navegar y encontrar productos perfectos'
                    : currentLanguage === 'fr' ?'Obtenez une aide personnalisée pour naviguer et trouver des produits parfaits' :'Get personalized help navigating and finding perfect products'
                }
              ]?.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-smooth">
                    <Icon name={feature?.icon} size={32} className="text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {feature?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Palette" size={20} color="var(--color-primary-foreground)" />
                </div>
                <span className="text-xl font-heading font-semibold text-foreground">ArtisanHub</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                {currentContent?.footerText}
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'Youtube']?.map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-background border border-border rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-smooth"
                  >
                    <Icon name={social} size={18} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">
                {currentLanguage === 'es' ? 'Enlaces Rápidos' : currentLanguage === 'fr' ? 'Liens Rapides' : 'Quick Links'}
              </h3>
              <ul className="space-y-2">
                {Object.entries(currentContent?.footerLinks)?.map(([key, label]) => (
                  <li key={key}>
                    <button className="text-muted-foreground hover:text-foreground transition-smooth text-sm">
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">
                {currentLanguage === 'es' ? 'Contacto' : currentLanguage === 'fr' ? 'Contact' : 'Contact'}
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>hello@artisanhub.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {currentContent?.footerCopyright}
            </p>
          </div>
        </div>
      </footer>
      {/* Chatbot Widget */}
      <ChatbotWidget currentLanguage={currentLanguage} />
    </div>
  );
};

export default Homepage;