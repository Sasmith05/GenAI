import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import LanguageSelector from '../../components/ui/LanguageSelector';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

import RoleSelectionCard from './components/RoleSelectionCard';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import ProgressIndicator from './components/ProgressIndicator';
import VoiceAssistant from './components/VoiceAssistant';

const Registration = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);
  };

  const content = {
    en: {
      title: "Join ArtisanHub",
      subtitle: "Connect with artisans and discover unique handcrafted treasures",
      chooseRole: "Choose Your Role",
      roleDescription: "Select how you\'d like to use ArtisanHub. You can always change this later in your profile settings.",
      customer: {
        title: "Customer",
        description: "Discover and purchase unique handcrafted products from talented artisans around the world.",
        benefits: [
          "Browse thousands of unique handcrafted items",
          "Connect directly with artisans",
          "Access exclusive collections and limited editions",
          "Enjoy personalized recommendations",
          "Experience 3D/AR product visualization"
        ]
      },
      seller: {
        title: "Artisan",
        description: "Showcase your craftsmanship and connect with customers who appreciate handmade quality.",
        benefits: [
          "Create your professional artisan profile",
          "Upload and enhance product images with AI",
          "Access analytics and customer insights",
          "Generate automatic product stories",
          "Integrate with social media platforms"
        ]
      },
      alreadyHaveAccount: "Already have an account?",
      signIn: "Sign In",
      backToRole: "Back to Role Selection",
      nextStep: "Continue",
      voiceAssistance: "Voice Assistance",
      toggleVoice: "Toggle Voice Assistant"
    },
    es: {
      title: "Únete a ArtisanHub",
      subtitle: "Conéctate con artesanos y descubre tesoros únicos hechos a mano",
      chooseRole: "Elige Tu Rol",
      roleDescription: "Selecciona cómo te gustaría usar ArtisanHub. Siempre puedes cambiar esto más tarde en la configuración de tu perfil.",
      customer: {
        title: "Cliente",
        description: "Descubre y compra productos únicos hechos a mano de artesanos talentosos de todo el mundo.",
        benefits: [
          "Explora miles de artículos únicos hechos a mano",
          "Conéctate directamente con artesanos",
          "Accede a colecciones exclusivas y ediciones limitadas",
          "Disfruta de recomendaciones personalizadas",
          "Experimenta visualización de productos en 3D/AR"
        ]
      },
      seller: {
        title: "Artesano",
        description: "Muestra tu artesanía y conéctate con clientes que aprecian la calidad hecha a mano.",
        benefits: [
          "Crea tu perfil profesional de artesano",
          "Sube y mejora imágenes de productos con IA",
          "Accede a análisis e insights de clientes",
          "Genera historias automáticas de productos",
          "Integra con plataformas de redes sociales"
        ]
      },
      alreadyHaveAccount: "¿Ya tienes una cuenta?",
      signIn: "Iniciar Sesión",
      backToRole: "Volver a Selección de Rol",
      nextStep: "Continuar",
      voiceAssistance: "Asistencia de Voz",
      toggleVoice: "Alternar Asistente de Voz"
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setCurrentStep(2);
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate Firebase registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const userData = {
        id: Date.now(),
        ...formData,
        role: selectedRole,
        createdAt: new Date()?.toISOString(),
        isVerified: false
      };

      // Store user data (in real app, this would be handled by Firebase)
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', selectedRole);

      // Navigate based on role
      if (selectedRole === 'customer') {
        navigate('/customer-dashboard');
      } else {
        navigate('/seller-dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegistration = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social registration
      const userData = {
        id: Date.now(),
        firstName: 'John',
        lastName: 'Doe',
        email: `john.doe@${provider}.com`,
        role: selectedRole,
        provider: provider,
        createdAt: new Date()?.toISOString(),
        isVerified: true
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', selectedRole);

      if (selectedRole === 'customer') {
        navigate('/customer-dashboard');
      } else {
        navigate('/seller-dashboard');
      }
    } catch (error) {
      console.error('Social registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceCommand = (command) => {
    switch (command) {
      case 'nextStep':
        if (currentStep === 1 && selectedRole) {
          setCurrentStep(2);
        }
        break;
      case 'previousStep':
        if (currentStep === 2) {
          setCurrentStep(1);
        }
        break;
      default:
        break;
    }
  };

  const customBreadcrumbs = [
    { label: 'Home', path: '/homepage' },
    { label: 'Join Now', path: '/registration' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MainNavigation />
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />
            <div className="flex items-center space-x-4">
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVoiceAssistant(!showVoiceAssistant)}
                iconName="Mic"
                className="hidden sm:flex"
              >
                {t?.toggleVoice}
              </Button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <ProgressIndicator 
              currentStep={currentStep}
              totalSteps={3}
              currentLanguage={currentLanguage}
            />
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <Icon name="Palette" size={32} color="var(--color-primary-foreground)" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t?.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t?.subtitle}
            </p>
          </div>

          {/* Voice Assistant */}
          {showVoiceAssistant && (
            <div className="mb-8">
              <VoiceAssistant
                currentLanguage={currentLanguage}
                onVoiceCommand={handleVoiceCommand}
              />
            </div>
          )}

          {/* Step 1: Role Selection */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  {t?.chooseRole}
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  {t?.roleDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <RoleSelectionCard
                  role="customer"
                  title={t?.customer?.title}
                  description={t?.customer?.description}
                  benefits={t?.customer?.benefits}
                  icon="ShoppingBag"
                  isSelected={selectedRole === 'customer'}
                  onSelect={handleRoleSelection}
                />

                <RoleSelectionCard
                  role="seller"
                  title={t?.seller?.title}
                  description={t?.seller?.description}
                  benefits={t?.seller?.benefits}
                  icon="Store"
                  isSelected={selectedRole === 'seller'}
                  onSelect={handleRoleSelection}
                />
              </div>

              {selectedRole && (
                <div className="text-center">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => setCurrentStep(2)}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {t?.nextStep}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Registration Form */}
          {currentStep === 2 && selectedRole && (
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Back Button */}
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep(1)}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  {t?.backToRole}
                </Button>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name={selectedRole === 'customer' ? 'ShoppingBag' : 'Store'} size={16} />
                  <span>
                    {selectedRole === 'customer' ? t?.customer?.title : t?.seller?.title}
                  </span>
                </div>
              </div>

              {/* Registration Form */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-warm">
                <RegistrationForm
                  selectedRole={selectedRole}
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                  currentLanguage={currentLanguage}
                />
              </div>

              {/* Social Registration */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-warm">
                <SocialRegistration
                  onSocialRegister={handleSocialRegistration}
                  isLoading={isLoading}
                  currentLanguage={currentLanguage}
                />
              </div>
            </div>
          )}

          {/* Sign In Link */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-muted-foreground">
              {t?.alreadyHaveAccount}{' '}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {t?.signIn}
              </Link>
            </p>
          </div>
        </div>
      </main>
      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Registration;