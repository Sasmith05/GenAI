import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LanguageSelector = ({ currentLanguage = 'en', onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (languageCode) => {
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (event, languageCode) => {
    if (event?.key === 'Enter' || event?.key === ' ') {
      event?.preventDefault();
      handleLanguageSelect(languageCode);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Desktop Version */}
      <div className="hidden sm:block">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDropdown}
          className="flex items-center space-x-2 px-3 py-2"
        >
          <span className="text-lg">{currentLang?.flag}</span>
          <span className="text-sm font-caption">{currentLang?.name}</span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="transition-smooth"
          />
        </Button>
      </div>
      {/* Mobile Version */}
      <div className="sm:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDropdown}
          className="flex items-center space-x-1 px-2 py-2"
        >
          <span className="text-lg">{currentLang?.flag}</span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="transition-smooth"
          />
        </Button>
      </div>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-warm-lg z-50 animate-slide-in">
          <div className="py-2 max-h-64 overflow-y-auto">
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageSelect(language?.code)}
                onKeyDown={(e) => handleKeyDown(e, language?.code)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-smooth hover:bg-muted focus:bg-muted focus:outline-none ${
                  language?.code === currentLanguage 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-popover-foreground'
                }`}
                role="menuitem"
                tabIndex={0}
              >
                <span className="text-lg">{language?.flag}</span>
                <span className="text-sm font-caption flex-1">{language?.name}</span>
                {language?.code === currentLanguage && (
                  <Icon name="Check" size={16} color="var(--color-accent-foreground)" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;