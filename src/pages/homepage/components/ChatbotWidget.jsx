import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatbotWidget = ({ currentLanguage = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const content = {
    en: {
      title: "ArtisanHub Assistant",
      subtitle: "How can I help you today?",
      placeholder: "Type your message...",
      send: "Send",
      listen: "Voice",
      stopListening: "Stop",
      initialMessage: "Hello! I'm your AI assistant. I can help you navigate ArtisanHub, find products, or answer questions about our artisans. How can I assist you today?",
      quickActions: [
        "Find ceramic products",
        "Show trending items",
        "Help with 3D viewing",
        "Artisan profiles"
      ],
      errorMessage: "Sorry, I couldn't process that. Please try again.",
      listeningMessage: "Listening... Speak now"
    },
    es: {
      title: "Asistente ArtisanHub",
      subtitle: "¿Cómo puedo ayudarte hoy?",
      placeholder: "Escribe tu mensaje...",
      send: "Enviar",
      listen: "Voz",
      stopListening: "Parar",
      initialMessage: "¡Hola! Soy tu asistente de IA. Puedo ayudarte a navegar por ArtisanHub, encontrar productos o responder preguntas sobre nuestros artesanos. ¿Cómo puedo asistirte hoy?",
      quickActions: [
        "Encontrar productos cerámicos",
        "Mostrar artículos tendencia",
        "Ayuda con vista 3D",
        "Perfiles de artesanos"
      ],
      errorMessage: "Lo siento, no pude procesar eso. Por favor intenta de nuevo.",
      listeningMessage: "Escuchando... Habla ahora"
    },
    fr: {
      title: "Assistant ArtisanHub",
      subtitle: "Comment puis-je vous aider aujourd\'hui?",
      placeholder: "Tapez votre message...",
      send: "Envoyer",
      listen: "Voix",
      stopListening: "Arrêter",
      initialMessage: "Bonjour! Je suis votre assistant IA. Je peux vous aider à naviguer sur ArtisanHub, trouver des produits ou répondre aux questions sur nos artisans. Comment puis-je vous aider aujourd'hui?",
      quickActions: [
        "Trouver produits céramiques",
        "Montrer articles tendance",
        "Aide avec vue 3D",
        "Profils d\'artisans"
      ],
      errorMessage: "Désolé, je n'ai pas pu traiter cela. Veuillez réessayer.",
      listeningMessage: "Écoute... Parlez maintenant"
    }
  };

  const currentContent = content?.[currentLanguage] || content?.en;

  // Initialize chatbot with welcome message
  useEffect(() => {
    if (messages?.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: currentContent?.initialMessage,
          timestamp: new Date()
        }
      ]);
    }
  }, [currentContent?.initialMessage, messages?.length]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = currentLanguage === 'es' ? 'es-ES' : currentLanguage === 'fr' ? 'fr-FR' : 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [currentLanguage]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (messageContent = inputValue?.trim()) => {
    if (!messageContent) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageContent);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput?.toLowerCase();
    
    if (input?.includes('ceramic') || input?.includes('pottery')) {
      return currentLanguage === 'es' 
        ? "¡Excelente elección! Tenemos una hermosa colección de productos cerámicos de artesanos talentosos. Puedes encontrar cuencos, jarrones y esculturas únicas. ¿Te gustaría ver nuestra colección de cerámica?"
        : currentLanguage === 'fr' ? "Excellent choix! Nous avons une belle collection de produits en céramique d'artisans talentueux. Vous pouvez trouver des bols, vases et sculptures uniques. Aimeriez-vous voir notre collection de céramiques?" :"Great choice! We have a beautiful collection of ceramic products from talented artisans. You can find unique bowls, vases, and sculptures. Would you like to see our ceramic collection?";
    }
    
    if (input?.includes('trending') || input?.includes('popular')) {
      return currentLanguage === 'es'
        ? "Nuestros productos más populares incluyen cuencos de cerámica tejidos a mano, carteras de cuero artesanal y esculturas de madera talladas a mano. ¡Todos tienen excelentes reseñas de clientes!"
        : currentLanguage === 'fr' ? "Nos produits les plus populaires incluent des bols en céramique tissés à la main, des portefeuilles en cuir artisanal et des sculptures en bois sculptées à la main. Tous ont d'excellentes critiques clients!" :"Our most popular products include handwoven ceramic bowls, artisan leather wallets, and hand-carved wooden sculptures. They all have excellent customer reviews!";
    }
    
    if (input?.includes('3d') || input?.includes('ar') || input?.includes('view')) {
      return currentLanguage === 'es'
        ? "¡Nuestra función de visualización 3D y AR es increíble! Puedes ver productos desde todos los ángulos e incluso colocarlos virtualmente en tu espacio. Busca los iconos '3D' y 'AR' en las tarjetas de productos."
        : currentLanguage === 'fr' ? "Notre fonction de visualisation 3D et AR est incroyable! Vous pouvez voir les produits sous tous les angles et même les placer virtuellement dans votre espace. Cherchez les icônes'3D' et 'AR' sur les cartes produits."
        : "Our 3D and AR viewing feature is amazing! You can see products from all angles and even place them virtually in your space. Look for the '3D' and 'AR' icons on product cards.";
    }
    
    if (input?.includes('artisan') || input?.includes('artist')) {
      return currentLanguage === 'es'
        ? "Nuestros artesanos vienen de todo el mundo, cada uno con su estilo y técnicas únicas. Puedes ver sus perfiles, leer sus historias y aprender sobre sus procesos creativos en cada página de producto."
        : currentLanguage === 'fr'
        ? "Nos artisans viennent du monde entier, chacun avec son style et ses techniques uniques. Vous pouvez voir leurs profils, lire leurs histoires et apprendre sur leurs processus créatifs sur chaque page produit."
        : "Our artisans come from around the world, each with their unique style and techniques. You can view their profiles, read their stories, and learn about their creative processes on each product page.";
    }
    
    // Default response
    return currentLanguage === 'es'
      ? "Gracias por tu pregunta. Puedo ayudarte a navegar por ArtisanHub, encontrar productos específicos, aprender sobre nuestros artesanos o explicar nuestras características como la visualización 3D/AR. ¿Qué te interesa más?"
      : currentLanguage === 'fr'
      ? "Merci pour votre question. Je peux vous aider à naviguer sur ArtisanHub, trouver des produits spécifiques, apprendre sur nos artisans ou expliquer nos fonctionnalités comme la visualisation 3D/AR. Qu'est-ce qui vous intéresse le plus?" :"Thanks for your question! I can help you navigate ArtisanHub, find specific products, learn about our artisans, or explain our features like 3D/AR viewing. What interests you most?";
  };

  const handleQuickAction = (action) => {
    handleSendMessage(action);
  };

  const startListening = () => {
    if (recognitionRef?.current && !isListening) {
      setIsListening(true);
      recognitionRef?.current?.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef?.current && isListening) {
      recognitionRef?.current?.stop();
      setIsListening(false);
    }
  };

  const handleTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'es' ? 'es-ES' : currentLanguage === 'fr' ? 'fr-FR' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="default"
          size="lg"
          onClick={toggleChatbot}
          className="w-14 h-14 rounded-full shadow-warm-lg hover:shadow-warm-xl transition-smooth"
          iconName={isOpen ? "X" : "MessageCircle"}
          iconSize={24}
        />
      </div>
      {/* Chatbot Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-card border border-border rounded-2xl shadow-warm-xl z-40 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Icon name="Bot" size={18} />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-sm">
                  {currentContent?.title}
                </h3>
                <p className="text-xs opacity-90">
                  {currentContent?.subtitle}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChatbot}
              iconName="Minimize2"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm">{message?.content}</p>
                  {message?.type === 'bot' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleTextToSpeech(message?.content)}
                      iconName="Volume2"
                      className="mt-2 h-6 px-2 text-xs opacity-70 hover:opacity-100"
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {messages?.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-caption">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {currentContent?.quickActions?.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className="text-xs"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            {isListening && (
              <div className="mb-2 text-center">
                <p className="text-xs text-accent font-caption">
                  {currentContent?.listeningMessage}
                </p>
              </div>
            )}
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={currentContent?.placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                  className="text-sm"
                />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={isListening ? stopListening : startListening}
                iconName={isListening ? "MicOff" : "Mic"}
                className={isListening ? 'text-red-500 border-red-500' : ''}
              />
              
              <Button
                variant="default"
                size="sm"
                onClick={() => handleSendMessage()}
                disabled={!inputValue?.trim()}
                iconName="Send"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;