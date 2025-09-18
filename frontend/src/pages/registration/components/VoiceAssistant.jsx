import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VoiceAssistant = ({ 
  isEnabled = true, 
  currentLanguage = 'en',
  onVoiceCommand 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [synthesis, setSynthesis] = useState(null);

  const content = {
    en: {
      voiceAssistant: "Voice Assistant",
      startListening: "Start Voice Input",
      stopListening: "Stop Listening",
      speak: "Read Form",
      listening: "Listening...",
      speaking: "Speaking...",
      notSupported: "Voice features not supported in this browser",
      helpText: "Say \'help\' for voice commands or \'read form\' to hear field descriptions"
    },
    es: {
      voiceAssistant: "Asistente de Voz",
      startListening: "Iniciar Entrada de Voz",
      stopListening: "Dejar de Escuchar",
      speak: "Leer Formulario",
      listening: "Escuchando...",
      speaking: "Hablando...",
      notSupported: "Funciones de voz no compatibles con este navegador",
      helpText: "Di 'ayuda' para comandos de voz o 'leer formulario' para escuchar descripciones de campos"
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = currentLanguage === 'es' ? 'es-ES' : 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript?.toLowerCase();
        handleVoiceCommand(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event?.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }

    return () => {
      if (recognition) {
        recognition?.stop();
      }
      if (synthesis) {
        synthesis?.cancel();
      }
    };
  }, [currentLanguage]);

  const handleVoiceCommand = (command) => {
    const commands = {
      'help': () => speak("Available commands: fill first name, fill last name, fill email, read form, or navigate to next step"),
      'read form': () => readFormFields(),
      'fill first name': () => focusField('firstName'),
      'fill last name': () => focusField('lastName'),
      'fill email': () => focusField('email'),
      'fill phone': () => focusField('phone'),
      'fill password': () => focusField('password'),
      'next step': () => onVoiceCommand && onVoiceCommand('nextStep'),
      'previous step': () => onVoiceCommand && onVoiceCommand('previousStep')
    };

    // Find matching command
    const matchedCommand = Object.keys(commands)?.find(cmd => 
      command?.includes(cmd)
    );

    if (matchedCommand) {
      commands?.[matchedCommand]();
    } else {
      speak("Command not recognized. Say 'help' for available commands.");
    }
  };

  const focusField = (fieldName) => {
    const field = document.querySelector(`input[name="${fieldName}"]`);
    if (field) {
      field?.focus();
      speak(`${fieldName} field focused. You can now type or continue with voice input.`);
    }
  };

  const readFormFields = () => {
    const formText = `Registration form contains the following fields: 
      First name, Last name, Email address, Phone number, Password, and Confirm password. 
      Additional fields may appear based on your selected role. 
      You must agree to terms of service to complete registration.`;
    speak(formText);
  };

  const speak = (text) => {
    if (synthesis && !isSpeaking) {
      synthesis?.cancel(); // Cancel any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'es' ? 'es-ES' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthesis?.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition && !isListening) {
      recognition?.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition?.stop();
    }
  };

  const stopSpeaking = () => {
    if (synthesis && isSpeaking) {
      synthesis?.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isEnabled || (!recognition && !synthesis)) {
    return (
      <div className="text-center p-4 bg-muted rounded-lg">
        <Icon name="MicOff" size={24} className="mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{t?.notSupported}</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="Mic" size={20} className="text-primary" />
        <h3 className="font-medium text-foreground">{t?.voiceAssistant}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* Voice Input Button */}
        <Button
          variant={isListening ? "destructive" : "outline"}
          size="sm"
          onClick={isListening ? stopListening : startListening}
          iconName={isListening ? "MicOff" : "Mic"}
          iconPosition="left"
          disabled={!recognition}
        >
          {isListening ? t?.stopListening : t?.startListening}
        </Button>

        {/* Text-to-Speech Button */}
        <Button
          variant={isSpeaking ? "destructive" : "outline"}
          size="sm"
          onClick={isSpeaking ? stopSpeaking : readFormFields}
          iconName={isSpeaking ? "VolumeX" : "Volume2"}
          iconPosition="left"
          disabled={!synthesis}
        >
          {isSpeaking ? "Stop" : t?.speak}
        </Button>
      </div>
      {/* Status Indicator */}
      {(isListening || isSpeaking) && (
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-muted-foreground">
            {isListening ? t?.listening : t?.speaking}
          </span>
        </div>
      )}
      {/* Help Text */}
      <p className="text-xs text-muted-foreground font-caption">
        {t?.helpText}
      </p>
    </div>
  );
};

export default VoiceAssistant;