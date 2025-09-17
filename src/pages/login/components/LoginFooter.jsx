import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const LoginFooter = ({ currentLanguage = 'en' }) => {
  const translations = {
    en: {
      forgotPassword: 'Forgot your password?',
      noAccount: "Don\'t have an account?",
      createAccount: 'Create Account',
      resetPassword: 'Reset Password'
    },
    es: {
      forgotPassword: '¿Olvidaste tu contraseña?',
      noAccount: '¿No tienes una cuenta?',
      createAccount: 'Crear Cuenta',
      resetPassword: 'Restablecer Contraseña'
    },
    fr: {
      forgotPassword: 'Mot de passe oublié?',
      noAccount: "Vous n\'avez pas de compte?",
      createAccount: 'Créer un Compte',
      resetPassword: 'Réinitialiser le Mot de Passe'
    },
    de: {
      forgotPassword: 'Passwort vergessen?',
      noAccount: 'Haben Sie kein Konto?',
      createAccount: 'Konto Erstellen',
      resetPassword: 'Passwort Zurücksetzen'
    },
    it: {
      forgotPassword: 'Password dimenticata?',
      noAccount: 'Non hai un account?',
      createAccount: 'Crea Account',
      resetPassword: 'Reimposta Password'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  return (
    <div className="space-y-6 mt-8">
      {/* Forgot Password */}
      <div className="text-center">
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-smooth font-caption"
          onClick={() => {
            // Mock forgot password functionality
            alert('Password reset link would be sent to your email');
          }}
        >
          {t?.forgotPassword}
        </button>
      </div>
      {/* Create Account */}
      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground font-caption">
          {t?.noAccount}
        </p>
        <Link to="/registration">
          <Button variant="outline" size="lg" fullWidth>
            {t?.createAccount}
          </Button>
        </Link>
      </div>
      {/* Security Indicators */}
      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="font-caption">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <div className="w-3 h-3 bg-success rounded-full"></div>
          <span className="font-caption">Trusted Auth</span>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;