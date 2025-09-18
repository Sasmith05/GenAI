import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ 
  selectedRole, 
  onSubmit, 
  isLoading = false,
  currentLanguage = 'en' 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: '',
    location: '',
    experience: '',
    interests: [],
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const content = {
    en: {
      personalInfo: "Personal Information",
      businessInfo: "Business Information",
      preferences: "Preferences",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      businessName: "Business Name",
      businessType: "Business Type",
      location: "Location",
      experience: "Years of Experience",
      interests: "Interests",
      agreeToTerms: "I agree to the Terms of Service and Privacy Policy",
      subscribeNewsletter: "Subscribe to newsletter for updates and promotions",
      createAccount: "Create Account",
      passwordStrength: "Password Strength",
      weak: "Weak",
      medium: "Medium",
      strong: "Strong"
    },
    es: {
      personalInfo: "Información Personal",
      businessInfo: "Información Comercial",
      preferences: "Preferencias",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      phone: "Número de Teléfono",
      password: "Contraseña",
      confirmPassword: "Confirmar Contraseña",
      businessName: "Nombre del Negocio",
      businessType: "Tipo de Negocio",
      location: "Ubicación",
      experience: "Años de Experiencia",
      interests: "Intereses",
      agreeToTerms: "Acepto los Términos de Servicio y Política de Privacidad",
      subscribeNewsletter: "Suscribirse al boletín para actualizaciones y promociones",
      createAccount: "Crear Cuenta",
      passwordStrength: "Fuerza de la Contraseña",
      weak: "Débil",
      medium: "Medio",
      strong: "Fuerte"
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const businessTypes = [
    { value: 'pottery', label: 'Pottery & Ceramics' },
    { value: 'jewelry', label: 'Jewelry Making' },
    { value: 'woodwork', label: 'Woodworking' },
    { value: 'textiles', label: 'Textiles & Fabrics' },
    { value: 'metalwork', label: 'Metalworking' },
    { value: 'glasswork', label: 'Glasswork' },
    { value: 'leatherwork', label: 'Leatherwork' },
    { value: 'other', label: 'Other' }
  ];

  const customerInterests = [
    'Home Decor', 'Jewelry', 'Art & Collectibles', 'Fashion Accessories',
    'Kitchen & Dining', 'Garden & Outdoor', 'Gifts & Occasions', 'Wellness & Beauty'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Password strength calculation
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 1;
    if (/[A-Z]/?.test(password)) strength += 1;
    if (/[a-z]/?.test(password)) strength += 1;
    if (/[0-9]/?.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 1;
    setPasswordStrength(Math.min(strength, 3));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!formData?.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!formData?.email?.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = "Invalid email format";
    if (!formData?.phone?.trim()) newErrors.phone = "Phone number is required";
    if (!formData?.password) newErrors.password = "Password is required";
    if (formData?.password?.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData?.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";

    if (selectedRole === 'seller') {
      if (!formData?.businessName?.trim()) newErrors.businessName = "Business name is required";
      if (!formData?.businessType) newErrors.businessType = "Business type is required";
      if (!formData?.location?.trim()) newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1: return 'bg-error';
      case 2: return 'bg-warning';
      case 3: return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 1: return t?.weak;
      case 2: return t?.medium;
      case 3: return t?.strong;
      default: return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="User" size={20} />
          <span>{t?.personalInfo}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t?.firstName}
            type="text"
            name="firstName"
            value={formData?.firstName}
            onChange={handleInputChange}
            error={errors?.firstName}
            required
            placeholder="John"
          />
          <Input
            label={t?.lastName}
            type="text"
            name="lastName"
            value={formData?.lastName}
            onChange={handleInputChange}
            error={errors?.lastName}
            required
            placeholder="Doe"
          />
        </div>

        <Input
          label={t?.email}
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          placeholder="john.doe@example.com"
        />

        <Input
          label={t?.phone}
          type="tel"
          name="phone"
          value={formData?.phone}
          onChange={handleInputChange}
          error={errors?.phone}
          required
          placeholder="+1 (555) 123-4567"
        />

        <div className="space-y-2">
          <Input
            label={t?.password}
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            placeholder="Enter a strong password"
          />
          
          {formData?.password && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t?.passwordStrength}</span>
                <span className="text-muted-foreground">{getPasswordStrengthText()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 3) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <Input
          label={t?.confirmPassword}
          type="password"
          name="confirmPassword"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
          placeholder="Confirm your password"
        />
      </div>
      {/* Business Information (Sellers only) */}
      {selectedRole === 'seller' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Store" size={20} />
            <span>{t?.businessInfo}</span>
          </h3>

          <Input
            label={t?.businessName}
            type="text"
            name="businessName"
            value={formData?.businessName}
            onChange={handleInputChange}
            error={errors?.businessName}
            required
            placeholder="Your Artisan Business"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              {t?.businessType} *
            </label>
            <select
              name="businessType"
              value={formData?.businessType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
              required
            >
              <option value="">Select your craft type</option>
              {businessTypes?.map(type => (
                <option key={type?.value} value={type?.value}>
                  {type?.label}
                </option>
              ))}
            </select>
            {errors?.businessType && (
              <p className="text-sm text-error">{errors?.businessType}</p>
            )}
          </div>

          <Input
            label={t?.location}
            type="text"
            name="location"
            value={formData?.location}
            onChange={handleInputChange}
            error={errors?.location}
            required
            placeholder="City, State/Country"
          />

          <Input
            label={t?.experience}
            type="number"
            name="experience"
            value={formData?.experience}
            onChange={handleInputChange}
            placeholder="5"
            min="0"
            max="50"
          />
        </div>
      )}
      {/* Customer Preferences */}
      {selectedRole === 'customer' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Heart" size={20} />
            <span>{t?.preferences}</span>
          </h3>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              {t?.interests}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {customerInterests?.map(interest => (
                <label key={interest} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    value={interest}
                    checked={formData?.interests?.includes(interest)}
                    onChange={(e) => {
                      const { value, checked } = e?.target;
                      setFormData(prev => ({
                        ...prev,
                        interests: checked 
                          ? [...prev?.interests, value]
                          : prev?.interests?.filter(i => i !== value)
                      }));
                    }}
                    className="rounded border-border text-primary focus:ring-ring"
                  />
                  <span className="text-muted-foreground">{interest}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Terms and Newsletter */}
      <div className="space-y-4 pt-4 border-t border-border">
        <Checkbox
          label={t?.agreeToTerms}
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange(e)}
          name="agreeToTerms"
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label={t?.subscribeNewsletter}
          checked={formData?.subscribeNewsletter}
          onChange={(e) => handleInputChange(e)}
          name="subscribeNewsletter"
        />
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        {t?.createAccount}
      </Button>
    </form>
  );
};

export default RegistrationForm;