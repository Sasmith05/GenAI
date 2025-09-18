import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ currentLanguage = 'en' }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  // Mock reviews data with multi-language support
  const reviewsData = {
    en: {
      summary: {
        averageRating: 4.7,
        totalReviews: 127,
        ratingDistribution: [
          { rating: 5, count: 89, percentage: 70 },
          { rating: 4, count: 25, percentage: 20 },
          { rating: 3, count: 8, percentage: 6 },
          { rating: 2, count: 3, percentage: 2 },
          { rating: 1, count: 2, percentage: 2 }
        ],
        sentimentAnalysis: [
          { name: 'Positive', value: 85, color: 'var(--color-success)' },
          { name: 'Neutral', value: 12, color: 'var(--color-warning)' },
          { name: 'Negative', value: 3, color: 'var(--color-error)' }
        ]
      },
      reviews: [
        {
          id: 1,
          author: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
          rating: 5,
          date: "2025-01-10",
          verified: true,
          title: "Absolutely Beautiful!",
          content: "This vase exceeded my expectations. The craftsmanship is incredible and you can really feel the quality. It looks perfect in my living room and I\'ve received so many compliments. The packaging was also excellent - arrived in perfect condition.",
          helpful: 23,
          images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300"
          ]
        },
        {
          id: 2,
          author: "Michael Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          rating: 5,
          date: "2025-01-08",
          verified: true,
          title: "Perfect for my home office",
          content: "I bought this for my home office and it\'s become a conversation starter during video calls. The earthy tones are exactly what I was looking for. Fast shipping and great customer service too!",
          helpful: 18,
          images: []
        },
        {
          id: 3,
          author: "Emma Rodriguez",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
          rating: 4,
          date: "2025-01-05",
          verified: true,
          title: "Great quality, minor shipping issue",
          content: "The vase itself is gorgeous and well-made. There was a small chip when it arrived, but customer service was quick to resolve it. Would definitely buy from this artisan again.",
          helpful: 12,
          images: []
        },
        {
          id: 4,
          author: "David Thompson",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          rating: 5,
          date: "2024-12-28",
          verified: false,
          title: "Gift that impressed",
          content: "Bought this as a housewarming gift for my sister. She absolutely loved it! The unique character of each piece really shows the artisan's skill.",
          helpful: 8,
          images: []
        }
      ]
    },
    es: {
      summary: {
        averageRating: 4.7,
        totalReviews: 127,
        ratingDistribution: [
          { rating: 5, count: 89, percentage: 70 },
          { rating: 4, count: 25, percentage: 20 },
          { rating: 3, count: 8, percentage: 6 },
          { rating: 2, count: 3, percentage: 2 },
          { rating: 1, count: 2, percentage: 2 }
        ],
        sentimentAnalysis: [
          { name: 'Positivo', value: 85, color: 'var(--color-success)' },
          { name: 'Neutral', value: 12, color: 'var(--color-warning)' },
          { name: 'Negativo', value: 3, color: 'var(--color-error)' }
        ]
      },
      reviews: [
        {
          id: 1,
          author: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
          rating: 5,
          date: "2025-01-10",
          verified: true,
          title: "¡Absolutamente hermoso!",
          content: "Este jarrón superó mis expectativas. La artesanía es increíble y realmente puedes sentir la calidad. Se ve perfecto en mi sala de estar y he recibido muchos cumplidos.",
          helpful: 23,
          images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300"
          ]
        },
        {
          id: 2,
          author: "Michael Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          rating: 5,
          date: "2025-01-08",
          verified: true,
          title: "Perfecto para mi oficina en casa",
          content: "Lo compré para mi oficina en casa y se ha convertido en un tema de conversación durante las videollamadas. Los tonos tierra son exactamente lo que estaba buscando.",
          helpful: 18,
          images: []
        }
      ]
    }
  };

  const currentData = reviewsData?.[currentLanguage] || reviewsData?.en;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })?.format(date);
  };

  const filteredReviews = currentData?.reviews?.filter(review => {
    if (filterRating === 'all') return true;
    return review?.rating === parseInt(filterRating);
  });

  const sortedReviews = [...filteredReviews]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b?.rating - a?.rating;
      case 'lowest':
        return a?.rating - b?.rating;
      case 'helpful':
        return b?.helpful - a?.helpful;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground mb-2">
              {currentData?.summary?.averageRating}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(Math.round(currentData?.summary?.averageRating))}
            </div>
            <p className="text-muted-foreground font-caption">
              Based on {currentData?.summary?.totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {currentData?.summary?.ratingDistribution?.map((item) => (
              <div key={item?.rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium w-8">{item?.rating}★</span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning h-2 rounded-full transition-smooth"
                    style={{ width: `${item?.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">{item?.count}</span>
              </div>
            ))}
          </div>

          {/* Sentiment Analysis */}
          <div className="flex justify-center">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentData?.summary?.sentimentAnalysis}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {currentData?.summary?.sentimentAnalysis?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sentiment Legend */}
        <div className="flex justify-center space-x-6 mt-4">
          {currentData?.summary?.sentimentAnalysis?.map((item) => (
            <div key={item?.name} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item?.color }}
              />
              <span className="text-sm font-caption">{item?.name} ({item?.value}%)</span>
            </div>
          ))}
        </div>
      </div>
      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews?.map((review) => (
          <div key={review?.id} className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={review?.avatar}
                  alt={review?.author}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-foreground">{review?.author}</h4>
                    {review?.verified && (
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="CheckCircle" size={16} />
                        <span className="text-xs font-caption">Verified Purchase</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review?.date)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(review?.rating)}</div>
                  <span className="text-sm font-medium text-foreground">{review?.title}</span>
                </div>

                <p className="text-muted-foreground leading-relaxed">{review?.content}</p>

                {review?.images?.length > 0 && (
                  <div className="flex space-x-2">
                    {review?.images?.map((image, index) => (
                      <div key={index} className="w-16 h-16 rounded-md overflow-hidden">
                        <img
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" iconName="ThumbsUp" iconPosition="left">
                      Helpful ({review?.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MessageSquare">
                      Reply
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" iconName="Flag">
                    Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Button */}
      <div className="text-center">
        <Button variant="outline">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default CustomerReviews;