import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceInteraction = ({ 
  currentLanguage = 'en',
  onVoiceCommand = () => {},
  isListening = false,
  onToggleListening = () => {}
}) => {
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [lastCommand, setLastCommand] = useState('');

  // Mock voice commands with multi-language support
  const voiceCommands = {
    en: {
      commands: [
        { phrase: "read description", action: "readDescription", description: "Read product description aloud" },
        { phrase: "read reviews", action: "readReviews", description: "Read customer reviews aloud" },
        { phrase: "add to cart", action: "addToCart", description: "Add product to shopping cart" },
        { phrase: "show artisan", action: "showArtisan", description: "Show artisan profile" },
        { phrase: "view in ar", action: "viewAR", description: "Launch AR view" },
        { phrase: "view in 3d", action: "view3D", description: "Launch 3D view" },
        { phrase: "share product", action: "shareProduct", description: "Share this product" },
        { phrase: "add to wishlist", action: "addToWishlist", description: "Add to wishlist" },
        { phrase: "help", action: "showHelp", description: "Show voice commands help" }
      ],
      helpText: "Try saying commands like 'read description', 'add to cart', or 'view in AR'",
      listeningText: "Listening... Say a command",
      notListeningText: "Click to start voice commands",
      notSupportedText: "Voice commands not supported in this browser"
    },
    es: {
      commands: [
        { phrase: "leer descripción", action: "readDescription", description: "Leer descripción del producto en voz alta" },
        { phrase: "leer reseñas", action: "readReviews", description: "Leer reseñas de clientes en voz alta" },
        { phrase: "añadir al carrito", action: "addToCart", description: "Añadir producto al carrito" },
        { phrase: "mostrar artesano", action: "showArtisan", description: "Mostrar perfil del artesano" },
        { phrase: "ver en ar", action: "viewAR", description: "Lanzar vista AR" },
        { phrase: "ver en 3d", action: "view3D", description: "Lanzar vista 3D" },
        { phrase: "compartir producto", action: "shareProduct", description: "Compartir este producto" },
        { phrase: "añadir a favoritos", action: "addToWishlist", description: "Añadir a favoritos" },
        { phrase: "ayuda", action: "showHelp", description: "Mostrar ayuda de comandos de voz" }
      ],
      helpText: "Prueba diciendo comandos como 'leer descripción', 'añadir al carrito', o 'ver en AR'",
      listeningText: "Escuchando... Di un comando",
      notListeningText: "Haz clic para iniciar comandos de voz",
      notSupportedText: "Comandos de voz no soportados en este navegador"
    }
  };

  const currentCommands = voiceCommands?.[currentLanguage] || voiceCommands?.en;

  useEffect(() => {
    // Check if Web Speech API is supported
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  // Mock speech recognition functionality
  useEffect(() => {
    if (isListening) {
      // Simulate speech recognition
      const mockTranscripts = [
        "read description",
        "add to cart",
        "view in AR",
        "show artisan profile",
        "read reviews"
      ];
      
      const randomTranscript = mockTranscripts?.[Math.floor(Math.random() * mockTranscripts?.length)];
      
      setTimeout(() => {
        setTranscript(randomTranscript);
        setConfidence(0.85 + Math.random() * 0.15);
        
        // Find matching command
        const matchedCommand = currentCommands?.commands?.find(cmd => 
          cmd?.phrase?.toLowerCase() === randomTranscript?.toLowerCase()
        );
        
        if (matchedCommand) {
          setLastCommand(matchedCommand?.phrase);
          onVoiceCommand(matchedCommand?.action);
        }
        
        // Auto-stop listening after processing
        setTimeout(() => {
          onToggleListening();
          setTranscript('');
        }, 2000);
      }, 2000);
    }
  }, [isListening, currentCommands, onVoiceCommand, onToggleListening]);

  const handleToggleListening = () => {
    if (!isSupported) return;
    onToggleListening();
    if (!isListening) {
      setTranscript('');
      setLastCommand('');
    }
  };

  const renderCommandsList = () => (
    <div className="space-y-2">
      <h4 className="font-medium text-foreground text-sm">Available Commands:</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
        {currentCommands?.commands?.map((command, index) => (
          <div key={index} className="text-xs p-2 bg-muted/50 rounded">
            <span className="font-medium text-accent">"{command?.phrase}"</span>
            <p className="text-muted-foreground mt-1">{command?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (!isSupported) {
    return (
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center space-x-3">
          <Icon name="MicOff" size={20} className="text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Voice Commands</p>
            <p className="text-xs text-muted-foreground">{currentCommands?.notSupportedText}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4 space-y-4">
      {/* Voice Control Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${isListening ? 'bg-error/10' : 'bg-accent/10'}`}>
            <Icon 
              name={isListening ? "MicIcon" : "Mic"} 
              size={20} 
              className={isListening ? 'text-error' : 'text-accent'} 
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Voice Commands</h3>
            <p className="text-xs text-muted-foreground">
              {isListening ? currentCommands?.listeningText : currentCommands?.notListeningText}
            </p>
          </div>
        </div>
        
        <Button
          variant={isListening ? "destructive" : "default"}
          size="sm"
          onClick={handleToggleListening}
          iconName={isListening ? "Square" : "Mic"}
          iconPosition="left"
        >
          {isListening ? "Stop" : "Start"}
        </Button>
      </div>
      {/* Live Transcript */}
      {isListening && (
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-error rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-error rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-xs font-medium text-foreground">Listening...</span>
          </div>
          {transcript && (
            <div className="space-y-1">
              <p className="text-sm text-foreground">"{transcript}"</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted rounded-full h-1">
                  <div 
                    className="bg-success h-1 rounded-full transition-smooth"
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.round(confidence * 100)}% confident
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Last Command Executed */}
      {lastCommand && !isListening && (
        <div className="p-3 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Command Executed:</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">"{lastCommand}"</p>
        </div>
      )}
      {/* Help Text */}
      <div className="p-3 bg-accent/10 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-accent flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{currentCommands?.helpText}</p>
            <details className="text-xs">
              <summary className="cursor-pointer text-accent font-medium hover:text-accent/80">
                View all commands
              </summary>
              <div className="mt-2">
                {renderCommandsList()}
              </div>
            </details>
          </div>
        </div>
      </div>
      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onVoiceCommand('readDescription')}
          iconName="Volume2"
          iconPosition="left"
        >
          Read Description
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onVoiceCommand('addToCart')}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onVoiceCommand('viewAR')}
          iconName="Smartphone"
          iconPosition="left"
        >
          AR View
        </Button>
      </div>
    </div>
  );
};

export default VoiceInteraction;