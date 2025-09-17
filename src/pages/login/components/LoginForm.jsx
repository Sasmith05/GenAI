import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.emailOrPhone?.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      
      if (!emailRegex?.test(formData?.emailOrPhone) && !phoneRegex?.test(formData?.emailOrPhone)) {
        newErrors.emailOrPhone = 'Please enter a valid email or phone number';
      }
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Email or Phone Number"
          type="text"
          placeholder="Enter your email or phone number"
          value={formData?.emailOrPhone}
          onChange={(e) => handleInputChange('emailOrPhone', e?.target?.value)}
          error={errors?.emailOrPhone}
          required
          disabled={isLoading}
          className="w-full"
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            disabled={isLoading}
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            disabled={isLoading}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon 
              name={showPassword ? "EyeOff" : "Eye"} 
              size={20}
            />
          </button>
        </div>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="mt-6"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;