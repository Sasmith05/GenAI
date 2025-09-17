import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VoiceAssistant = ({ currentLanguage = 'en', isEnabled = true }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    // Check if speech synthesis and recognition are supported
    const speechSynthesisSupported = 'speechSynthesis' in window;
    const speechRecognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setSpeechSupported(speechSynthesisSupported && speechRecognitionSupported);
  }, []);

  const translations = {
    en: {
      voiceAssistant: 'Voice Assistant',
      startListening: 'Start Voice Input',
      stopListening: 'Stop Listening',
      readForm: 'Read Form Fields',
      helpText: 'Use voice commands to navigate the login form'
    },
    es: {
      voiceAssistant: 'Asistente de Voz',
      startListening: 'Iniciar Entrada de Voz',
      stopListening: 'Dejar de Escuchar',
      readForm: 'Leer Campos del Formulario',
      helpText: 'Usa comandos de voz para navegar el formulario de inicio de sesión'
    },
    fr: {
      voiceAssistant: 'Assistant Vocal',
      startListening: 'Démarrer la Saisie Vocale',
      stopListening: "Arrêter d\'Écouter",
      readForm: 'Lire les Champs du Formulaire',
      helpText: 'Utilisez les commandes vocales pour naviguer dans le formulaire de connexion'
    },
    de: {
      voiceAssistant: 'Sprachassistent',
      startListening: 'Spracheingabe Starten',
      stopListening: 'Aufhören zu Hören',
      readForm: 'Formularfelder Vorlesen',
      helpText: 'Verwenden Sie Sprachbefehle, um im Anmeldeformular zu navigieren'
    },
    it: {
      voiceAssistant: 'Assistente Vocale',
      startListening: 'Avvia Input Vocale',
      stopListening: 'Smetti di Ascoltare',
      readForm: 'Leggi Campi del Modulo',
      helpText: 'Usa i comandi vocali per navigare nel modulo di accesso'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const speakText = (text) => {
    if (!speechSupported || !isEnabled) return;
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage === 'en' ? 'en-US' : currentLanguage;
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis?.speak(utterance);
  };

  const startListening = () => {
    if (!speechSupported || !isEnabled) return;
    
    setIsListening(true);
    
    // Mock speech recognition functionality
    setTimeout(() => {
      setIsListening(false);
      speakText('Voice input received. Please use the form fields to enter your credentials.');
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  const readFormFields = () => {
    const formText = `Login form contains the following fields: Email or phone number input field, Password input field with show hide toggle, Sign in button, and social media authentication options including Google, Facebook, and Apple.`;
    speakText(formText);
  };

  if (!speechSupported || !isEnabled) {
    return null;
  }

  return (
    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
      <div className="flex items-center space-x-2">
        <Icon name="Mic" size={20} color="var(--color-primary)" />
        <h3 className="text-sm font-medium text-foreground">
          {t?.voiceAssistant}
        </h3>
      </div>
      <p className="text-xs text-muted-foreground font-caption">
        {t?.helpText}
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={isListening ? stopListening : startListening}
          disabled={isSpeaking}
          iconName={isListening ? "MicOff" : "Mic"}
          iconSize={16}
        >
          {isListening ? t?.stopListening : t?.startListening}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={readFormFields}
          disabled={isListening || isSpeaking}
          iconName="Volume2"
          iconSize={16}
        >
          {t?.readForm}
        </Button>
      </div>
      {isListening && (
        <div className="flex items-center space-x-2 text-xs text-primary">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="font-caption">Listening...</span>
        </div>
      )}
      {isSpeaking && (
        <div className="flex items-center space-x-2 text-xs text-accent">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="font-caption">Speaking...</span>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;