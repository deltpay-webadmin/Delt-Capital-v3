import { Users, TrendingUp, Package, Building2, Megaphone, Wrench, PhoneCall, GripHorizontal } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

interface UseCapitalSectionProps {
  onTalkToSpecialist?: () => void;
}

export function UseCapitalSection({ onTalkToSpecialist }: UseCapitalSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const hasDragged = useRef(false);

  const uses = [
    {
      icon: Users,
      title: t('capital.payroll.title'),
      description: t('capital.payroll.desc'),
    },
    {
      icon: Building2,
      title: t('capital.expansion.title'),
      description: t('capital.expansion.desc'),
    },
    {
      icon: Package,
      title: t('capital.inventory.title'),
      description: t('capital.inventory.desc'),
    },
    {
      icon: Megaphone,
      title: t('capital.marketing.title'),
      description: t('capital.marketing.desc'),
    },
    {
      icon: Wrench,
      title: t('capital.equipment.title'),
      description: t('capital.equipment.desc'),
    },
    {
      icon: TrendingUp,
      title: t('capital.vendor.title'),
      description: t('capital.vendor.desc'),
    },
  ];

  const totalItems = uses.length;

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    hasDragged.current = false;
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    dragDelta.current = e.clientX - dragStartX.current;
    if (Math.abs(dragDelta.current) > 8) {
      hasDragged.current = true;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const threshold = 60;
    if (dragDelta.current > threshold) {
      // Dragged right → go previous
      setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (dragDelta.current < -threshold) {
      // Dragged left → go next
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }
    // Reset after a small delay so the click handler can check hasDragged
    setTimeout(() => {
      hasDragged.current = false;
    }, 50);
  }, [totalItems]);

  // Touch drag handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragDelta.current = 0;
    hasDragged.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    dragDelta.current = e.touches[0].clientX - dragStartX.current;
    if (Math.abs(dragDelta.current) > 8) {
      hasDragged.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const threshold = 50;
    if (dragDelta.current > threshold) {
      setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (dragDelta.current < -threshold) {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }
    setTimeout(() => {
      hasDragged.current = false;
    }, 50);
  }, [totalItems]);

  // Global mouse listeners for drag
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Click on a card to rotate to it
  const handleCardClick = useCallback((index: number) => {
    if (hasDragged.current) return; // Ignore click if it was a drag
    setActiveIndex(index);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (e.key === 'ArrowRight') {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }
  }, [totalItems]);

  // Calculate card positions for a 3D carousel
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;

    // For a circular feel, wrap around
    let adjustedDiff = diff;
    if (diff > totalItems / 2) adjustedDiff = diff - totalItems;
    if (diff < -totalItems / 2) adjustedDiff = diff + totalItems;

    const absAdjustedDiff = Math.abs(adjustedDiff);

    // Cards beyond range of 2 are hidden
    if (absAdjustedDiff > 2) {
      return {
        opacity: 0,
        x: adjustedDiff > 0 ? 800 : -800,
        scale: 0.5,
        rotateY: adjustedDiff > 0 ? -50 : 50,
      };
    }

    const xOffset = adjustedDiff * 380;
    const scaleVal = 1 - absAdjustedDiff * 0.13;
    const opacityVal = absAdjustedDiff === 0 ? 1 : absAdjustedDiff === 1 ? 0.65 : 0.35;
    const rotateY = adjustedDiff * -18;

    return {
      x: xOffset,
      scale: scaleVal,
      opacity: opacityVal,
      rotateY,
    };
  };

  return (
    <section ref={sectionRef} className="py-24 bg-[#F5F7FA] dark:bg-[#1F2933] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Talk to Specialist Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={onTalkToSpecialist}
            className="px-8 py-4 bg-[#1B17FF] text-white font-bold rounded-lg flex items-center gap-3 shadow-lg cursor-pointer"
          >
            <PhoneCall className="w-5 h-5" />
            Talk to a Funding Specialist
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            className="text-4xl font-bold text-[#041e42] dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {t('capital.title')}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('capital.subtitle')}
          </motion.p>
        </div>

        {/* Drag hint */}
        <motion.div
          className="flex items-center justify-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8 select-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GripHorizontal className="w-4 h-4" />
          <span>Drag or click to explore</span>
        </motion.div>

        {/* 3D Carousel — drag + click interactive */}
        <div
          ref={carouselRef}
          className="relative mx-auto select-none"
          style={{ perspective: '1400px', height: '400px', cursor: isDragging.current ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Capital use cases carousel"
          aria-roledescription="carousel"
        >
          <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {uses.map((use, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={index}
                  className="absolute w-[320px] sm:w-[380px] lg:w-[420px]"
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    opacity: style.opacity,
                    rotateY: style.rotateY,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 28,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: isActive ? 10 : 10 - Math.abs(index - activeIndex),
                    pointerEvents: style.opacity === 0 ? 'none' : 'auto',
                  }}
                  onClick={() => handleCardClick(index)}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${totalItems}: ${use.title}`}
                >
                  <div
                    className={`
                      bg-white dark:bg-[#2D3748] rounded-2xl border transition-all duration-300
                      px-10 py-10 sm:px-12 sm:py-11
                      ${isActive
                        ? 'shadow-2xl border-[#1B17FF]/30 ring-2 ring-[#1B17FF]/20'
                        : 'shadow-md border-[#E4E7EB] dark:border-[#3E4C59] hover:shadow-lg'
                      }
                    `}
                    style={{ cursor: isActive ? 'default' : 'pointer' }}
                  >
                    <div
                      className={`
                        w-16 h-16 rounded-xl flex items-center justify-center mb-7 transition-all duration-300
                        ${isActive ? 'bg-[#1B17FF] scale-110' : 'bg-[#1B17FF]/80'}
                      `}
                    >
                      <use.icon className="w-8 h-8 text-white" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#041e42] dark:text-white mb-4">
                      {use.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[1.05rem]">
                      {use.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation: dots + counter + arrows */}
        <div className="flex flex-col items-center mt-10 gap-4">
          {/* Arrow buttons + dots */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems)}
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-[#1B17FF] hover:text-white hover:border-[#1B17FF] transition-all duration-200"
              aria-label="Previous card"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="flex items-center gap-2.5">
              {uses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="relative p-1"
                  aria-label={`Go to card ${index + 1}`}
                >
                  <div
                    className={`
                      rounded-full transition-all duration-300
                      ${index === activeIndex
                        ? 'w-8 h-2.5 bg-[#1B17FF]'
                        : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-[#1B17FF]/50'
                      }
                    `}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % totalItems)}
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-[#1B17FF] hover:text-white hover:border-[#1B17FF] transition-all duration-200"
              aria-label="Next card"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Counter */}
          <div className="text-sm text-gray-500 dark:text-gray-400 tabular-nums">
            <span className="text-[#1B17FF] font-bold">{activeIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{totalItems}</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20">
          <div className="bg-white dark:bg-[#1F2933] rounded-2xl shadow-md p-10 border border-[#E4E7EB] dark:border-[#3E4C59]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[#041e42] dark:text-white mb-3">
                  {t('capital.helpTitle')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {t('capital.helpDesc')}
                </p>
              </div>
              <div className="flex-shrink-0">
                <a href="tel:+18647293358" className="text-3xl font-bold text-[#1b17ff] hover:text-[#1510dd] transition-colors">
                  (864) 729-3358
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t('capital.hours')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}