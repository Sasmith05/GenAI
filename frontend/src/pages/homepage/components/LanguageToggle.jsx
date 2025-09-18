import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageToggle = ({ currentLanguage = 'en', onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' }
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
      {/* Language Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background hover:border-border"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-sm font-caption">
          {currentLang?.nativeName}
        </span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="transition-smooth"
        />
      </Button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-xl shadow-warm-lg z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Choose Language
              </span>
            </div>
          </div>

          {/* Language Options */}
          <div className="py-2 max-h-64 overflow-y-auto">
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageSelect(language?.code)}
                onKeyDown={(e) => handleKeyDown(e, language?.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-smooth hover:bg-muted focus:bg-muted focus:outline-none ${
                  language?.code === currentLanguage 
                    ? 'bg-accent/10 text-accent-foreground border-r-2 border-accent' 
                    : 'text-popover-foreground'
                }`}
                role="menuitem"
                tabIndex={0}
              >
                <span className="text-lg">{language?.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">
                      {language?.nativeName}
                    </span>
                    {language?.code === currentLanguage && (
                      <Icon name="Check" size={16} className="text-accent flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {language?.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-border bg-muted/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="Info" size={12} />
              <span>Language changes apply instantly</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;