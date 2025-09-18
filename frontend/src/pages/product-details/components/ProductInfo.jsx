import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ 
  product = {}, 
  currentLanguage = 'en',
  onAddToCart = () => {},
  onAddToWishlist = () => {},
  onShare = () => {},
  onTextToSpeech = () => {}
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Mock product data with multi-language support
  const productData = {
    en: {
      name: "Handcrafted Ceramic Vase",
      price: 89.99,
      currency: "USD",
      description: `This exquisite ceramic vase showcases traditional pottery techniques passed down through generations. Each piece is individually hand-thrown and glazed, making every vase unique with subtle variations in color and texture.\n\nCrafted from high-quality stoneware clay, this vase features a beautiful earth-tone glaze that complements any home decor. The elegant silhouette and smooth finish make it perfect for displaying fresh flowers or as a standalone decorative piece.`,
      story: `Created in the heart of Tuscany by master potter Maria Rossi, this vase represents over 30 years of dedication to the ceramic arts. Maria learned her craft from her grandmother, who established the family pottery studio in 1952.\n\nEach vase begins as a lump of local clay, carefully centered on the potter's wheel and shaped by experienced hands. The glazing process involves three separate firings, each at temperatures exceeding 1200°C, resulting in the distinctive finish that has become Maria's signature.\n\nThis particular piece was inspired by the rolling hills surrounding the studio, with its organic curves echoing the natural landscape of the Italian countryside.`,
      features: [
        "Hand-thrown ceramic construction",
        "Food-safe glazes",
        "Dishwasher safe",
        "Unique variations in each piece",
        "Sustainable local materials"
      ],
      dimensions: "Height: 12 inches, Diameter: 6 inches",
      weight: "2.5 lbs",
      materials: "Stoneware clay, lead-free glaze",
      careInstructions: "Hand wash recommended. Avoid extreme temperature changes."
    },
    es: {
      name: "Jarrón de Cerámica Artesanal",
      price: 89.99,
      currency: "USD",
      description: `Este exquisito jarrón de cerámica muestra técnicas tradicionales de alfarería transmitidas a través de generaciones. Cada pieza está individualmente torneada a mano y esmaltada, haciendo que cada jarrón sea único con variaciones sutiles en color y textura.\n\nElaborado con arcilla de gres de alta calidad, este jarrón presenta un hermoso esmalte de tonos tierra que complementa cualquier decoración del hogar.`,
      story: `Creado en el corazón de la Toscana por la maestra alfarera María Rossi, este jarrón representa más de 30 años de dedicación a las artes cerámicas.\n\nCada jarrón comienza como un trozo de arcilla local, cuidadosamente centrado en el torno del alfarero y moldeado por manos expertas.`,
      features: [
        "Construcción cerámica torneada a mano",
        "Esmaltes seguros para alimentos",
        "Apto para lavavajillas",
        "Variaciones únicas en cada pieza",
        "Materiales locales sostenibles"
      ],
      dimensions: "Altura: 30 cm, Diámetro: 15 cm",
      weight: "1.1 kg",
      materials: "Arcilla de gres, esmalte sin plomo",
      careInstructions: "Se recomienda lavar a mano. Evitar cambios extremos de temperatura."
    }
  };

  const currentProduct = productData?.[currentLanguage] || productData?.en;

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart({ ...currentProduct, quantity });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(currentProduct);
  };

  const handleTextToSpeech = (text) => {
    setIsSpeaking(true);
    onTextToSpeech(text);
    // Simulate speech duration
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: currency
    })?.format(price);
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Price */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
            {currentProduct?.name}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleTextToSpeech(currentProduct?.name)}
            iconName={isSpeaking ? "VolumeX" : "Volume2"}
            className="flex-shrink-0 ml-2"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(currentProduct?.price, currentProduct?.currency)}
          </span>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Truck" size={16} />
            <span className="font-caption">Free shipping</span>
          </div>
        </div>
      </div>
      {/* Product Description */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Description</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleTextToSpeech(currentProduct?.description)}
            iconName={isSpeaking ? "VolumeX" : "Volume2"}
          />
        </div>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {currentProduct?.description}
        </div>
      </div>
      {/* Product Story */}
      <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Artisan Story</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleTextToSpeech(currentProduct?.story)}
            iconName={isSpeaking ? "VolumeX" : "Volume2"}
          />
        </div>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {currentProduct?.story}
        </div>
        <div className="flex items-center space-x-2 text-sm text-accent">
          <Icon name="Sparkles" size={16} />
          <span className="font-caption">AI-Enhanced Story</span>
        </div>
      </div>
      {/* Product Features */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Features</h3>
        <ul className="space-y-2">
          {currentProduct?.features?.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Product Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-card rounded-lg border border-border">
        <div>
          <h4 className="font-medium text-foreground mb-2">Specifications</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dimensions:</span>
              <span className="text-foreground">{currentProduct?.dimensions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Weight:</span>
              <span className="text-foreground">{currentProduct?.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Materials:</span>
              <span className="text-foreground">{currentProduct?.materials}</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-foreground mb-2">Care Instructions</h4>
          <p className="text-sm text-muted-foreground">
            {currentProduct?.careInstructions}
          </p>
        </div>
      </div>
      {/* Quantity and Actions */}
      <div className="space-y-4 p-4 bg-card rounded-lg border border-border">
        <div className="flex items-center space-x-4">
          <span className="font-medium text-foreground">Quantity:</span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              iconName="Minus"
            />
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(1)}
              iconName="Plus"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Button
            variant="default"
            onClick={handleAddToCart}
            iconName="ShoppingCart"
            iconPosition="left"
            className="flex-1"
          >
            Add to Cart
          </Button>
          <Button
            variant={isWishlisted ? "default" : "outline"}
            onClick={handleWishlistToggle}
            iconName={isWishlisted ? "Heart" : "Heart"}
            className="sm:w-auto"
          />
          <Button
            variant="outline"
            onClick={onShare}
            iconName="Share2"
            className="sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;