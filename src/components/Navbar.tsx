import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Globe } from 'lucide-react';
import logoImg from 'figma:asset/d59993d0ec9040f5cac8ad4361f161b6a4b3a746.png';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  onApplyClick: () => void;
}

export function Navbar({ onApplyClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-[#1F2933]/95 backdrop-blur-sm shadow-sm z-50 border-b border-[#E4E7EB] dark:border-[#3E4C59] transition-colors duration-300 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center h-14 w-auto cursor-pointer flex-shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={logoImg} alt="Delt Capital" className="h-10 w-auto object-contain" />
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Language Toggle - Hidden on mobile */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Theme Toggle - Hidden on mobile */}
            <button
              onClick={toggleTheme}
              className="hidden md:block p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            <button 
              onClick={onApplyClick}
              className={`get-funded-button ${isScrolling ? 'scrolling' : ''} bg-transparent px-4 py-2 font-black rounded-lg outline-none cursor-pointer flex-shrink-0 relative whitespace-nowrap`}
              style={{
                fontSize: '1.44rem',
                fontFamily: "'Open Sauce Sans', 'Codec Pro', sans-serif",
              }}
            >
              Get Funded
            </button>
            <style>{`
              .get-funded-button {
                color: #4945ff;
              }
              
              .get-funded-button:hover,
              .get-funded-button.scrolling {
                background: linear-gradient(90deg, #4F46E5 0%, #8B5CF6 15%, #1B17FF 30%, #60A5FA 45%, #4F46E5 60%, #8B5CF6 75%, #1B17FF 90%, #60A5FA 100%);
                background-size: 300% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                animation: gradientWave 5s linear infinite;
              }
            `}</style>
          </div>
        </div>
      </div>
    </nav>
  );
}