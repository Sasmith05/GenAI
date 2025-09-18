import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileEditingSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Maria Rodriguez',
    email: 'maria@artisanhub.com',
    phone: '+1 (555) 123-4567',
    location: 'Santa Fe, New Mexico',
    bio: 'Passionate ceramic artist with over 15 years of experience creating unique pottery pieces inspired by traditional Southwestern techniques.',
    specialties: ['Pottery', 'Ceramics', 'Glazing'],
    experience: '15+ years',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  });

  const [verificationStatus, setVerificationStatus] = useState({
    identity: { status: 'verified', label: 'Identity Verified' },
    business: { status: 'pending', label: 'Business License' },
    portfolio: { status: 'verified', label: 'Portfolio Reviewed' },
    quality: { status: 'in-progress', label: 'Quality Assessment' }
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Simulate save operation
    setIsEditing(false);
    // Here you would typically make an API call to save the data
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'in-progress':
        return 'text-primary bg-primary/10';
      case 'rejected':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'in-progress':
        return 'RefreshCw';
      case 'rejected':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Artisan Profile</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your profile information and verification status
            </p>
          </div>
          {!isEditing ? (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
              <Image
                src={profileData?.avatar}
                alt={profileData?.name}
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <Button
                variant="secondary"
                size="sm"
                className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full"
                iconName="Camera"
                iconSize={14}
              />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  value={profileData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={profileData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                />
              </div>
            ) : (
              <div>
                <h4 className="text-xl font-semibold text-card-foreground">{profileData?.name}</h4>
                <p className="text-muted-foreground mt-1">{profileData?.email}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{profileData?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Award" size={14} />
                    <span>{profileData?.experience}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isEditing ? (
            <>
              <Input
                label="Phone Number"
                type="tel"
                value={profileData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
              />
              <Input
                label="Location"
                type="text"
                value={profileData?.location}
                onChange={(e) => handleInputChange('location', e?.target?.value)}
              />
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <p className="text-card-foreground mt-1">{profileData?.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                <p className="text-card-foreground mt-1">{profileData?.location}</p>
              </div>
            </>
          )}
        </div>

        {/* Bio Section */}
        <div>
          <label className="text-sm font-medium text-muted-foreground">Bio</label>
          {isEditing ? (
            <textarea
              className="w-full mt-2 min-h-[100px] p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              value={profileData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              placeholder="Tell customers about your craft and experience..."
            />
          ) : (
            <p className="text-card-foreground mt-2">{profileData?.bio}</p>
          )}
        </div>

        {/* Specialties */}
        <div>
          <label className="text-sm font-medium text-muted-foreground">Specialties</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {profileData?.specialties?.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium"
              >
                {specialty}
              </span>
            ))}
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconSize={14}
              >
                Add
              </Button>
            )}
          </div>
        </div>

        {/* Verification Status */}
        <div>
          <h4 className="font-medium text-card-foreground mb-4">Verification Status</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(verificationStatus)?.map(([key, verification]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name={getStatusIcon(verification?.status)}
                    size={20}
                    className={verification?.status === 'verified' ? 'text-success' : 
                              verification?.status === 'pending' ? 'text-warning' :
                              verification?.status === 'in-progress' ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <span className="text-sm font-medium text-card-foreground">
                    {verification?.label}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(verification?.status)}`}>
                  {verification?.status?.charAt(0)?.toUpperCase() + verification?.status?.slice(1)?.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Management */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-card-foreground">Portfolio Highlights</h4>
            <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
              Add Work
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4]?.map((item) => (
              <div key={item} className="aspect-square rounded-lg overflow-hidden bg-muted relative group">
                <Image
                  src={`https://images.unsplash.com/photo-${1580000000000 + item}?w=200&h=200&fit=crop`}
                  alt={`Portfolio item ${item}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconName="Eye"
                    iconSize={16}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditingSection;