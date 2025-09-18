import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PromotionalSection = ({ currentLanguage = 'en' }) => {
  const [currentPromo, setCurrentPromo] = useState(0);

  const content = {
    en: {
      sectionTitle: "AI-Generated Seasonal Campaigns",
      sectionSubtitle: "Discover exclusive promotions crafted by artificial intelligence for the perfect shopping experience"
    },
    es: {
      sectionTitle: "Campañas Estacionales Generadas por IA",
      sectionSubtitle: "Descubre promociones exclusivas creadas por inteligencia artificial para la experiencia de compra perfecta"
    },
    fr: {
      sectionTitle: "Campagnes Saisonnières Générées par IA",
      sectionSubtitle: "Découvrez des promotions exclusives créées par l'intelligence artificielle pour une expérience d'achat parfaite"
    }
  };

  const promotions = {
    en: [
      {
        id: 1,
        title: "Autumn Harvest Collection",
        subtitle: "Warm colors and cozy textures for the season",
        description: "Discover handcrafted items inspired by autumn's golden palette. From ceramic mugs to woolen scarves, each piece captures the essence of fall.",
        discount: "25% OFF",
        validUntil: "Valid until October 31st",
        cta: "Shop Autumn Collection",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        bgColor: "from-orange-500/20 to-red-500/20",
        textColor: "text-orange-900"
      },
      {
        id: 2,
        title: "Holiday Artisan Showcase",
        subtitle: "Perfect gifts crafted with love and tradition",
        description: "Find unique holiday gifts that tell a story. Each artisan piece is carefully selected to bring joy and meaning to your celebrations.",
        discount: "30% OFF",
        validUntil: "Limited time offer",
        cta: "Explore Holiday Gifts",
        image: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?w=600&h=400&fit=crop",
        bgColor: "from-green-500/20 to-red-500/20",
        textColor: "text-green-900"
      },
      {
        id: 3,
        title: "New Year, New Artisans",
        subtitle: "Welcome fresh talent to our marketplace",
        description: "Start the year by supporting emerging artisans. Discover innovative techniques and contemporary designs from our newest creators.",
        discount: "20% OFF",
        validUntil: "First-time purchases only",
        cta: "Meet New Artisans",
        image: "https://images.pixabay.com/photo/2017/01/20/15/06/fireworks-1995797_1280.jpg?w=600&h=400&fit=crop",
        bgColor: "from-blue-500/20 to-purple-500/20",
        textColor: "text-blue-900"
      }
    ],
    es: [
      {
        id: 1,
        title: "Colección Cosecha de Otoño",
        subtitle: "Colores cálidos y texturas acogedoras para la temporada",
        description: "Descubre artículos hechos a mano inspirados en la paleta dorada del otoño. Desde tazas de cerámica hasta bufandas de lana, cada pieza captura la esencia del otoño.",
        discount: "25% DESC",
        validUntil: "Válido hasta el 31 de octubre",
        cta: "Comprar Colección Otoño",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        bgColor: "from-orange-500/20 to-red-500/20",
        textColor: "text-orange-900"
      },
      {
        id: 2,
        title: "Escaparate Artesanal de Fiestas",
        subtitle: "Regalos perfectos hechos con amor y tradición",
        description: "Encuentra regalos únicos para las fiestas que cuentan una historia. Cada pieza artesanal está cuidadosamente seleccionada para traer alegría y significado a tus celebraciones.",
        discount: "30% DESC",
        validUntil: "Oferta por tiempo limitado",
        cta: "Explorar Regalos Navideños",
        image: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?w=600&h=400&fit=crop",
        bgColor: "from-green-500/20 to-red-500/20",
        textColor: "text-green-900"
      },
      {
        id: 3,
        title: "Año Nuevo, Nuevos Artesanos",
        subtitle: "Da la bienvenida a nuevos talentos en nuestro mercado",
        description: "Comienza el año apoyando a artesanos emergentes. Descubre técnicas innovadoras y diseños contemporáneos de nuestros creadores más nuevos.",
        discount: "20% DESC",
        validUntil: "Solo primeras compras",
        cta: "Conocer Nuevos Artesanos",
        image: "https://images.pixabay.com/photo/2017/01/20/15/06/fireworks-1995797_1280.jpg?w=600&h=400&fit=crop",
        bgColor: "from-blue-500/20 to-purple-500/20",
        textColor: "text-blue-900"
      }
    ],
    fr: [
      {
        id: 1,
        title: "Collection Récolte d\'Automne",
        subtitle: "Couleurs chaudes et textures douillettes pour la saison",
        description: "Découvrez des articles faits main inspirés par la palette dorée de l'automne. Des tasses en céramique aux écharpes en laine, chaque pièce capture l'essence de l'automne.",
        discount: "25% RÉDUC",
        validUntil: "Valide jusqu\'au 31 octobre",
        cta: "Acheter Collection Automne",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        bgColor: "from-orange-500/20 to-red-500/20",
        textColor: "text-orange-900"
      },
      {
        id: 2,
        title: "Vitrine Artisanale des Fêtes",
        subtitle: "Cadeaux parfaits faits avec amour et tradition",
        description: "Trouvez des cadeaux uniques pour les fêtes qui racontent une histoire. Chaque pièce artisanale est soigneusement sélectionnée pour apporter joie et sens à vos célébrations.",
        discount: "30% RÉDUC",
        validUntil: "Offre limitée dans le temps",
        cta: "Explorer Cadeaux de Fêtes",
        image: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?w=600&h=400&fit=crop",
        bgColor: "from-green-500/20 to-red-500/20",
        textColor: "text-green-900"
      },
      {
        id: 3,
        title: "Nouvelle Année, Nouveaux Artisans",
        subtitle: "Accueillez de nouveaux talents sur notre marché",
        description: "Commencez l\'année en soutenant les artisans émergents. Découvrez des techniques innovantes et des designs contemporains de nos créateurs les plus récents.",
        discount: "20% RÉDUC",
        validUntil: "Premiers achats seulement",
        cta: "Rencontrer Nouveaux Artisans",
        image: "https://images.pixabay.com/photo/2017/01/20/15/06/fireworks-1995797_1280.jpg?w=600&h=400&fit=crop",
        bgColor: "from-blue-500/20 to-purple-500/20",
        textColor: "text-blue-900"
      }
    ]
  };

  const currentContent = content?.[currentLanguage] || content?.en;
  const currentPromotions = promotions?.[currentLanguage] || promotions?.en;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % currentPromotions?.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [currentPromotions?.length]);

  const handleTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'es' ? 'es-ES' : currentLanguage === 'fr' ? 'fr-FR' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const currentPromoData = currentPromotions?.[currentPromo];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Sparkles" size={24} className="text-accent" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              {currentContent?.sectionTitle}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {currentContent?.sectionSubtitle}
          </p>
        </div>

        {/* Main Promotion Card */}
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentPromoData?.bgColor} border border-border shadow-warm-lg`}>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content Side */}
            <div className="p-8 lg:p-12">
              {/* AI Badge */}
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="Bot" size={16} />
                <span>AI-Generated Campaign</span>
              </div>

              {/* Discount Badge */}
              <div className={`inline-block ${currentPromoData?.textColor} bg-white/90 px-6 py-3 rounded-2xl text-2xl font-bold mb-4 shadow-warm`}>
                {currentPromoData?.discount}
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                {currentPromoData?.title}
              </h3>
              
              <p className="text-xl text-muted-foreground mb-4">
                {currentPromoData?.subtitle}
              </p>

              {/* Description */}
              <p className="text-foreground mb-6 leading-relaxed">
                {currentPromoData?.description}
              </p>

              {/* Validity */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Icon name="Clock" size={16} />
                <span>{currentPromoData?.validUntil}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/product-details">
                  <Button variant="default" size="lg" className="w-full sm:w-auto">
                    {currentPromoData?.cta}
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleTextToSpeech(`${currentPromoData?.title}. ${currentPromoData?.description}`)}
                  iconName="Volume2"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Listen
                </Button>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative h-64 lg:h-full min-h-[400px]">
              <Image
                src={currentPromoData?.image}
                alt={currentPromoData?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/20"></div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <Icon name="Sparkles" size={48} className="text-accent" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-10">
            <Icon name="Stars" size={32} className="text-accent" />
          </div>
        </div>

        {/* Promotion Indicators */}
        <div className="flex justify-center mt-8 gap-3">
          {currentPromotions?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPromo(index)}
              className={`w-3 h-3 rounded-full transition-smooth ${
                index === currentPromo
                  ? 'bg-accent' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to promotion ${index + 1}`}
            />
          ))}
        </div>

        {/* Additional Promotions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {currentPromotions?.slice(1)?.map((promo, index) => (
            <div
              key={promo?.id}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${promo?.bgColor} border border-border p-6 hover:shadow-warm-lg transition-smooth group cursor-pointer`}
              onClick={() => setCurrentPromo(index + 1)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${promo?.textColor} bg-white/90 px-4 py-2 rounded-xl text-lg font-bold shadow-warm`}>
                  {promo?.discount}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleTextToSpeech(`${promo?.title}. ${promo?.description}`);
                  }}
                  iconName="Volume2"
                />
              </div>

              <h4 className="text-xl font-heading font-bold text-foreground mb-2">
                {promo?.title}
              </h4>
              
              <p className="text-muted-foreground mb-4 text-sm">
                {promo?.subtitle}
              </p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>{promo?.validUntil}</span>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth">
                <Icon name="ArrowRight" size={20} className="text-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalSection;