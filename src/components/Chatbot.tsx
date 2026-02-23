import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import logoImg from 'figma:asset/d59993d0ec9040f5cac8ad4361f161b6a4b3a746.png';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatbotProps {
  onApplyClick?: () => void;
  onCalculatorClick?: () => void;
  onBookingClick?: () => void;
  onSupportClick?: () => void;
}

export function Chatbot({ onApplyClick, onCalculatorClick, onBookingClick, onSupportClick }: ChatbotProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    if (language === 'es') {
      return currentTime.toLocaleString('es-ES', options);
    }
    return currentTime.toLocaleString('en-US', options);
  };

  const handleAction = (action: string) => {
    setIsExpanded(false); // Close chatbot after action
    
    switch (action) {
      case 'apply':
        onApplyClick?.();
        break;
      case 'book-meeting':
        onBookingClick?.();
        break;
      case 'calculator':
        onCalculatorClick?.();
        break;
      case 'support':
        onSupportClick?.();
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-[350px] overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-[#1b17ff] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <img src={logoImg} alt="Delt" className="h-6" />
              </div>
              <span className="font-semibold">Delt</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="hover:bg-white/20 rounded-lg p-1 transition-colors"
              aria-label="Minimize chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-6 max-h-[500px] overflow-y-auto">
            {/* Time */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              {formatTime()}
            </div>

            {/* Bot Message */}
            <div className="flex items-start gap-3 mb-6">
              <div className="w-8 h-8 bg-[#1b17ff] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-sm p-4 flex-1">
                <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">
                  {language === 'es' 
                    ? '¿Necesitas capital de trabajo? ¿Quieres calcular tu financiamiento? Ponte en contacto con nuestros expertos 👇'
                    : 'Need working capital? Want to calculate your funding? Get in touch with our experts 👇'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 ml-11">
              <button
                onClick={() => handleAction('apply')}
                className="w-full bg-[#e6f7ff] dark:bg-[#1b17ff]/20 hover:bg-[#d1f0ff] dark:hover:bg-[#1b17ff]/30 text-[#1b17ff] dark:text-[#6b68ff] rounded-full px-6 py-3 text-sm font-semibold transition-colors text-left"
              >
                {language === 'es' ? 'Solicitar financiamiento' : 'Apply for funding'}
              </button>
              <button
                onClick={() => handleAction('calculator')}
                className="w-full bg-[#e6f7ff] dark:bg-[#1b17ff]/20 hover:bg-[#d1f0ff] dark:hover:bg-[#1b17ff]/30 text-[#1b17ff] dark:text-[#6b68ff] rounded-full px-6 py-3 text-sm font-semibold transition-colors text-left"
              >
                {language === 'es' ? 'Calcular mi financiamiento' : 'Calculate my funding'}
              </button>
              <button
                onClick={() => handleAction('book-meeting')}
                className="w-full bg-[#e6f7ff] dark:bg-[#1b17ff]/20 hover:bg-[#d1f0ff] dark:hover:bg-[#1b17ff]/30 text-[#1b17ff] dark:text-[#6b68ff] rounded-full px-6 py-3 text-sm font-semibold transition-colors text-left"
              >
                {language === 'es' ? 'Reservar una reunión' : 'Book a meeting'}
              </button>
              <button
                onClick={() => handleAction('support')}
                className="w-full bg-[#e6f7ff] dark:bg-[#1b17ff]/20 hover:bg-[#d1f0ff] dark:hover:bg-[#1b17ff]/30 text-[#1b17ff] dark:text-[#6b68ff] rounded-full px-6 py-3 text-sm font-semibold transition-colors text-left"
              >
                {language === 'es' ? 'Necesito soporte' : 'I need support'}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {language === 'es' 
                ? 'Estamos aquí para ayudarte 24/7'
                : 'We\'re here to help 24/7'}
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-[#1b17ff] hover:bg-[#1510dd] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-all hover:scale-110 relative"
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span>
        </button>
      )}
    </div>
  );
}