import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect, useRef } from 'react';

export function StatsSection() {
  const { t } = useLanguage();
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Counter animation hook
  const useCounter = (end: number, duration: number = 2000, shouldAnimate: boolean, start: number = 0) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
      if (!shouldAnimate) return;
      
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const range = end - start;
        setCount(Math.floor(start + (range * easeOutQuart)));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldAnimate, start]);

    return count;
  };

  // Intersection Observer to trigger animation on mount
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const billionCounter = useCounter(800, 3500, hasAnimated, 0);
  const businessesCounter = useCounter(12000, 3500, hasAnimated, 4000);
  const satisfactionCounter = useCounter(96, 3500, hasAnimated, 70);
  const avgAdvanceCounter = useCounter(75, 3500, hasAnimated, 35);

  return (
    <section ref={sectionRef} className="py-14 bg-[#E7EAEE] dark:bg-[#1C242D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-6xl lg:text-7xl font-bold text-[#041E42] dark:text-white mb-3">
              ${billionCounter}M+
            </h2>
            <p className="text-xl text-[#52606D] dark:text-[#CBD2D9] mb-8">
              {t('stats.capitalDelivered')}<sup className="text-xs">1</sup>
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-[#0A1F35] rounded-xl p-5 border border-[#E4E7EB] dark:border-[#3E4C59]">
                <div className="text-3xl font-bold text-[#041E42] dark:text-white mb-1">
                  {businessesCounter.toLocaleString()}+
                </div>
                <div className="text-sm text-[#52606D] dark:text-[#CBD2D9]">{t('stats.businessesFunded')}</div>
              </div>
              <div className="bg-white dark:bg-[#0A1F35] rounded-xl p-5 border border-[#E4E7EB] dark:border-[#3E4C59]">
                <div className="text-3xl font-bold text-[#041E42] dark:text-white mb-1">
                  {satisfactionCounter}%
                </div>
                <div className="text-sm text-[#52606D] dark:text-[#CBD2D9]">{t('stats.satisfactionRate')}</div>
              </div>
              <div className="bg-white dark:bg-[#0A1F35] rounded-xl p-5 border border-[#E4E7EB] dark:border-[#3E4C59]">
                <div className="text-3xl font-bold text-[#041E42] dark:text-white mb-1">24-48hr</div>
                <div className="text-sm text-[#52606D] dark:text-[#CBD2D9]">{t('stats.avgFundingTime')}</div>
              </div>
              <div className="bg-white dark:bg-[#0A1F35] rounded-xl p-5 border border-[#E4E7EB] dark:border-[#3E4C59]">
                <div className="text-3xl font-bold text-[#041E42] dark:text-white mb-1">
                  ${avgAdvanceCounter}K
                </div>
                <div className="text-sm text-[#52606D] dark:text-[#CBD2D9]">{t('stats.averageAdvance')}</div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xl text-[#041E42] dark:text-white leading-relaxed mb-6">
              {t('stats.joinText')}
            </p>
            <p className="text-lg text-[#52606D] dark:text-[#CBD2D9] leading-relaxed">
              {t('stats.industryText')}
            </p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-[#E4E7EB] dark:border-[#3E4C59]">
          <p className="text-xs text-[#9AA5B1] italic">
            {t('stats.disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
}