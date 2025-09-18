import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserMenu = ({ 
  user = null, 
  userRole = 'customer', 
  onLogout = () => {},
  onProfileClick = () => {},
  onSettingsClick = () => {} 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    onProfileClick();
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    onSettingsClick();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name?.split(' ')?.map(word => word?.charAt(0))?.join('')?.toUpperCase()?.slice(0, 2);
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case 'seller':
        return 'Store';
      case 'customer':
        return 'ShoppingBag';
      default:
        return 'User';
    }
  };

  const getRoleLabel = () => {
    switch (userRole) {
      case 'seller':
        return 'Artisan';
      case 'customer':
        return 'Customer';
      default:
        return 'User';
    }
  };

  const getQuickActions = () => {
    if (userRole === 'seller') {
      return [
        { icon: 'BarChart3', label: 'Analytics', onClick: () => setIsOpen(false) },
        { icon: 'Package', label: 'Products', onClick: () => setIsOpen(false) },
        { icon: 'MessageSquare', label: 'Messages', onClick: () => setIsOpen(false) },
      ];
    } else {
      return [
        { icon: 'Heart', label: 'Favorites', onClick: () => setIsOpen(false) },
        { icon: 'ShoppingCart', label: 'Cart', onClick: () => setIsOpen(false) },
        { icon: 'Clock', label: 'Order History', onClick: () => setIsOpen(false) },
      ];
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-2 py-2"
      >
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-medium text-sm">
          {user?.avatar ? (
            <img 
              src={user?.avatar} 
              alt={user?.name || 'User'} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getUserInitials(user?.name)
          )}
        </div>
        <div className="hidden lg:flex flex-col items-start">
          <span className="text-sm font-medium text-foreground">
            {user?.name || 'User'}
          </span>
          <span className="text-xs text-muted-foreground font-caption">
            {getRoleLabel()}
          </span>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="hidden lg:block transition-smooth"
        />
      </Button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-warm-lg z-50 animate-slide-in">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-medium">
                {user?.avatar ? (
                  <img 
                    src={user?.avatar} 
                    alt={user?.name || 'User'} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getUserInitials(user?.name)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-popover-foreground truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'user@example.com'}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name={getRoleIcon()} size={12} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground font-caption">
                    {getRoleLabel()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="py-2">
            <div className="px-3 py-1">
              <span className="text-xs font-medium text-muted-foreground font-caption uppercase tracking-wide">
                Quick Actions
              </span>
            </div>
            {getQuickActions()?.map((action, index) => (
              <button
                key={index}
                onClick={action?.onClick}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left transition-smooth hover:bg-muted focus:bg-muted focus:outline-none text-popover-foreground"
              >
                <Icon name={action?.icon} size={16} />
                <span className="text-sm">{action?.label}</span>
              </button>
            ))}
          </div>

          {/* Main Menu Items */}
          <div className="py-2 border-t border-border">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center space-x-3 px-4 py-2 text-left transition-smooth hover:bg-muted focus:bg-muted focus:outline-none text-popover-foreground"
            >
              <Icon name="User" size={16} />
              <span className="text-sm">Profile</span>
            </button>
            
            <button
              onClick={handleSettingsClick}
              className="w-full flex items-center space-x-3 px-4 py-2 text-left transition-smooth hover:bg-muted focus:bg-muted focus:outline-none text-popover-foreground"
            >
              <Icon name="Settings" size={16} />
              <span className="text-sm">Settings</span>
            </button>

            <Link
              to="/help"
              className="w-full flex items-center space-x-3 px-4 py-2 text-left transition-smooth hover:bg-muted focus:bg-muted focus:outline-none text-popover-foreground"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="HelpCircle" size={16} />
              <span className="text-sm">Help & Support</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="py-2 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-left transition-smooth hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground focus:outline-none text-popover-foreground"
            >
              <Icon name="LogOut" size={16} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;