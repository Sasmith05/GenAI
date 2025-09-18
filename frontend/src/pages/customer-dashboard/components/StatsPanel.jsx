import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const StatsPanel = ({ stats }) => {
  const categoryData = [
    { name: 'Pottery', value: 35, color: '#8B4513' },
    { name: 'Textiles', value: 25, color: '#6B8E5A' },
    { name: 'Jewelry', value: 20, color: '#D4A574' },
    { name: 'Woodwork', value: 12, color: '#A0522D' },
    { name: 'Others', value: 8, color: '#B8860B' }
  ];

  const monthlyData = [
    { month: 'Jan', purchases: 4, favorites: 12 },
    { month: 'Feb', purchases: 6, favorites: 18 },
    { month: 'Mar', purchases: 8, favorites: 24 },
    { month: 'Apr', purchases: 5, favorites: 15 },
    { month: 'May', purchases: 9, favorites: 28 },
    { month: 'Jun', purchases: 7, favorites: 21 }
  ];

  const StatCard = ({ icon, label, value, change, changeType }) => (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name={icon} size={16} className="text-accent" />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-xs ${
            changeType === 'positive' ? 'text-success' : 'text-error'
          }`}>
            <Icon 
              name={changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
              size={12} 
            />
            <span>{change}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-foreground">
          {value}
        </p>
        <p className="text-sm text-muted-foreground font-caption">
          {label}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Icon name="BarChart3" size={20} className="text-accent" />
        <h3 className="font-heading font-semibold text-foreground">
          Your Shopping Insights
        </h3>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="ShoppingBag"
          label="Total Purchases"
          value={stats?.totalPurchases || 39}
          change="+12%"
          changeType="positive"
        />
        <StatCard
          icon="Heart"
          label="Favorites"
          value={stats?.totalFavorites || 118}
          change="+8%"
          changeType="positive"
        />
        <StatCard
          icon="DollarSign"
          label="Total Spent"
          value={`$${stats?.totalSpent || '2,847'}`}
          change="+15%"
          changeType="positive"
        />
        <StatCard
          icon="Users"
          label="Artisans Followed"
          value={stats?.artisansFollowed || 23}
          change="+3"
          changeType="positive"
        />
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h4 className="font-heading font-semibold text-foreground mb-4">
            Purchase Categories
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  labelStyle={{ color: 'var(--color-foreground)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {categoryData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-xs text-muted-foreground font-caption">
                  {item?.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Activity */}
        <div className="bg-background border border-border rounded-lg p-6">
          <h4 className="font-heading font-semibold text-foreground mb-4">
            Monthly Activity
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                />
                <Tooltip 
                  labelStyle={{ color: 'var(--color-foreground)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="purchases" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="favorites" fill="var(--color-accent)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs text-muted-foreground font-caption">
                Purchases
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-xs text-muted-foreground font-caption">
                Favorites
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-background border border-border rounded-lg p-6">
        <h4 className="font-heading font-semibold text-foreground mb-4">
          Recent Activity
        </h4>
        <div className="space-y-3">
          {[
            { action: 'Purchased', item: 'Handcrafted Ceramic Vase', time: '2 hours ago', icon: 'ShoppingBag' },
            { action: 'Added to favorites', item: 'Woven Textile Wall Art', time: '5 hours ago', icon: 'Heart' },
            { action: 'Viewed in AR', item: 'Wooden Coffee Table', time: '1 day ago', icon: 'Smartphone' },
            { action: 'Contacted artisan', item: 'Silver Jewelry Collection', time: '2 days ago', icon: 'MessageCircle' }
          ]?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={activity?.icon} size={14} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity?.action}</span> {activity?.item}
                </p>
                <p className="text-xs text-muted-foreground font-caption">
                  {activity?.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;