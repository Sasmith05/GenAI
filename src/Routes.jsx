import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SellerDashboard from './pages/seller-dashboard';
import Registration from './pages/registration';
import LoginPage from './pages/login';
import ProductDetailsPage from './pages/product-details';
import CustomerDashboard from './pages/customer-dashboard';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product-details" element={<ProductDetailsPage />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
