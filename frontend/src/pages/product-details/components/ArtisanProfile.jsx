import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ArtisanProfile = ({ currentLanguage = 'en', onMessageArtisan = () => {} }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock artisan data with multi-language support
  const artisanData = {
    en: {
      name: "Maria Rossi",
      title: "Master Ceramic Artist",
      location: "Tuscany, Italy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300",
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      verified: true,
      joinedDate: "2018-03-15",
      bio: `Maria Rossi is a third-generation ceramic artist from the heart of Tuscany. With over 30 years of experience, she specializes in traditional Italian pottery techniques passed down through her family.\n\nHer work has been featured in galleries across Europe and she has won numerous awards for her innovative glazing techniques. Maria believes in sustainable practices and sources all her clay locally from the Tuscan hills.`,
      specialties: [
        "Traditional Italian Ceramics",
        "Custom Glazing Techniques",
        "Sustainable Pottery",
        "Decorative Vases",
        "Functional Dinnerware"
      ],
      stats: {
        products: 127,
        sales: 2847,
        followers: 1523,
        rating: 4.9,
        responseTime: "2 hours"
      },
      achievements: [
        {
          title: "Master Artisan Certification",
          year: "2019",
          organization: "Italian Craft Council"
        },
        {
          title: "Sustainability Award",
          year: "2021",
          organization: "European Artisan Guild"
        },
        {
          title: "Featured Artist",
          year: "2023",
          organization: "Tuscany Tourism Board"
        }
      ],
      recentWork: [
        {
          id: 1,
          title: "Olive Grove Collection",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200",
          price: 65.00
        },
        {
          id: 2,
          title: "Mediterranean Bowl Set",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200",
          price: 120.00
        },
        {
          id: 3,
          title: "Rustic Dinner Plates",
          image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200",
          price: 85.00
        }
      ]
    },
    es: {
      name: "Maria Rossi",
      title: "Maestra Artista Ceramista",
      location: "Toscana, Italia",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300",
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      verified: true,
      joinedDate: "2018-03-15",
      bio: `María Rossi es una artista ceramista de tercera generación del corazón de la Toscana. Con más de 30 años de experiencia, se especializa en técnicas tradicionales de alfarería italiana transmitidas a través de su familia.\n\nSu trabajo ha sido presentado en galerías de toda Europa y ha ganado numerosos premios por sus técnicas innovadoras de esmaltado.`,
      specialties: [
        "Cerámica Tradicional Italiana",
        "Técnicas de Esmaltado Personalizadas",
        "Alfarería Sostenible",
        "Jarrones Decorativos",
        "Vajilla Funcional"
      ],
      stats: {
        products: 127,
        sales: 2847,
        followers: 1523,
        rating: 4.9,
        responseTime: "2 horas"
      },
      achievements: [
        {
          title: "Certificación de Artesano Maestro",
          year: "2019",
          organization: "Consejo de Artesanía Italiana"
        },
        {
          title: "Premio de Sostenibilidad",
          year: "2021",
          organization: "Gremio Europeo de Artesanos"
        }
      ],
      recentWork: [
        {
          id: 1,
          title: "Colección Olivar",
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200",
          price: 65.00
        },
        {
          id: 2,
          title: "Set de Cuencos Mediterráneos",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200",
          price: 120.00
        }
      ]
    }
  };

  const currentArtisan = artisanData?.[currentLanguage] || artisanData?.en;

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long'
    })?.format(date);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div className="space-y-6">
      {/* Artisan Header */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="relative h-32 sm:h-48">
          <Image
            src={currentArtisan?.coverImage}
            alt={`${currentArtisan?.name} workshop`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        
        <div className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-4 -mt-16">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden bg-background">
                <Image
                  src={currentArtisan?.avatar}
                  alt={currentArtisan?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {currentArtisan?.verified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-background">
                  <Icon name="CheckCircle" size={16} color="white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{currentArtisan?.name}</h2>
                  <p className="text-muted-foreground font-caption">{currentArtisan?.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{currentArtisan?.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <Button
                    variant={isFollowing ? "default" : "outline"}
                    size="sm"
                    onClick={handleFollowToggle}
                    iconName={isFollowing ? "UserCheck" : "UserPlus"}
                    iconPosition="left"
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={onMessageArtisan}
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{currentArtisan?.stats?.products}</div>
          <div className="text-sm text-muted-foreground font-caption">Products</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{currentArtisan?.stats?.sales?.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground font-caption">Sales</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{currentArtisan?.stats?.followers?.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground font-caption">Followers</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-2xl font-bold text-foreground">{currentArtisan?.stats?.rating}</span>
            <Icon name="Star" size={16} className="text-warning fill-current" />
          </div>
          <div className="text-sm text-muted-foreground font-caption">Rating</div>
        </div>
        <div className="bg-card rounded-lg border border-border p-4 text-center col-span-2 sm:col-span-1">
          <div className="text-2xl font-bold text-foreground">{currentArtisan?.stats?.responseTime}</div>
          <div className="text-sm text-muted-foreground font-caption">Response Time</div>
        </div>
      </div>
      {/* Bio Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">About the Artisan</h3>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line mb-4">
          {currentArtisan?.bio}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} className="mr-2" />
          <span>Member since {formatDate(currentArtisan?.joinedDate)}</span>
        </div>
      </div>
      {/* Specialties */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {currentArtisan?.specialties?.map((specialty, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-caption"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
      {/* Achievements */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Achievements</h3>
        <div className="space-y-3">
          {currentArtisan?.achievements?.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Award" size={20} className="text-warning" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{achievement?.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {achievement?.organization} • {achievement?.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Work */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Work</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentArtisan?.recentWork?.map((work) => (
            <div key={work?.id} className="group cursor-pointer">
              <div className="aspect-square rounded-lg overflow-hidden mb-2">
                <Image
                  src={work?.image}
                  alt={work?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">{work?.title}</h4>
              <p className="text-primary font-semibold text-sm">{formatPrice(work?.price)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;