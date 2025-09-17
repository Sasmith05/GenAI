import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductManagementTable = ({ products, onEditProduct, onToggleStatus, onViewAnalytics, onSocialPost }) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedProducts = [...products]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'draft':
        return 'text-warning bg-warning/10';
      case 'sold':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Product Management</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your products and track performance
            </p>
          </div>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Add Product
          </Button>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
              <th 
                className="text-left p-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="text-left p-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Performance</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts?.map((product) => (
              <tr key={product?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={product?.image}
                      alt={product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-card-foreground">{product?.name}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {product?.description}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-semibold text-card-foreground">
                    {formatCurrency(product?.price)}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product?.status)}`}>
                    {product?.status?.charAt(0)?.toUpperCase() + product?.status?.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="Eye" size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{product?.views} views</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="ShoppingCart" size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{product?.sales} sales</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEditProduct(product?.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="BarChart3"
                      onClick={() => onViewAnalytics(product?.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Share2"
                      onClick={() => onSocialPost(product?.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName={product?.status === 'active' ? 'Pause' : 'Play'}
                      onClick={() => onToggleStatus(product?.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden p-4 space-y-4">
        {sortedProducts?.map((product) => (
          <div key={product?.id} className="bg-background rounded-lg border border-border p-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-card-foreground truncate">{product?.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {product?.description}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusColor(product?.status)}`}>
                    {product?.status?.charAt(0)?.toUpperCase() + product?.status?.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="font-semibold text-card-foreground">
                    {formatCurrency(product?.price)}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} />
                      <span>{product?.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="ShoppingCart" size={14} />
                      <span>{product?.sales}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Edit"
                    onClick={() => onEditProduct(product?.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="BarChart3"
                    onClick={() => onViewAnalytics(product?.id)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Share2"
                    onClick={() => onSocialPost(product?.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagementTable;