import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 3,
  currentLanguage = 'en' 
}) => {
  const content = {
    en: {
      steps: ["Choose Role", "Account Details", "Complete Setup"],
      step: "Step"
    },
    es: {
      steps: ["Elegir Rol", "Detalles de Cuenta", "Completar Configuración"],
      step: "Paso"
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (stepIndex, status) => {
    if (status === 'completed') return 'Check';
    if (status === 'current') return 'Circle';
    return 'Circle';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (stepIndex) => {
    const status = getStepStatus(stepIndex);
    return status === 'completed' ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="w-full">
      {/* Mobile Progress Bar */}
      <div className="sm:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {t?.step} {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm font-medium text-foreground">
            {t?.steps?.[currentStep - 1]}
          </span>
        </div>
      </div>
      {/* Desktop Step Indicator */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {t?.steps?.map((stepLabel, index) => {
            const stepNumber = index + 1;
            const status = getStepStatus(stepNumber);
            
            return (
              <div key={index} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${getStepClasses(status)}`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-semibold">{stepNumber}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <span className={`text-sm font-medium ${
                      status === 'current' ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {stepLabel}
                    </span>
                  </div>
                </div>
                {/* Connector Line */}
                {index < t?.steps?.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 transition-all duration-200 ${getConnectorClasses(stepNumber + 1)}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;