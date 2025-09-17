import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoleSelectionCard = ({ 
  role, 
  title, 
  description, 
  benefits, 
  icon, 
  isSelected, 
  onSelect,
  className = "" 
}) => {
  return (
    <div 
      className={`relative p-6 border-2 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-warm-lg ${
        isSelected 
          ? 'border-primary bg-primary/5 shadow-warm' 
          : 'border-border bg-card hover:border-primary/50'
      } ${className}`}
      onClick={() => onSelect(role)}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Check" size={14} color="var(--color-primary-foreground)" />
        </div>
      )}
      {/* Icon */}
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
        isSelected ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
      }`}>
        <Icon name={icon} size={24} />
      </div>
      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
        {description}
      </p>
      {/* Benefits */}
      <ul className="space-y-2 mb-6">
        {benefits?.map((benefit, index) => (
          <li key={index} className="flex items-start space-x-2 text-sm">
            <Icon 
              name="Check" 
              size={16} 
              className="text-success mt-0.5 flex-shrink-0" 
            />
            <span className="text-muted-foreground">{benefit}</span>
          </li>
        ))}
      </ul>
      {/* Select Button */}
      <Button
        variant={isSelected ? "default" : "outline"}
        fullWidth
        className="mt-auto"
      >
        {isSelected ? "Selected" : `Join as ${title}`}
      </Button>
    </div>
  );
};

export default RoleSelectionCard;