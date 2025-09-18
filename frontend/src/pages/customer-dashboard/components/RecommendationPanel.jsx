import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationPanel = ({ recommendations, onProductClick, onRefreshRecommendations }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
      onRefreshRecommendations?.();
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const RecommendationCard = ({ item, index }) => (
    <div 
      className="bg-background border border-border rounded-lg p-4 hover:shadow-warm transition-shadow cursor-pointer"
      onClick={() => onProductClick?.(item)}
    >
      <div className="flex space-x-3">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={item?.image}
            alt={item?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground text-sm truncate">
            {item?.name}
          </h4>
          <p className="text-xs text-muted-foreground font-caption mt-1">
            by {item?.artisan?.name}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-semibold text-primary text-sm">
              {formatPrice(item?.price)}
            </span>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="fill-warning text-warning" />
              <span className="text-xs text-muted-foreground">
                {item?.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Reason */}
      {item?.aiReason && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-start space-x-2">
            <Icon name="Sparkles" size={12} className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground font-caption">
              {item?.aiReason}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-80 bg-card border border-border rounded-lg h-fit sticky top-24">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={20} className="text-accent" />
            <h3 className="font-heading font-semibold text-foreground">
              AI Recommendations
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex-shrink-0"
          >
            <Icon 
              name="RefreshCw" 
              size={16} 
              className={isLoading ? "animate-spin" : ""}
            />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground font-caption mt-2">
          Personalized picks based on your preferences
        </p>
      </div>
      {/* Recommendations List */}
      <div className="p-4">
        {recommendations?.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recommendations?.map((item, index) => (
              <RecommendationCard key={item?.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Search" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground font-caption">
              No recommendations available
            </p>
            <p className="text-xs text-muted-foreground font-caption mt-1">
              Browse products to get personalized suggestions
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground font-caption">
          <Icon name="Info" size={12} />
          <span>Powered by AI learning from your activity</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPanel;