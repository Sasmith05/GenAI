import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const MainNavigation = ({ isAuthenticated = false, userRole = null, userName = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderLogo = () => (
    <Link to="/homepage" className="flex items-center space-x-2" onClick={closeMobileMenu}>
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Palette" size={20} color="var(--color-primary-foreground)" />
      </div>
      <span className="text-xl font-heading font-semibold text-foreground">ArtisanHub</span>
    </Link>
  );

  const renderPublicNavigation = () => (
    <>
      <Link
        to="/homepage"
        className={`px-4 py-2 rounded-md font-medium transition-smooth ${
          isActive('/homepage')
            ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted hover:text-foreground'
        }`}
        onClick={closeMobileMenu}
      >
        Discover
      </Link>
      <Link
        to="/product-details"
        className={`px-4 py-2 rounded-md font-medium transition-smooth ${
          isActive('/product-details')
            ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted hover:text-foreground'
        }`}
        onClick={closeMobileMenu}
      >
        Products
      </Link>
    </>
  );

  const renderCustomerNavigation = () => (
    <>
      <Link
        to="/homepage"
        className={`px-4 py-2 rounded-md font-medium transition-smooth ${
          isActive('/homepage')
            ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted hover:text-foreground'
        }`}
        onClick={closeMobileMenu}
      >
        Discover
      </Link>
      <Link
        to="/product-details"
        className={`px-4 py-2 rounded-md font-medium transition-smooth ${
          isActive('/product-details')
            ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted hover:text-foreground'
        }`}
        onClick={closeMobileMenu}
      >
        Products
      </Link>
      <Link
        to="/customer-dashboard"
        className={`px-4 py-2 rounded-md font-medium transition-smooth ${
          isActive('/customer-dashboard')
            ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted hover:text-foreground'
        }`}
        onClick={closeMobileMenu}
      >
        My Account
      </Link>
    </>
  );

  const renderSellerNavigation = () => (
    <>
      <Link
        to="/seller-dashboard"
        className={`px-4 py-2 rounded-md font-medium transition-smooth ${
          isActive('/seller-dashboard')
            ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted hover:text-foreground'
        }`}
        onClick={closeMobileMenu}
      >
        Dashboard
      </Link>
      <Link
        to="/homepage"
        className={`px-4 py-2 rounded-md font-medium transition-smooth ${
          isActive('/homepage')
            ? 'bg-primary text-primary-foreground' :'text-foreground hover:bg-muted hover:text-foreground'
        }`}
        onClick={closeMobileMenu}
      >
        Marketplace
      </Link>
    </>
  );

  const renderAuthButtons = () => (
    <div className="flex items-center space-x-3">
      <Link to="/login" onClick={closeMobileMenu}>
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>
      <Link to="/registration" onClick={closeMobileMenu}>
        <Button variant="default" size="sm">
          Join Now
        </Button>
      </Link>
    </div>
  );

  const renderNavigation = () => {
    if (!isAuthenticated) {
      return renderPublicNavigation();
    }
    
    if (userRole === 'customer') {
      return renderCustomerNavigation();
    }
    
    if (userRole === 'seller') {
      return renderSellerNavigation();
    }
    
    return renderPublicNavigation();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {renderLogo()}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {renderNavigation()}
          </div>

          {/* Desktop Auth/User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              renderAuthButtons()
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground font-caption">
                  Welcome, {userName || 'User'}
                </span>
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-accent-foreground)" />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
            >
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-warm-lg">
          <div className="px-4 py-4 space-y-2">
            {renderNavigation()}
            
            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-border">
              {!isAuthenticated ? (
                <div className="space-y-2">
                  <Link to="/login" className="block" onClick={closeMobileMenu}>
                    <Button variant="ghost" fullWidth>
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/registration" className="block" onClick={closeMobileMenu}>
                    <Button variant="default" fullWidth>
                      Join Now
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="var(--color-accent-foreground)" />
                  </div>
                  <span className="text-sm text-foreground font-caption">
                    {userName || 'User'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MainNavigation;