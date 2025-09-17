import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'pottery', label: 'Pottery & Ceramics' },
    { value: 'textiles', label: 'Textiles & Fabrics' },
    { value: 'jewelry', label: 'Jewelry & Accessories' },
    { value: 'woodwork', label: 'Woodwork & Furniture' },
    { value: 'metalwork', label: 'Metalwork & Sculpture' },
    { value: 'glasswork', label: 'Glasswork & Art' },
    { value: 'leather', label: 'Leather Goods' },
    { value: 'paper', label: 'Paper & Stationery' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'local', label: 'Local (Within 50 miles)' },
    { value: 'national', label: 'National' },
    { value: 'international', label: 'International' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handlePriceChange = (type, value) => {
    const updatedFilters = {
      ...localFilters,
      priceRange: {
        ...localFilters?.priceRange,
        [type]: parseFloat(value) || 0
      }
    };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      category: 'all',
      priceRange: { min: 0, max: 1000 },
      location: 'all',
      sortBy: 'relevance',
      hasAR: false,
      has3D: false,
      aiRecommended: false,
      inStock: false
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters();
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Input
          type="search"
          placeholder="Search products..."
          value={localFilters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>

      {/* Category Filter */}
      <div>
        <Select
          label="Category"
          options={categories}
          value={localFilters?.category}
          onChange={(value) => handleFilterChange('category', value)}
          className="w-full"
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Min"
            value={localFilters?.priceRange?.min || ''}
            onChange={(e) => handlePriceChange('min', e?.target?.value)}
            min="0"
          />
          <Input
            type="number"
            placeholder="Max"
            value={localFilters?.priceRange?.max || ''}
            onChange={(e) => handlePriceChange('max', e?.target?.value)}
            min="0"
          />
        </div>
        <div className="mt-2 text-xs text-muted-foreground font-caption">
          ${localFilters?.priceRange?.min || 0} - ${localFilters?.priceRange?.max || 1000}
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <Select
          label="Location"
          options={locationOptions}
          value={localFilters?.location}
          onChange={(value) => handleFilterChange('location', value)}
          className="w-full"
        />
      </div>

      {/* Sort By */}
      <div>
        <Select
          label="Sort By"
          options={sortOptions}
          value={localFilters?.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
          className="w-full"
        />
      </div>

      {/* Feature Filters */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Features
        </label>
        <div className="space-y-3">
          <Checkbox
            label="AR Viewing Available"
            checked={localFilters?.hasAR || false}
            onChange={(e) => handleFilterChange('hasAR', e?.target?.checked)}
          />
          <Checkbox
            label="3D Model Available"
            checked={localFilters?.has3D || false}
            onChange={(e) => handleFilterChange('has3D', e?.target?.checked)}
          />
          <Checkbox
            label="AI Recommended"
            checked={localFilters?.aiRecommended || false}
            onChange={(e) => handleFilterChange('aiRecommended', e?.target?.checked)}
          />
          <Checkbox
            label="In Stock Only"
            checked={localFilters?.inStock || false}
            onChange={(e) => handleFilterChange('inStock', e?.target?.checked)}
          />
        </div>
      </div>

      {/* Clear Filters */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={handleClearAll}
          fullWidth
          iconName="X"
          iconSize={16}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block w-80 bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold text-foreground">
            Filters
          </h3>
          <Icon name="Filter" size={20} className="text-muted-foreground" />
        </div>
        <FilterContent />
      </div>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button
          variant="default"
          size="lg"
          onClick={onToggle}
          className="rounded-full shadow-warm-lg"
          iconName="Filter"
          iconSize={20}
        >
          Filters
        </Button>
      </div>
      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={onToggle}>
          <div 
            className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-background border-l border-border overflow-y-auto"
            onClick={(e) => e?.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-semibold text-foreground">
                  Filters
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;