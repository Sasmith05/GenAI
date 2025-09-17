import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  // Default breadcrumb mapping based on routes
  const routeBreadcrumbs = {
    '/homepage': [
      { label: 'Home', path: '/homepage' }
    ],
    '/login': [
      { label: 'Home', path: '/homepage' },
      { label: 'Sign In', path: '/login' }
    ],
    '/registration': [
      { label: 'Home', path: '/homepage' },
      { label: 'Join Now', path: '/registration' }
    ],
    '/customer-dashboard': [
      { label: 'Home', path: '/homepage' },
      { label: 'My Account', path: '/customer-dashboard' }
    ],
    '/product-details': [
      { label: 'Home', path: '/homepage' },
      { label: 'Products', path: '/product-details' }
    ],
    '/seller-dashboard': [
      { label: 'Home', path: '/homepage' },
      { label: 'Artisan Dashboard', path: '/seller-dashboard' }
    ]
  };

  // Use custom breadcrumbs if provided, otherwise use route-based breadcrumbs
  const breadcrumbs = customBreadcrumbs || routeBreadcrumbs?.[location?.pathname] || [
    { label: 'Home', path: '/homepage' }
  ];

  // Don't show breadcrumbs on homepage or if only one item
  if (location?.pathname === '/homepage' || breadcrumbs?.length <= 1) {
    return null;
  }

  const renderBreadcrumbItem = (item, index, isLast) => {
    const isClickable = !isLast && item?.path;

    return (
      <li key={index} className="flex items-center">
        {index > 0 && (
          <Icon 
            name="ChevronRight" 
            size={16} 
            className="mx-2 text-muted-foreground flex-shrink-0" 
          />
        )}
        {isClickable ? (
          <Link
            to={item?.path}
            className="text-sm text-muted-foreground hover:text-foreground transition-smooth font-caption truncate"
          >
            {item?.label}
          </Link>
        ) : (
          <span className="text-sm text-foreground font-medium font-caption truncate">
            {item?.label}
          </span>
        )}
      </li>
    );
  };

  const renderMobileBreadcrumbs = () => {
    // On mobile, show only parent and current
    if (breadcrumbs?.length <= 2) {
      return breadcrumbs?.map((item, index) => 
        renderBreadcrumbItem(item, index, index === breadcrumbs?.length - 1)
      );
    }

    const parent = breadcrumbs?.[breadcrumbs?.length - 2];
    const current = breadcrumbs?.[breadcrumbs?.length - 1];

    return [
      renderBreadcrumbItem(parent, 0, false),
      renderBreadcrumbItem(current, 1, true)
    ];
  };

  return (
    <nav 
      className="flex items-center py-3 text-sm" 
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-0 min-w-0 flex-1">
        {/* Desktop: Show all breadcrumbs */}
        <div className="hidden sm:flex items-center space-x-0 min-w-0 flex-1">
          {breadcrumbs?.map((item, index) => 
            renderBreadcrumbItem(item, index, index === breadcrumbs?.length - 1)
          )}
        </div>

        {/* Mobile: Show simplified breadcrumbs */}
        <div className="sm:hidden flex items-center space-x-0 min-w-0 flex-1">
          {renderMobileBreadcrumbs()}
        </div>
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;