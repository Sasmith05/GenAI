import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroBanner = ({ currentLanguage = 'en' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContent = {
    en: {
      slides: [
        {
          id: 1,
          title: "Discover Authentic Handcrafted Treasures",
          subtitle: "Connect with skilled artisans and explore unique creations made with passion and tradition",
          cta: "Explore Collection",
          image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=600&fit=crop",
          artisan: "Featured: Maria\'s Pottery Studio"
        },
        {
          id: 2,
          title: "Experience Art in 3D & Augmented Reality",
          subtitle: "Immerse yourself in our revolutionary viewing experience with AI-enhanced product visualization",
          cta: "Try AR View",
          image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?w=1200&h=600&fit=crop",
          artisan: "Featured: Digital Craft Gallery"
        },
        {
          id: 3,
          title: "Support Local Artisans Worldwide",
          subtitle: "Every purchase directly supports creative communities and preserves traditional craftsmanship",
          cta: "Meet Artisans",
          image: "https://images.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg?w=1200&h=600&fit=crop",
          artisan: "Featured: Global Artisan Network"
        }
      ]
    },
    es: {
      slides: [
        {
          id: 1,
          title: "Descubre Tesoros Auténticos Hechos a Mano",
          subtitle: "Conecta con artesanos expertos y explora creaciones únicas hechas con pasión y tradición",
          cta: "Explorar Colección",
          image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=600&fit=crop",
          artisan: "Destacado: Estudio de Cerámica de María"
        },
        {
          id: 2,
          title: "Experimenta el Arte en 3D y Realidad Aumentada",
          subtitle: "Sumérgete en nuestra experiencia de visualización revolucionaria con productos mejorados por IA",
          cta: "Probar Vista AR",
          image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?w=1200&h=600&fit=crop",
          artisan: "Destacado: Galería de Artesanía Digital"
        },
        {
          id: 3,
          title: "Apoya a Artesanos Locales en Todo el Mundo",
          subtitle: "Cada compra apoya directamente a comunidades creativas y preserva la artesanía tradicional",
          cta: "Conocer Artesanos",
          image: "https://images.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg?w=1200&h=600&fit=crop",
          artisan: "Destacado: Red Global de Artesanos"
        }
      ]
    },
    fr: {
      slides: [
        {
          id: 1,
          title: "Découvrez des Trésors Authentiques Faits Main",
          subtitle: "Connectez-vous avec des artisans qualifiés et explorez des créations uniques faites avec passion et tradition",
          cta: "Explorer la Collection",
          image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=600&fit=crop",
          artisan: "En vedette: Studio de Poterie de Maria"
        },
        {
          id: 2,
          title: "Découvrez l\'Art en 3D et Réalité Augmentée",
          subtitle: "Plongez dans notre expérience de visualisation révolutionnaire avec des produits améliorés par l\'IA",
          cta: "Essayer la Vue AR",
          image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?w=1200&h=600&fit=crop",
          artisan: "En vedette: Galerie d\'Artisanat Numérique"
        },
        {
          id: 3,
          title: "Soutenez les Artisans Locaux du Monde Entier",
          subtitle: "Chaque achat soutient directement les communautés créatives et préserve l\'artisanat traditionnel",
          cta: "Rencontrer les Artisans",
          image: "https://images.pixabay.com/photo/2017/08/07/14/02/people-2604149_1280.jpg?w=1200&h=600&fit=crop",
          artisan: "En vedette: Réseau Mondial d\'Artisans"
        }
      ]
    }
  };

  const content = heroContent?.[currentLanguage] || heroContent?.en;
  const slides = content?.slides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
  };

  const currentSlideData = slides?.[currentSlide];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-2xl shadow-warm-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentSlideData?.image}
          alt={currentSlideData?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Artisan Badge */}
            <div className="inline-flex items-center space-x-2 bg-accent/90 backdrop-blur-sm text-accent-foreground px-4 py-2 rounded-full text-sm font-caption mb-4">
              <Icon name="Star" size={16} />
              <span>{currentSlideData?.artisan}</span>
            </div>

            {/* Main Content */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
              {currentSlideData?.title}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {currentSlideData?.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/product-details">
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  {currentSlideData?.cta}
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                iconName="Volume2"
                iconPosition="left"
              >
                Listen
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
        >
          <Icon name="ChevronLeft" size={24} />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
        >
          <Icon name="ChevronRight" size={24} />
        </Button>
      </div>
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${
              index === currentSlide 
                ? 'bg-white' :'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;