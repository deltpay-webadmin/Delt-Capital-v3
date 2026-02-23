import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Star, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PreQualificationGame } from './PreQualificationGame';
import { SubtleBackground } from './SubtleBackground';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import businessPeopleImg from 'figma:asset/a03f9a9d95ad3eb3d24430a1c47663d5974d68f8.png';
import { BBBLogo } from './BBBLogo';

interface HeroSectionProps {
  onApplyClick: () => void;
  onApplyFromQuiz?: (data?: any) => void;
}

export function HeroSection({ onApplyClick, onApplyFromQuiz }: HeroSectionProps) {
  const { t } = useLanguage();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Initial 7-second hover animation on page load
  useEffect(() => {
    const button = document.querySelector('.get-offer-button');
    if (button) {
      // Add the initial hover animation class
      button.classList.add('initial-hover-animation');
      
      // Remove it after 7 seconds and mark animation as complete
      const timer = setTimeout(() => {
        button.classList.remove('initial-hover-animation');
        setInitialAnimationComplete(true);
      }, 7000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Bounce animation trigger - only starts after initial animation
  useEffect(() => {
    if (!initialAnimationComplete) return;
    
    // First bounce after 3 seconds
    const initialTimeout = setTimeout(() => {
      const button = document.querySelector('.get-offer-button');
      if (button && !isHovered) {
        button.classList.add('bouncing');
        setTimeout(() => button.classList.remove('bouncing'), 600);
      }
    }, 3000);
    
    // Subsequent bounces every 3 seconds
    const bounceInterval = setInterval(() => {
      const button = document.querySelector('.get-offer-button');
      if (button && !isHovered) {
        button.classList.add('bouncing');
        setTimeout(() => button.classList.remove('bouncing'), 600);
      }
    }, 3000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(bounceInterval);
    };
  }, [isHovered, initialAnimationComplete]);
  
  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300, // Increased stiffness for snappier response
    damping: 30,
    restDelta: 0.001
  });
  
  // Transform values for image
  // Image starts scale 1 (fullscreen) and shrinks to fit right column
  // Animation completes faster (0.2) to ensure text loads fully before scrolling past
  // On mobile, disable the animation by keeping values constant
  const scale = useTransform(smoothProgress, [0, 0.2], isMobile ? [1, 1] : [1, 0.48]); 
  const x = useTransform(smoothProgress, [0, 0.2], isMobile ? ["0%", "0%"] : ["0%", "26%"]); 
  const borderRadius = useTransform(smoothProgress, [0, 0.2], isMobile ? [0, 0] : [0, 24]);
  
  // Text content opacity - starts hidden, fades in as scroll progresses
  // On mobile, text is always visible (opacity: 1)
  // Delay appearance until image has shrunk significantly to avoid overlap (starts at 0.15)
  // Finishes exactly when image animation finishes (0.2) so it's fully visible when locked in.
  const contentOpacity = useTransform(smoothProgress, [0.15, 0.2], isMobile ? [1, 1] : [0, 1]);
  const contentY = useTransform(smoothProgress, [0.15, 0.2], isMobile ? [0, 0] : [40, 0]);
  
  // Overlay text opacity - disappears immediately when scrolling starts
  // On mobile, never show the overlay text
  const overlayOpacity = useTransform(smoothProgress, [0, 0.05], isMobile ? [0, 0] : [1, 0]);
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowQuiz(false);
    }
  };

  const handleShowResults = (data?: any) => {
    setQuizData(data);
    setShowQuiz(false);
    setShowResults(true);
  };

  const handleStartApplication = () => {
    setShowResults(false);
    if (onApplyFromQuiz) {
      onApplyFromQuiz(quizData);
    } else {
      onApplyClick();
    }
  };

  return (
    <>
      <div ref={heroRef} className={isMobile ? "relative" : "relative h-[165vh]"}>
        
        {/* Sticky Container - Only sticky on desktop */}
        <div className={isMobile ? "relative h-screen w-full overflow-hidden flex items-center bg-[#F5F7FA] dark:bg-[#1F2933] transition-colors duration-300" : "sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#F5F7FA] dark:bg-[#1F2933] transition-colors duration-300 mb-[-150px]"}>
          
          {/* Background Image Layer - Hidden on mobile */}
          {!isMobile && (
            <motion.div
              className="absolute inset-0 z-0 flex items-center justify-center"
              style={{
                scale,
                x,
                borderRadius,
                transformOrigin: "center center"
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                  <img 
                    src={businessPeopleImg} 
                    alt="Business owners working together"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041E42]/50 to-transparent dark:from-[#0A1F35]/60 dark:to-transparent"></div>
                  
                  {/* Black shadow overlay for text legibility */}
                  <motion.div 
                    className="absolute inset-0 bg-black/40"
                    style={{ opacity: overlayOpacity }}
                  ></motion.div>
                  
                  {/* Overlay Text - Disappears on scroll */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ opacity: overlayOpacity }}
                  >
                    <h2 
                      className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center px-8 leading-tight"
                      style={{ 
                        fontFamily: '"Codec Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <span>{t('hero.animated.capital')}</span>
                      <style>{`
                        .hero-speed-text {
                          background: linear-gradient(90deg, #FFFFFF 0%, #8B5CF6 12.5%, #1B17FF 25%, #60A5FA 37.5%, #FFFFFF 50%, #8B5CF6 62.5%, #1B17FF 75%, #60A5FA 87.5%, #FFFFFF 100%);
                          background-size: 600% 100%;
                          -webkit-background-clip: text;
                          background-clip: text;
                          color: transparent;
                          -webkit-text-fill-color: transparent;
                          animation: gradientWave 16s linear infinite;
                        }
                      `}</style>
                      <span>{t('hero.animated.moves')}</span>
                      <span className="inline-block hero-speed-text">{t('hero.animated.speed')}</span>
                    </h2>
                  </motion.div>
              </div>
            </motion.div>
          )}

          {/* Subtle Background - Static behind text */}
          <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
             <SubtleBackground />
          </div>

          {/* Content Layer - Static position */}
          <div className="relative z-10 w-full h-full mx-auto px-6 sm:px-8 lg:px-12 flex items-center lg:items-center pointer-events-none">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center w-full pointer-events-auto">
              
              {/* Left Column: Text Content */}
              {/* Wrapped in motion.div to control visibility based on scroll - only animated on desktop */}
              {isMobile ? (
                <div className="w-full">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#041E42] dark:text-white mb-6 sm:mb-7 lg:mb-5 leading-tight">
                    {t('hero.title')}
                  </h1>
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-xl xl:text-2xl 2xl:text-3xl text-[#52606D] dark:text-[#CBD2D9] mb-9 sm:mb-10 md:mb-11 lg:mb-7 leading-relaxed">
                    {t('hero.subtitle')}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-5 mb-9 sm:mb-10 md:mb-11">
                    <button
                      onClick={() => setShowQuiz(true)}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="get-offer-button bg-transparent text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl px-8 sm:px-9 lg:px-8 py-5 sm:py-5 lg:py-4 rounded-lg font-bold transition-all duration-300"
                    >
                      <span className="button-text">{t('hero.cta')}</span>
                    </button>
                    <style>{`
                      @keyframes subtleBounce {
                        0%, 100% {
                          transform: translateY(0);
                        }
                        50% {
                          transform: translateY(-8px);
                        }
                      }
                      
                      .get-offer-button {
                        position: relative;
                      }
                      
                      .get-offer-button.bouncing:not(:hover) {
                        animation: subtleBounce 0.6s ease-in-out;
                      }
                      
                      .get-offer-button .button-text {
                        color: #4945ff;
                        transition: color 0.3s ease;
                      }
                      
                      .get-offer-button:hover .button-text,
                      .get-offer-button.initial-hover-animation .button-text {
                        background: linear-gradient(90deg, #4F46E5 0%, #8B5CF6 15%, #1B17FF 30%, #60A5FA 45%, #4F46E5 60%, #8B5CF6 75%, #1B17FF 90%, #60A5FA 100%);
                        background-size: 300% 100%;
                        -webkit-background-clip: text;
                        background-clip: text;
                        color: transparent;
                        -webkit-text-fill-color: transparent;
                        animation: gradientWave 5s linear infinite;
                      }
                      
                      .get-offer-button:hover,
                      .get-offer-button.initial-hover-animation {
                        transform: scale(1.02);
                      }
                    `}</style>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 sm:gap-6 lg:gap-5 mb-7 sm:mb-8 lg:mb-3">
                    <div className="flex items-center gap-2.5 sm:gap-2.5">
                      <BBBLogo className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                      <span className="text-yellow-500 flex">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                      </span>
                      <span className="text-base sm:text-lg md:text-xl lg:text-base xl:text-lg font-bold text-[#041E42] dark:text-white">A+</span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-2.5">
                      <span className="text-base sm:text-lg md:text-xl lg:text-base xl:text-lg font-semibold text-[#041E42] dark:text-white">Trustpilot</span>
                      <span className="text-green-500 flex">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                      </span>
                      <span className="text-base sm:text-lg md:text-xl lg:text-base xl:text-lg font-bold text-[#041E42] dark:text-white">4.8</span>
                    </div>
                  </div>
                
                  <p className="text-sm sm:text-base md:text-lg lg:text-sm text-[#9AA5B1] dark:text-[#9AA5B1] italic leading-relaxed">
                    Delt is a financial technology company, not a bank. Banking services provided by Coastal Community Bank, Member FDIC.
                  </p>
                </div>
              ) : (
                <motion.div 
                  className="p-4 sm:p-6 md:p-7 lg:p-8 rounded-3xl transition-all duration-300 bg-white/95 dark:bg-[#0A1F35]/95 backdrop-blur-md lg:bg-transparent lg:dark:bg-transparent lg:backdrop-blur-none shadow-2xl lg:shadow-none w-full overflow-hidden"
                  style={{ opacity: contentOpacity, y: contentY }}
                >
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#041E42] dark:text-white mb-2 sm:mb-4 lg:mb-5 leading-tight">
                  {t('hero.title')}
                </h1>
                <p className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-[#52606D] dark:text-[#CBD2D9] mb-3 sm:mb-5 md:mb-6 lg:mb-7 leading-snug">
                  {t('hero.subtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-5 md:mb-6">
                  <button
                    onClick={() => setShowQuiz(true)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="get-offer-button bg-transparent text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg font-bold transition-all duration-300"
                  >
                    <span className="button-text">{t('hero.cta')}</span>
                  </button>
                  <style>{`
                    @keyframes subtleBounce {
                      0%, 100% {
                        transform: translateY(0);
                      }
                      50% {
                        transform: translateY(-8px);
                      }
                    }
                    
                    .get-offer-button {
                      position: relative;
                    }
                    
                    .get-offer-button.bouncing:not(:hover) {
                      animation: subtleBounce 0.6s ease-in-out;
                    }
                    
                    .get-offer-button .button-text {
                      color: #4945ff;
                      transition: color 0.3s ease;
                    }
                    
                    .get-offer-button:hover .button-text,
                    .get-offer-button.initial-hover-animation .button-text {
                      background: linear-gradient(90deg, #4F46E5 0%, #8B5CF6 15%, #1B17FF 30%, #60A5FA 45%, #4F46E5 60%, #8B5CF6 75%, #1B17FF 90%, #60A5FA 100%);
                      background-size: 300% 100%;
                      -webkit-background-clip: text;
                      background-clip: text;
                      color: transparent;
                      -webkit-text-fill-color: transparent;
                      animation: gradientWave 5s linear infinite;
                    }
                    
                    .get-offer-button:hover,
                    .get-offer-button.initial-hover-animation {
                      transform: scale(1.02);
                    }
                  `}</style>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 lg:gap-5 mb-1.5 sm:mb-3 lg:mb-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <BBBLogo className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                    <span className="text-yellow-500 flex">
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                    </span>
                    <span className="text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-[#041E42] dark:text-white">A+</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-semibold text-[#041E42] dark:text-white">Trustpilot</span>
                    <span className="text-green-500 flex">
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 fill-current" />
                    </span>
                    <span className="text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-[#041E42] dark:text-white">4.8</span>
                  </div>
                </div>
              
                <p className="text-[7px] sm:text-[10px] md:text-xs lg:text-sm text-[#9AA5B1] dark:text-[#9AA5B1] italic mt-1 sm:mt-3 leading-tight">
                  Delt is a financial technology company, not a bank. Banking services provided by Coastal Community Bank, Member FDIC.
                </p>
              </motion.div>
              )}
              
              {/* Right Column: Spacer to reserve space for the image when it shrinks */}
              <div className="hidden lg:block h-full"></div>
            </div>
          </div>
        </div>
      </div>

    {/* Quiz Modal */}
    {showQuiz && (
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto"
        onClick={handleBackdropClick}
        style={{ scrollbarGutter: 'stable' }}
      >
        <div className="w-full max-w-4xl mb-16 relative">
          <button
            onClick={() => setShowQuiz(false)}
            className="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full shadow-2xl flex items-center justify-center z-10 transition-all hover:scale-110"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <PreQualificationGame startWithQuiz={true} onShowResults={handleShowResults} />
        </div>
      </div>
    )}

    {/* Results Full Page */}
    {showResults && (
      <div 
        className="fixed inset-0 bg-[#F5FBFF] dark:bg-[#0A1F35] z-50 flex items-start justify-center p-4 overflow-y-auto"
        style={{ scrollbarGutter: 'stable' }}
      >
        <div className="w-full max-w-4xl my-auto">
          <PreQualificationGame 
            startWithQuiz={true} 
            showResultsOnly={true}
            onCloseResults={() => setShowResults(false)}
            onStartApplication={handleStartApplication}
          />
        </div>
      </div>
    )}
  </>
  );
}