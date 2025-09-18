import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ 
  onSocialRegister, 
  isLoading = false,
  currentLanguage = 'en' 
}) => {
  const content = {
    en: {
      continueWith: "Or continue with",
      google: "Continue with Google",
      facebook: "Continue with Facebook",
      apple: "Continue with Apple",
      twitter: "Continue with Twitter"
    },
    es: {
      continueWith: "O continúa con",
      google: "Continuar con Google",
      facebook: "Continuar con Facebook",
      apple: "Continuar con Apple",
      twitter: "Continuar con Twitter"
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const socialProviders = [
    {
      name: 'google',
      label: t?.google,
      icon: 'Chrome',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
    },
    {
      name: 'facebook',
      label: t?.facebook,
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    {
      name: 'apple',
      label: t?.apple,
      icon: 'Apple',
      color: 'bg-black hover:bg-gray-800 text-white'
    },
    {
      name: 'twitter',
      label: t?.twitter,
      icon: 'Twitter',
      color: 'bg-sky-500 hover:bg-sky-600 text-white'
    }
  ];

  const handleSocialClick = (provider) => {
    if (onSocialRegister) {
      onSocialRegister(provider);
    }
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-caption">
            {t?.continueWith}
          </span>
        </div>
      </div>
      {/* Social Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.name}
            onClick={() => handleSocialClick(provider?.name)}
            disabled={isLoading}
            className={`flex items-center justify-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${provider?.color}`}
          >
            <Icon name={provider?.icon} size={20} />
            <span className="hidden sm:inline">{provider?.label}</span>
            <span className="sm:hidden">
              {provider?.name?.charAt(0)?.toUpperCase() + provider?.name?.slice(1)}
            </span>
          </button>
        ))}
      </div>
      {/* Privacy Notice */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground font-caption leading-relaxed">
          By continuing with social login, you agree to our Terms of Service and acknowledge our Privacy Policy. 
          Your social account information will be used to create your ArtisanHub profile.
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;