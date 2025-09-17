import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialAuthButtons = ({ onSocialAuth, isLoading = false }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      bgColor: 'bg-black hover:bg-gray-900',
      textColor: 'text-white',
      borderColor: 'border-black'
    }
  ];

  const handleSocialAuth = (provider) => {
    if (onSocialAuth) {
      onSocialAuth(provider);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-caption">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            type="button"
            onClick={() => handleSocialAuth(provider?.id)}
            disabled={isLoading}
            className={`
              flex items-center justify-center px-4 py-3 rounded-lg border transition-smooth
              ${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor}
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            `}
          >
            <Icon 
              name={provider?.icon} 
              size={20} 
              className="mr-2 sm:mr-0" 
            />
            <span className="text-sm font-medium sm:hidden ml-2">
              {provider?.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuthButtons;