import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = ({ currentLanguage = 'en' }) => {
  const translations = {
    en: {
      welcome: 'Welcome Back',
      subtitle: 'Sign in to your ArtisanHub account',
      description: 'Discover unique handcrafted products and connect with talented artisans from around the world.'
    },
    es: {
      welcome: 'Bienvenido de Nuevo',
      subtitle: 'Inicia sesión en tu cuenta de ArtisanHub',
      description: 'Descubre productos artesanales únicos y conecta con talentosos artesanos de todo el mundo.'
    },
    fr: {
      welcome: 'Bon Retour',
      subtitle: 'Connectez-vous à votre compte ArtisanHub',
      description: 'Découvrez des produits artisanaux uniques et connectez-vous avec des artisans talentueux du monde entier.'
    },
    de: {
      welcome: 'Willkommen Zurück',
      subtitle: 'Melden Sie sich bei Ihrem ArtisanHub-Konto an',
      description: 'Entdecken Sie einzigartige handgefertigte Produkte und verbinden Sie sich mit talentierten Handwerkern aus aller Welt.'
    },
    it: {
      welcome: 'Bentornato',
      subtitle: 'Accedi al tuo account ArtisanHub',
      description: 'Scopri prodotti artigianali unici e connettiti con artigiani talentuosi da tutto il mondo.'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  return (
    <div className="text-center space-y-4 mb-8">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-warm">
          <Icon name="Palette" size={32} color="var(--color-primary-foreground)" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {t?.welcome}
        </h1>
        <p className="text-lg text-muted-foreground font-caption">
          {t?.subtitle}
        </p>
      </div>
      <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        {t?.description}
      </p>
    </div>
  );
};

export default LoginHeader;