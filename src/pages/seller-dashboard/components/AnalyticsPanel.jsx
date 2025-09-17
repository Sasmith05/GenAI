import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsPanel = () => {
  const [activeTab, setActiveTab] = useState('feedback');

  // Mock analytics data
  const feedbackData = [
    { month: 'Jan', rating: 4.2, reviews: 45 },
    { month: 'Feb', rating: 4.5, reviews: 52 },
    { month: 'Mar', rating: 4.3, reviews: 38 },
    { month: 'Apr', rating: 4.7, reviews: 61 },
    { month: 'May', rating: 4.6, reviews: 58 },
    { month: 'Jun', rating: 4.8, reviews: 72 }
  ];

  const salesData = [
    { month: 'Jan', sales: 1200, orders: 24 },
    { month: 'Feb', sales: 1800, orders: 32 },
    { month: 'Mar', sales: 1400, orders: 28 },
    { month: 'Apr', sales: 2200, orders: 41 },
    { month: 'May', sales: 2800, orders: 48 },
    { month: 'Jun', sales: 3200, orders: 55 }
  ];

  const categoryData = [
    { name: 'Pottery', value: 35, color: 'var(--color-primary)' },
    { name: 'Jewelry', value: 28, color: 'var(--color-secondary)' },
    { name: 'Textiles', value: 22, color: 'var(--color-accent)' },
    { name: 'Woodwork', value: 15, color: 'var(--color-success)' }
  ];

  const pricingInsights = [
    {
      category: 'Handmade Pottery',
      yourPrice: 45,
      marketAvg: 52,
      recommendation: 'increase',
      potential: '+15%'
    },
    {
      category: 'Silver Jewelry',
      yourPrice: 85,
      marketAvg: 78,
      recommendation: 'optimal',
      potential: 'Well positioned'
    },
    {
      category: 'Woven Textiles',
      yourPrice: 120,
      marketAvg: 95,
      recommendation: 'decrease',
      potential: '-20%'
    }
  ];

  const tabs = [
    { id: 'feedback', label: 'Customer Feedback', icon: 'MessageSquare' },
    { id: 'sales', label: 'Sales Performance', icon: 'TrendingUp' },
    { id: 'pricing', label: 'Pricing Insights', icon: 'DollarSign' },
    { id: 'categories', label: 'Category Breakdown', icon: 'PieChart' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'increase':
        return 'text-success bg-success/10';
      case 'decrease':
        return 'text-warning bg-warning/10';
      case 'optimal':
        return 'text-primary bg-primary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const renderFeedbackTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={20} className="text-warning" />
            <span className="text-sm font-medium text-muted-foreground">Average Rating</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground mt-2">4.6</p>
          <p className="text-sm text-success">+0.3 from last month</p>
        </div>
        
        <div className="bg-background rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2">
            <Icon name="MessageSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total Reviews</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground mt-2">326</p>
          <p className="text-sm text-success">+24 this month</p>
        </div>
        
        <div className="bg-background rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2">
            <Icon name="ThumbsUp" size={20} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Satisfaction</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground mt-2">94%</p>
          <p className="text-sm text-success">+2% from last month</p>
        </div>
      </div>
      
      <div className="bg-background rounded-lg border border-border p-4">
        <h4 className="font-medium text-card-foreground mb-4">Rating Trends</h4>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={feedbackData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis domain={[3.5, 5]} stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderSalesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={20} className="text-success" />
            <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground mt-2">{formatCurrency(12600)}</p>
          <p className="text-sm text-success">+18% from last month</p>
        </div>
        
        <div className="bg-background rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2">
            <Icon name="ShoppingCart" size={20} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Orders</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground mt-2">228</p>
          <p className="text-sm text-success">+14 this month</p>
        </div>
        
        <div className="bg-background rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Avg. Order Value</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground mt-2">{formatCurrency(55.26)}</p>
          <p className="text-sm text-success">+3% from last month</p>
        </div>
      </div>
      
      <div className="bg-background rounded-lg border border-border p-4">
        <h4 className="font-medium text-card-foreground mb-4">Sales Performance</h4>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="sales" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderPricingTab = () => (
    <div className="space-y-6">
      <div className="bg-background rounded-lg border border-border p-4">
        <h4 className="font-medium text-card-foreground mb-4">Pricing Recommendations</h4>
        <div className="space-y-4">
          {pricingInsights?.map((insight, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <h5 className="font-medium text-card-foreground">{insight?.category}</h5>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <span>Your Price: {formatCurrency(insight?.yourPrice)}</span>
                  <span>Market Avg: {formatCurrency(insight?.marketAvg)}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRecommendationColor(insight?.recommendation)}`}>
                  {insight?.recommendation?.charAt(0)?.toUpperCase() + insight?.recommendation?.slice(1)}
                </span>
                <p className="text-sm text-muted-foreground mt-1">{insight?.potential}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCategoriesTab = () => (
    <div className="space-y-6">
      <div className="bg-background rounded-lg border border-border p-4">
        <h4 className="font-medium text-card-foreground mb-4">Sales by Category</h4>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {categoryData?.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category?.color }}
              />
              <span className="text-sm text-muted-foreground">{category?.name}</span>
              <span className="text-sm font-medium text-card-foreground">{category?.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feedback':
        return renderFeedbackTab();
      case 'sales':
        return renderSalesTab();
      case 'pricing':
        return renderPricingTab();
      case 'categories':
        return renderCategoriesTab();
      default:
        return renderFeedbackTab();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Analytics Dashboard</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Track your business performance and insights
            </p>
          </div>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Report
          </Button>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AnalyticsPanel;