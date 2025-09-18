import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatBot = ({ currentLanguage = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message when opened
    if (isOpen && messages?.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'bot',
        content: getLocalizedText('welcome'),
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const getLocalizedText = (key) => {
    const texts = {
      en: {
        welcome: "Hello! I'm your AI shopping assistant. I can help you find products, answer questions about artisans, or guide you through the marketplace. How can I assist you today?",
        placeholder: "Type your message...",
        send: "Send",
        typing: "AI is typing...",
        error: "Sorry, I couldn't process that. Please try again.",
        suggestions: {
          findProducts: "Find pottery products",
          viewRecommendations: "Show me recommendations",
          helpNavigation: "Help me navigate",
          contactArtisan: "How to contact an artisan"
        }
      },
      es: {
        welcome: "¡Hola! Soy tu asistente de compras con IA. Puedo ayudarte a encontrar productos, responder preguntas sobre artesanos o guiarte por el mercado. ¿Cómo puedo ayudarte hoy?",
        placeholder: "Escribe tu mensaje...",
        send: "Enviar",
        typing: "La IA está escribiendo...",
        error: "Lo siento, no pude procesar eso. Inténtalo de nuevo.",
        suggestions: {
          findProducts: "Encontrar productos de cerámica",
          viewRecommendations: "Mostrar recomendaciones",
          helpNavigation: "Ayúdame a navegar",
          contactArtisan: "Cómo contactar a un artesano"
        }
      }
    };
    
    const langTexts = texts?.[currentLanguage] || texts?.en;
    return key?.split('.')?.reduce((obj, k) => obj?.[k], langTexts) || texts?.en?.[key];
  };

  const handleSendMessage = async (content = inputValue) => {
    if (!content?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: content?.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(content?.trim());
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput?.toLowerCase();
    
    if (input?.includes('product') || input?.includes('find') || input?.includes('search')) {
      return "I can help you find products! You can use the filters on the left to narrow down by category, price range, or location. Would you like me to suggest some popular categories like pottery, textiles, or jewelry?";
    }
    
    if (input?.includes('recommend') || input?.includes('suggest')) {
      return "Based on your browsing history, I'd recommend checking out the AI Recommendations panel on the right. It shows personalized picks just for you! You can also enable AR viewing for an immersive experience.";
    }
    
    if (input?.includes('artisan') || input?.includes('seller') || input?.includes('contact')) {
      return "To contact an artisan, click on any product card and then 'View Profile' to see their contact information. You can also message them directly through their profile page.";
    }
    
    if (input?.includes('ar') || input?.includes('3d') || input?.includes('view')) {
      return "Many products support AR and 3D viewing! Look for the AR and 3D badges on product cards. Click 'Quick View' and then use the 'View in AR' or '3D Model' buttons for an immersive experience.";
    }
    
    if (input?.includes('price') || input?.includes('cost') || input?.includes('expensive')) {
      return "You can filter products by price range using the filters panel. Set your minimum and maximum budget to find products within your price range. Prices are shown in USD by default.";
    }
    
    if (input?.includes('language') || input?.includes('translate')) {
      return "The platform supports multiple languages! Use the language selector in the top navigation to switch between English, Spanish, French, and other supported languages.";
    }
    
    if (input?.includes('help') || input?.includes('how') || input?.includes('navigate')) {
      return "I'm here to help! You can browse products using the main grid, apply filters on the left, check AI recommendations on the right, or use voice commands. What specific area would you like help with?";
    }
    
    return "I understand you're looking for assistance. I can help you find products, navigate the marketplace, learn about artisans, or use features like AR viewing. Could you be more specific about what you need help with?";
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-4 right-20 z-40">
        <Button
          variant="default"
          size="lg"
          onClick={toggleChat}
          className="rounded-full shadow-warm-lg"
          iconName="MessageCircle"
          iconSize={20}
        >
          AI Chat
        </Button>
      </div>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-background border border-border rounded-lg shadow-warm-xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} color="var(--color-accent-foreground)" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground text-sm">
                  AI Assistant
                </h3>
                <p className="text-xs text-muted-foreground font-caption">
                  Online
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                  }`}
                >
                  {message?.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-lg text-sm flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs">{getLocalizedText('typing')}</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages?.length === 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {Object.values(getLocalizedText('suggestions'))?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder={getLocalizedText('placeholder')}
                value={inputValue}
                onChange={(e) => setInputValue(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                variant="default"
                size="icon"
                onClick={() => handleSendMessage()}
                disabled={!inputValue?.trim() || isTyping}
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;