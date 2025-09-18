import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const VoiceAssistant = ({ onVoiceCommand, onToggleListening }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const startListening = () => {
    if (!isSupported) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      onToggleListening?.(true);
    };

    recognition.onresult = (event) => {
      const command = event?.results?.[0]?.[0]?.transcript;
      setTranscript(command);
      onVoiceCommand?.(command);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event?.error);
      setIsListening(false);
      onToggleListening?.(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      onToggleListening?.(false);
    };

    recognition?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    onToggleListening?.(false);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="flex flex-col items-start space-y-2">
        {/* Voice Command Display */}
        {transcript && (
          <div className="bg-background border border-border rounded-lg px-4 py-2 shadow-warm max-w-xs">
            <p className="text-sm text-foreground">
              <span className="text-muted-foreground">You said:</span> "{transcript}"
            </p>
          </div>
        )}

        {/* Voice Button */}
        <Button
          variant={isListening ? "destructive" : "default"}
          size="lg"
          onClick={isListening ? stopListening : startListening}
          className="rounded-full shadow-warm-lg"
          iconName={isListening ? "MicOff" : "Mic"}
          iconSize={20}
        >
          {isListening ? 'Stop' : 'Voice'}
        </Button>

        {/* Listening Indicator */}
        {isListening && (
          <div className="flex items-center space-x-2 bg-background border border-border rounded-lg px-3 py-2 shadow-warm">
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse"></div>
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-xs text-muted-foreground font-caption">
              Listening...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;