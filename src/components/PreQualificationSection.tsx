import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import { PreQualificationGame } from './PreQualificationGame';
import { motion, useScroll, useTransform } from 'motion/react';
import phoneImage from 'figma:asset/c2e752677e841b151fef6be1d4f06c7b6c37d4ec.png';
import { useLanguage } from '../contexts/LanguageContext';

interface PreQualificationSectionProps {
  onApplyClick?: () => void;
  onApplyFromQuiz?: (data?: any) => void;
}

export interface PreQualificationSectionRef {
  openQuiz: () => void;
  scrollToSection: () => void;
}

export const PreQualificationSection = forwardRef<PreQualificationSectionRef, PreQualificationSectionProps>(({ onApplyClick, onApplyFromQuiz }, ref) => {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useImperativeHandle(ref, () => ({
    openQuiz: () => setShowModal(true),
    scrollToSection: () => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }));
  
  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });
  
  // Transform values for the phone image
  // Starts bloated (3.2), shrinks to fit (1.5) as user scrolls to center
  const phoneScale = useTransform(scrollYProgress, [0, 1], [3.2, 1.5]);
  const phoneX = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  const handleShowResults = (data?: any) => {
    setQuizData(data);
    setShowModal(false);
    setShowResults(true);
  };

  const handleStartApplication = () => {
    setShowResults(false);
    if (onApplyFromQuiz) {
      onApplyFromQuiz(quizData);
    } else if (onApplyClick) {
      onApplyClick();
    }
  };

  return (
    <>
      {/* Attention-Grabbing Banner */}
      <section ref={sectionRef} className="py-20 bg-[#041E42] relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left side - Content */}
            <motion.div 
              className="text-center lg:text-left"
            >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight"
            >
              {t('preQual.title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8"
            >
              {t('preQual.subtitle')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4"
            >
              {t('preQual.questions')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 lg:gap-6 mb-10 text-white/90"
            >
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base lg:text-lg">{t('preQual.probability')}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base lg:text-lg">{t('preQual.estimatedFunding')}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base lg:text-lg">{t('preQual.expectedPricing')}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -80, scale: 0.85 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 18 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <button
                onClick={() => setShowModal(true)}
                className="prequal-cta-button bg-[#22C55E] text-sm sm:text-base md:text-lg lg:text-xl py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg font-bold transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <span className="prequal-cta-text">{t('preQual.button')}</span>
              </button>
              <style>{`
                @keyframes ctaBounce {
                  0%, 20%, 100% {
                    transform: translateY(0);
                  }
                  6% {
                    transform: translateY(-8px);
                  }
                  12% {
                    transform: translateY(0);
                  }
                  16% {
                    transform: translateY(-3px);
                  }
                }
                
                .prequal-cta-button {
                  position: relative;
                  animation: ctaBounce 3s ease-in-out infinite;
                }
                
                .prequal-cta-text {
                  color: #ffffff;
                  -webkit-text-fill-color: #ffffff;
                  transition: all 0.3s ease;
                }
                
                .prequal-cta-button:hover {
                  animation: none;
                  transform: scale(1.02) translateY(0);
                  background-color: #ffffff;
                }
                
                .prequal-cta-button:hover .prequal-cta-text {
                  color: #22C55E;
                  -webkit-text-fill-color: #22C55E;
                }
              `}</style>

              <div className="flex flex-col sm:flex-row items-center gap-3 text-white/90 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="whitespace-nowrap">{t('preQual.noCredit')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="whitespace-nowrap">{t('preQual.instantResults')}</span>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-white/70 text-xs sm:text-sm"
            >
              {t('preQual.joinText')}
            </motion.p>
            </motion.div>

            {/* Right side - Phone mockup with scroll animation */}
            <div className="hidden lg:flex justify-center items-center relative">
            <motion.img
              src={phoneImage}
              alt="Delt Capital Mobile App"
              loading="eager"
              className="w-full max-w-[358px] drop-shadow-2xl origin-center"
              style={{
                scale: phoneScale,
                x: phoneX,
                y: phoneY,
                opacity: phoneOpacity,
                imageRendering: '-webkit-optimize-contrast',
                WebkitFontSmoothing: 'antialiased',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            />
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <div className="w-full max-w-4xl mb-16 relative">
            <button
              onClick={() => setShowModal(false)}
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
        <div className="fixed inset-0 bg-[#F9FAFB] dark:bg-[#0A1F35] z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
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
});

PreQualificationSection.displayName = 'PreQualificationSection';