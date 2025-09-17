import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MultiLanguageContentManager = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedProduct, setSelectedProduct] = useState('pottery-bowl-001');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', progress: 100 },
    { code: 'es', name: 'Español', flag: '🇪🇸', progress: 85 },
    { code: 'fr', name: 'Français', flag: '🇫🇷', progress: 60 },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', progress: 40 },
    { code: 'ja', name: '日本語', flag: '🇯🇵', progress: 20 }
  ];

  const products = [
    { id: 'pottery-bowl-001', name: 'Handcrafted Ceramic Bowl', category: 'Pottery' },
    { id: 'silver-ring-002', name: 'Sterling Silver Ring', category: 'Jewelry' },
    { id: 'woven-scarf-003', name: 'Traditional Woven Scarf', category: 'Textiles' }
  ];

  const [contentData, setContentData] = useState({
    en: {
      name: 'Handcrafted Ceramic Bowl',
      description: 'Beautiful handmade ceramic bowl featuring traditional glazing techniques. Perfect for serving or decorative purposes.',
      story: `This ceramic bowl represents hours of careful craftsmanship, using techniques passed down through generations. Each piece is unique, with subtle variations that make it truly one-of-a-kind.`,
      tags: ['handmade', 'ceramic', 'pottery', 'traditional', 'unique']
    },
    es: {
      name: 'Cuenco de Cerámica Artesanal',
      description: 'Hermoso cuenco de cerámica hecho a mano con técnicas tradicionales de esmaltado. Perfecto para servir o propósitos decorativos.',
      story: `Este cuenco de cerámica representa horas de artesanía cuidadosa, utilizando técnicas transmitidas a través de generaciones. Cada pieza es única, con variaciones sutiles que la hacen verdaderamente única.`,
      tags: ['hecho a mano', 'cerámica', 'alfarería', 'tradicional', 'único']
    },
    fr: {
      name: 'Bol en Céramique Artisanale',
      description: 'Magnifique bol en céramique fait main avec des techniques de glaçage traditionnelles. Parfait pour servir ou à des fins décoratives.',
      story: `Ce bol en céramique représente des heures d'artisanat soigneux, utilisant des techniques transmises à travers les générations. Chaque pièce est unique, avec des variations subtiles qui la rendent vraiment unique.`,
      tags: ['fait main', 'céramique', 'poterie', 'traditionnel', 'unique']
    },
    de: {
      name: 'Handgefertigte Keramikschale',description: 'Schöne handgefertigte Keramikschale mit traditionellen Glasurtechniken. Perfekt zum Servieren oder für dekorative Zwecke.',story: '',
      tags: ['handgemacht', 'keramik', 'töpferei', 'traditionell', 'einzigartig']
    },
    ja: {
      name: '手作りセラミックボウル',description: '伝統的な釉薬技法を使用した美しい手作りセラミックボウル。',story: '',
      tags: ['手作り', 'セラミック', '陶器', '伝統的', 'ユニーク']
    }
  });

  const handleContentChange = (field, value) => {
    setContentData(prev => ({
      ...prev,
      [selectedLanguage]: {
        ...prev?.[selectedLanguage],
        [field]: value
      }
    }));
  };

  const handleTagsChange = (value) => {
    const tags = value?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag);
    handleContentChange('tags', tags);
  };

  const translateContent = async (targetLanguage) => {
    // Simulate AI translation
    const sourceContent = contentData?.[selectedLanguage];
    
    // Mock translation based on target language
    const mockTranslations = {
      es: {
        name: 'Cuenco de Cerámica Artesanal (Traducido)',
        description: 'Hermoso cuenco de cerámica hecho a mano con técnicas tradicionales de esmaltado. (Traducción automática)',
        story: 'Historia del producto traducida automáticamente...'
      },
      fr: {
        name: 'Bol en Céramique Artisanale (Traduit)',
        description: 'Magnifique bol en céramique fait main avec des techniques de glaçage traditionnelles. (Traduction automatique)',
        story: 'Histoire du produit traduite automatiquement...'
      },
      de: {
        name: 'Handgefertigte Keramikschale (Übersetzt)',
        description: 'Schöne handgefertigte Keramikschale mit traditionellen Glasurtechniken. (Automatische Übersetzung)',
        story: 'Automatisch übersetzte Produktgeschichte...'
      },
      ja: {
        name: '手作りセラミックボウル（翻訳済み）',
        description: '伝統的な釉薬技法を使用した美しい手作りセラミックボウル。（自動翻訳）',
        story: '自動翻訳された製品ストーリー...'
      }
    };

    if (mockTranslations?.[targetLanguage]) {
      setContentData(prev => ({
        ...prev,
        [targetLanguage]: {
          ...prev?.[targetLanguage],
          ...mockTranslations?.[targetLanguage]
        }
      }));
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-destructive';
  };

  const currentContent = contentData?.[selectedLanguage] || {};

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Multi-Language Content</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage product descriptions in multiple languages
            </p>
          </div>
          <Button variant="outline" iconName="Globe" iconPosition="left">
            Add Language
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Product Selector */}
        <div>
          <label className="text-sm font-medium text-card-foreground mb-2 block">
            Select Product
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {products?.map((product) => (
              <option key={product?.id} value={product?.id}>
                {product?.name} ({product?.category})
              </option>
            ))}
          </select>
        </div>

        {/* Language Progress Overview */}
        <div>
          <h4 className="font-medium text-card-foreground mb-4">Translation Progress</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages?.map((language) => (
              <div
                key={language?.code}
                className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                  selectedLanguage === language?.code
                    ? 'border-primary bg-primary/5' :'border-border bg-background hover:border-primary/50'
                }`}
                onClick={() => setSelectedLanguage(language?.code)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{language?.flag}</span>
                    <span className="font-medium text-card-foreground">{language?.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{language?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-smooth ${getProgressColor(language?.progress)}`}
                    style={{ width: `${language?.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-background rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{languages?.find(l => l?.code === selectedLanguage)?.flag}</span>
              <h4 className="font-medium text-card-foreground">
                {languages?.find(l => l?.code === selectedLanguage)?.name} Content
              </h4>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => translateContent(selectedLanguage)}
                iconName="Languages"
                iconPosition="left"
              >
                AI Translate
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Save"
                iconPosition="left"
              >
                Save
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Product Name"
              type="text"
              value={currentContent?.name || ''}
              onChange={(e) => handleContentChange('name', e?.target?.value)}
              placeholder="Enter product name"
            />

            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Description
              </label>
              <textarea
                className="w-full min-h-[100px] p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                value={currentContent?.description || ''}
                onChange={(e) => handleContentChange('description', e?.target?.value)}
                placeholder="Enter product description"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Product Story
              </label>
              <textarea
                className="w-full min-h-[120px] p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                value={currentContent?.story || ''}
                onChange={(e) => handleContentChange('story', e?.target?.value)}
                placeholder="Tell the story behind your product"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-card-foreground mb-2 block">
                Tags (comma-separated)
              </label>
              <Input
                type="text"
                value={currentContent?.tags?.join(', ') || ''}
                onChange={(e) => handleTagsChange(e?.target?.value)}
                placeholder="handmade, ceramic, pottery, traditional"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {currentContent?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Translation Tools */}
        <div className="bg-background rounded-lg border border-border p-4">
          <h4 className="font-medium text-card-foreground mb-4">Translation Tools</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-muted-foreground">Quick Actions</h5>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" iconName="Copy">
                  Copy from English
                </Button>
                <Button variant="outline" size="sm" iconName="RotateCcw">
                  Reset Changes
                </Button>
                <Button variant="outline" size="sm" iconName="Eye">
                  Preview
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-muted-foreground">Bulk Operations</h5>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" iconName="Languages">
                  Translate All
                </Button>
                <Button variant="outline" size="sm" iconName="Download">
                  Export
                </Button>
                <Button variant="outline" size="sm" iconName="Upload">
                  Import
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <Icon name="Globe" size={20} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-card-foreground">{languages?.length}</p>
            <p className="text-sm text-muted-foreground">Languages</p>
          </div>
          
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <Icon name="Package" size={20} className="text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-card-foreground">{products?.length}</p>
            <p className="text-sm text-muted-foreground">Products</p>
          </div>
          
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <Icon name="CheckCircle" size={20} className="text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-card-foreground">
              {Math.round(languages?.reduce((sum, lang) => sum + lang?.progress, 0) / languages?.length)}%
            </p>
            <p className="text-sm text-muted-foreground">Avg. Complete</p>
          </div>
          
          <div className="text-center p-4 bg-background rounded-lg border border-border">
            <Icon name="TrendingUp" size={20} className="text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-card-foreground">+23%</p>
            <p className="text-sm text-muted-foreground">Intl. Sales</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiLanguageContentManager;