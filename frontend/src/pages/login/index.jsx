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

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('artisanhub_language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('artisanhub_language', languageCode);
  };

  // Main login handler (API only)
  const handleLogin = async (formData) => {
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // expects { emailOrPhone, password }
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message || 'Login failed');
        return;
      }

      // Save JWT token & user info
      localStorage.setItem('artisanhub_user', JSON.stringify(data.user));
      localStorage.setItem('artisanhub_token', data.token);

      // Redirect based on role
      if (data.user.role === 'customer') navigate('/customer-dashboard');
      else if (data.user.role === 'seller') navigate('/seller-dashboard');
      else navigate('/');
    } catch (err) {
      console.error(err);
      setLoginError('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Social authentication (still mocked here)
  const handleSocialAuth = async (provider) => {
    setIsLoading(true);
    setLoginError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Example: treat social login as customer
      localStorage.setItem(
        'artisanhub_user',
        JSON.stringify({
          id: `${provider}_user_001`,
          name: 'John Smith',
          email: `user@${provider}.com`,
          role: 'customer',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        })
      );

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
      errorTitle: 'Authentication Error',
    },
    es: {
      pageTitle: 'Iniciar Sesión - ArtisanHub',
      errorTitle: 'Error de Autenticación',
    },
    fr: {
      pageTitle: 'Se Connecter - ArtisanHub',
      errorTitle: "Erreur d'Authentification",
    },
    de: {
      pageTitle: 'Anmelden - ArtisanHub',
      errorTitle: 'Authentifizierungsfehler',
    },
    it: {
      pageTitle: 'Accedi - ArtisanHub',
      errorTitle: 'Errore di Autenticazione',
    },
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
                      <Icon
                        name="AlertCircle"
                        size={20}
                        color="var(--color-destructive)"
                      />
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
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
