// frontend/src/pages/login/components/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import LoginFooter from './LoginFooter';
import VoiceAssistant from './VoiceAssistant';
import Icon from '../../../components/AppIcon';
import BreadcrumbNavigation from '../../../components/ui/BreadcrumbNavigation';
import LanguageSelector from '../../../components/ui/LanguageSelector';

const LoginPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('artisanhub_language');
    if (savedLanguage) setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('artisanhub_language', languageCode);
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message || 'Login failed');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('artisanhub_user', JSON.stringify(data.user));
      localStorage.setItem('artisanhub_token', data.token);

      if (data.user.role === 'customer') navigate('/customer-dashboard');
      else if (data.user.role === 'seller') navigate('/seller-dashboard');
    } catch (err) {
      console.error(err);
      setLoginError('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const translations = {
    en: { pageTitle: 'Sign In - ArtisanHub', errorTitle: 'Authentication Error' },
    es: { pageTitle: 'Iniciar Sesión - ArtisanHub', errorTitle: 'Error de Autenticación' },
    fr: { pageTitle: 'Se Connecter - ArtisanHub', errorTitle: "Erreur d'Authentification" },
    de: { pageTitle: 'Anmelden - ArtisanHub', errorTitle: 'Authentifizierungsfehler' },
    it: { pageTitle: 'Accedi - ArtisanHub', errorTitle: 'Errore di Autenticazione' },
  };

  const t = translations[currentLanguage] || translations.en;

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNavigation />

          <div className="flex justify-end mb-6">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>

          <div className="flex justify-center py-8">
            <div className="w-full max-w-md">
              <div className="bg-card rounded-2xl shadow-warm-lg border border-border p-8">
                <LoginHeader currentLanguage={currentLanguage} />

                {loginError && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={20} color="var(--color-destructive)" />
                      <h4 className="text-sm font-medium text-destructive">{t.errorTitle}</h4>
                    </div>
                    <p className="text-sm text-destructive mt-1 font-caption">{loginError}</p>
                  </div>
                )}

                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

                <LoginFooter currentLanguage={currentLanguage} />
              </div>

              <div className="mt-6">
                <VoiceAssistant currentLanguage={currentLanguage} isEnabled={voiceEnabled} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
