import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import LanguageSelector from '../../components/ui/LanguageSelector';
import LoginForm from './components/LoginForm';
import SocialAuthButtons from './components/SocialAuthButtons';
import LoginHeader from './components/LoginHeader';
import LoginFooter from './components/LoginFooter';
import VoiceAssistant from './components/VoiceAssistant';
import Icon from '../../components/AppIcon';

const LoginPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Mock credentials for testing
  const mockCredentials = {
    customer: {
      email: 'customer@artisanhub.com',
      phone: '+1234567890',
      password: 'customer123'
    },
    seller: {
      email: 'seller@artisanhub.com',
      phone: '+0987654321',
      password: 'seller123'
    }
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('artisanhub_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('artisanhub_language', languageCode);
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setLoginError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check against mock credentials
      const { emailOrPhone, password } = formData;
      
      // Check customer credentials
      if ((emailOrPhone === mockCredentials?.customer?.email || 
           emailOrPhone === mockCredentials?.customer?.phone) && 
          password === mockCredentials?.customer?.password) {
        
        // Mock successful customer login
        localStorage.setItem('artisanhub_user', JSON.stringify({
          id: 'customer_001',
          name: 'Sarah Johnson',
          email: 'customer@artisanhub.com',
          role: 'customer',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        }));
        
        navigate('/customer-dashboard');
        return;
      }
      
      // Check seller credentials
      if ((emailOrPhone === mockCredentials?.seller?.email || 
           emailOrPhone === mockCredentials?.seller?.phone) && 
          password === mockCredentials?.seller?.password) {
        
        // Mock successful seller login
        localStorage.setItem('artisanhub_user', JSON.stringify({
          id: 'seller_001',
          name: 'Maria Rodriguez',
          email: 'seller@artisanhub.com',
          role: 'seller',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        }));
        
        navigate('/seller-dashboard');
        return;
      }
      
      // Invalid credentials
      setLoginError('Invalid email/phone or password. Please check your credentials and try again.');
      
    } catch (error) {
      setLoginError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    setLoginError('');

    try {
      // Simulate social auth delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social login (default to customer)
      localStorage.setItem('artisanhub_user', JSON.stringify({
        id: `${provider}_user_001`,
        name: 'John Smith',
        email: `user@${provider}.com`,
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }));
      
      navigate('/customer-dashboard');
      
    } catch (error) {
      setLoginError(`${provider} authentication failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const translations = {
    en: {
      pageTitle: 'Sign In - ArtisanHub',
      errorTitle: 'Authentication Error'
    },
    es: {
      pageTitle: 'Iniciar Sesión - ArtisanHub',
      errorTitle: 'Error de Autenticación'
    },
    fr: {
      pageTitle: 'Se Connecter - ArtisanHub',
      errorTitle: "Erreur d'Authentification"
    },
    de: {
      pageTitle: 'Anmelden - ArtisanHub',
      errorTitle: 'Authentifizierungsfehler'
    },
    it: {
      pageTitle: 'Accedi - ArtisanHub',
      errorTitle: 'Errore di Autenticazione'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MainNavigation isAuthenticated={false} />
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <BreadcrumbNavigation />
          
          {/* Language Selector */}
          <div className="flex justify-end mb-6">
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
          
          {/* Login Container */}
          <div className="flex justify-center py-8">
            <div className="w-full max-w-md">
              <div className="bg-card rounded-2xl shadow-warm-lg border border-border p-8">
                {/* Header */}
                <LoginHeader currentLanguage={currentLanguage} />
                
                {/* Error Message */}
                {loginError && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={20} color="var(--color-destructive)" />
                      <h4 className="text-sm font-medium text-destructive">
                        {t?.errorTitle}
                      </h4>
                    </div>
                    <p className="text-sm text-destructive mt-1 font-caption">
                      {loginError}
                    </p>
                  </div>
                )}
                
                {/* Login Form */}
                <LoginForm 
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                />
                
                {/* Social Auth */}
                <div className="mt-8">
                  <SocialAuthButtons 
                    onSocialAuth={handleSocialAuth}
                    isLoading={isLoading}
                  />
                </div>
                
                {/* Footer */}
                <LoginFooter currentLanguage={currentLanguage} />
              </div>
              
              {/* Voice Assistant */}
              <div className="mt-6">
                <VoiceAssistant 
                  currentLanguage={currentLanguage}
                  isEnabled={voiceEnabled}
                />
              </div>
              
              {/* Mock Credentials Info */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Info" size={16} color="var(--color-primary)" />
                  <h4 className="text-sm font-medium text-foreground">
                    Demo Credentials
                  </h4>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground font-caption">
                  <div>
                    <strong>Customer:</strong> customer@artisanhub.com / customer123
                  </div>
                  <div>
                    <strong>Seller:</strong> seller@artisanhub.com / seller123
                  </div>
                  <div>
                    <strong>Phone:</strong> +1234567890 (Customer) / +0987654321 (Seller)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;