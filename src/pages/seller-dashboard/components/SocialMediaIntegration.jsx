import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialMediaIntegration = () => {
  const [connectedPlatforms, setConnectedPlatforms] = useState([
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'Instagram',
      connected: true,
      followers: 2847,
      lastPost: '2 hours ago',
      engagement: '4.2%',
      scheduledPosts: 3
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      connected: true,
      followers: 1523,
      lastPost: '1 day ago',
      engagement: '3.8%',
      scheduledPosts: 2
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: 'Image',
      connected: false,
      followers: 0,
      lastPost: null,
      engagement: null,
      scheduledPosts: 0
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'Twitter',
      connected: false,
      followers: 0,
      lastPost: null,
      engagement: null,
      scheduledPosts: 0
    }
  ]);

  const [autoPostSettings, setAutoPostSettings] = useState({
    newProducts: true,
    promotions: true,
    stories: false,
    achievements: true
  });

  const toggleConnection = (platformId) => {
    setConnectedPlatforms(prev =>
      prev?.map(platform =>
        platform?.id === platformId
          ? { ...platform, connected: !platform?.connected }
          : platform
      )
    );
  };

  const toggleAutoPost = (setting) => {
    setAutoPostSettings(prev => ({
      ...prev,
      [setting]: !prev?.[setting]
    }));
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'K';
    }
    return num?.toString();
  };

  const upcomingPosts = [
    {
      id: 1,
      platform: 'instagram',
      content: 'New ceramic bowl collection featuring traditional glazing techniques...',
      scheduledFor: '2025-01-18 10:00 AM',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
      type: 'product'
    },
    {
      id: 2,
      platform: 'facebook',
      content: 'Behind the scenes: Watch me create this intricate pottery piece...',
      scheduledFor: '2025-01-18 2:00 PM',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=100&h=100&fit=crop',
      type: 'story'
    },
    {
      id: 3,
      platform: 'instagram',
      content: 'Special holiday promotion: 20% off all handmade jewelry...',
      scheduledFor: '2025-01-19 9:00 AM',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop',
      type: 'promotion'
    }
  ];

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'product':
        return 'text-primary bg-primary/10';
      case 'story':
        return 'text-secondary bg-secondary/10';
      case 'promotion':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Social Media Integration</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Connect and manage your social media presence
            </p>
          </div>
          <Button variant="outline" iconName="Settings" iconPosition="left">
            Settings
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Connected Platforms */}
        <div>
          <h4 className="font-medium text-card-foreground mb-4">Connected Platforms</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectedPlatforms?.map((platform) => (
              <div
                key={platform?.id}
                className="p-4 bg-background rounded-lg border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name={platform?.icon} size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h5 className="font-medium text-card-foreground">{platform?.name}</h5>
                      <p className="text-xs text-muted-foreground">
                        {platform?.connected ? 'Connected' : 'Not connected'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={platform?.connected ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleConnection(platform?.id)}
                  >
                    {platform?.connected ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>

                {platform?.connected && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Followers</span>
                      <span className="font-medium text-card-foreground">
                        {formatNumber(platform?.followers)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Engagement</span>
                      <span className="font-medium text-card-foreground">{platform?.engagement}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Post</span>
                      <span className="font-medium text-card-foreground">{platform?.lastPost}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Scheduled</span>
                      <span className="font-medium text-card-foreground">
                        {platform?.scheduledPosts} posts
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Auto-Post Settings */}
        <div>
          <h4 className="font-medium text-card-foreground mb-4">Auto-Post Settings</h4>
          <div className="bg-background rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Automatically share content to your connected social media platforms
            </p>
            <div className="space-y-3">
              {Object.entries(autoPostSettings)?.map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={
                        key === 'newProducts' ? 'Package' :
                        key === 'promotions' ? 'Tag' :
                        key === 'stories'? 'BookOpen' : 'Award'
                      }
                      size={16}
                      className="text-muted-foreground"
                    />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {key === 'newProducts' ? 'New Products' :
                         key === 'promotions' ? 'Promotions' :
                         key === 'stories'? 'Product Stories' : 'Achievements'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {key === 'newProducts' ? 'Share when you upload new products' :
                         key === 'promotions' ? 'Share promotional campaigns' :
                         key === 'stories'? 'Share product stories and behind-the-scenes' : 'Share milestones and achievements'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={enabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAutoPost(key)}
                  >
                    {enabled ? 'On' : 'Off'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scheduled Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-card-foreground">Upcoming Posts</h4>
            <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
              Schedule Post
            </Button>
          </div>
          
          <div className="space-y-3">
            {upcomingPosts?.map((post) => (
              <div
                key={post?.id}
                className="flex items-start space-x-4 p-4 bg-background rounded-lg border border-border"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={post?.image}
                    alt="Post preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon
                      name={post?.platform === 'instagram' ? 'Instagram' : 'Facebook'}
                      size={16}
                      className="text-muted-foreground"
                    />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post?.type)}`}>
                      {post?.type?.charAt(0)?.toUpperCase() + post?.type?.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-card-foreground line-clamp-2 mb-2">
                    {post?.content}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{post?.scheduledFor}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Edit" iconSize={14} />
                  <Button variant="ghost" size="sm" iconName="Trash2" iconSize={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="border-t border-border pt-6">
          <h4 className="font-medium text-card-foreground mb-4">This Month's Performance</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background rounded-lg border border-border">
              <Icon name="Heart" size={20} className="text-destructive mx-auto mb-2" />
              <p className="text-2xl font-bold text-card-foreground">1.2K</p>
              <p className="text-sm text-muted-foreground">Total Likes</p>
            </div>
            
            <div className="text-center p-4 bg-background rounded-lg border border-border">
              <Icon name="MessageCircle" size={20} className="text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-card-foreground">89</p>
              <p className="text-sm text-muted-foreground">Comments</p>
            </div>
            
            <div className="text-center p-4 bg-background rounded-lg border border-border">
              <Icon name="Share2" size={20} className="text-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold text-card-foreground">156</p>
              <p className="text-sm text-muted-foreground">Shares</p>
            </div>
            
            <div className="text-center p-4 bg-background rounded-lg border border-border">
              <Icon name="TrendingUp" size={20} className="text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-card-foreground">+12%</p>
              <p className="text-sm text-muted-foreground">Growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaIntegration;