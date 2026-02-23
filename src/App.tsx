import { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { PreQualificationSection, PreQualificationSectionRef } from './components/PreQualificationSection';
import { UseCapitalSection } from './components/UseCapitalSection';
import { ComparisonTable } from './components/ComparisonTable';
import { NewFAQSection } from './components/NewFAQSection';

import BookingPage from './components/BookingPage';
import { AboutPage } from './components/AboutPageClean';
import { ReviewsPage } from './components/ReviewsPage';
import { BlogPage } from './components/BlogPage';
import { SupportPage } from './components/SupportPage';
import { WinsPage } from './components/WinsPage';
import { ApplicationPage } from './components/ApplicationPage';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { CapitalCostAnalyzer } from './components/CapitalCostAnalyzer';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { X } from 'lucide-react';
import { TermsOfUse, PrivacyPolicy, ElectronicCommunicationsAgreement } from './components/legal/LegalPages';
import logoImg from 'figma:asset/d59993d0ec9040f5cac8ad4361f161b6a4b3a746.png';
import faviconImg from 'figma:asset/c3c469c594c03c3bfc98fd83feeab8caee9ddef8.png';

function AppContent() {
  const [showApplication, setShowApplication] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showWins, setShowWins] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [mcaTab, setMcaTab] = useState<string | undefined>(undefined);
  const [quizData, setQuizData] = useState<any>(null);
  const preQualSectionRef = useRef<PreQualificationSectionRef>(null);

  const [legalPage, setLegalPage] = useState<'terms' | 'privacy' | 'eca' | null>(null);

  useEffect(() => {
    // Basic routing for legal pages
    const path = window.location.pathname;
    if (path === '/terms') setLegalPage('terms');
    else if (path === '/privacy') setLegalPage('privacy');
    else if (path === '/electronic-communications') setLegalPage('eca');
  }, []);

  // Set Delt favicon
  useEffect(() => {
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = faviconImg;
    document.head.appendChild(link);
  }, []);

  const handleLegalLinkClick = (page: 'terms' | 'privacy' | 'eca') => {
    setLegalPage(page);
  };

  // "Apply now" button - goes directly to application, skips quiz
  const handleApplyClick = () => {
    setShowApplication(true);
    setQuizData(null);
  };

  // Called when starting application from quiz results
  const handleApplyFromQuiz = (data?: any) => {
    setShowApplication(true);
    setQuizData(data || null);
  };

  const handleCloseApplication = () => {
    setShowApplication(false);
    setQuizData(null);
  };

  const handleAboutClick = () => {
    setShowAbout(true);
  };

  const handleCloseAbout = () => {
    setShowAbout(false);
  };

  const handleHowItWorksClick = () => {
    setMcaTab('how-it-works');
  };

  const handleReviewsClick = () => {
    setShowReviews(true);
  };

  const handleCloseReviews = () => {
    setShowReviews(false);
  };

  const handleBlogClick = () => {
    setShowBlog(true);
  };

  const handleCloseBlog = () => {
    setShowBlog(false);
  };

  const handleSupportClick = () => {
    setShowSupport(true);
  };

  const handleCloseSupport = () => {
    setShowSupport(false);
  };

  const handleWinsClick = () => {
    setShowWins(true);
  };

  const handleCloseWins = () => {
    setShowWins(false);
  };

  const handleChatClick = () => {
    // This will trigger the chatbot to open
    const chatbotButton = document.querySelector('[aria-label="Open chat"]') as HTMLButtonElement;
    if (chatbotButton) {
      chatbotButton.click();
    }
  };

  const handleFAQClick = () => {
    // Scroll to NewFAQ section and center it
    setTimeout(() => {
      const faqElement = document.getElementById('new-faq-section');
      if (faqElement) {
        faqElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleTalkToSpecialist = () => {
    setShowBooking(true);
  };

  const handleQuizClick = () => {
    // Scroll to PreQualification section and open quiz
    preQualSectionRef.current?.scrollToSection();
    setTimeout(() => {
      preQualSectionRef.current?.openQuiz();
    }, 500);
  };

  const handleCalculatorClick = () => {
    setShowCalculator(true);
  };

  const handleCloseCalculator = () => {
    setShowCalculator(false);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#0A1F35] transition-colors duration-300">
      <Navbar onApplyClick={handleApplyClick} onCalculatorClick={handleCalculatorClick} />
      
      <main>
        <HeroSection onApplyClick={handleApplyClick} onApplyFromQuiz={handleApplyFromQuiz} />
        <PreQualificationSection ref={preQualSectionRef} onApplyClick={handleApplyClick} onApplyFromQuiz={handleApplyFromQuiz} />
        <UseCapitalSection onTalkToSpecialist={handleTalkToSpecialist} />
        <StatsSection />
        <section className="py-8 md:py-12 lg:py-16 bg-white dark:bg-[#0A1F35]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CapitalCostAnalyzer onApplyClick={handleApplyClick} />
          </div>
        </section>
        <ComparisonTable />
        <NewFAQSection />
      </main>

      <Footer onAboutClick={handleAboutClick} onHowItWorksClick={handleHowItWorksClick} onReviewsClick={handleReviewsClick} onBlogClick={handleBlogClick} onFAQClick={handleFAQClick} onSupportClick={handleSupportClick} onWinsClick={handleWinsClick} onApplyClick={handleApplyClick} onQuizClick={handleQuizClick} onPrivacyClick={() => handleLegalLinkClick('privacy')} onTermsClick={() => handleLegalLinkClick('terms')} onDisclosuresClick={() => handleLegalLinkClick('eca')} />

      <Chatbot 
        onApplyClick={handleApplyClick}
        onCalculatorClick={handleCalculatorClick}
        onBookingClick={handleTalkToSpecialist}
        onSupportClick={handleSupportClick}
      />

      {/* Application Page - Fully Embedded */}
      {showApplication && (
        <ApplicationPage 
          onClose={handleCloseApplication}
          quizData={quizData}
          fromQuiz={!!quizData}
          onLegalLinkClick={handleLegalLinkClick}
        />
      )}
      
      {showAbout && (
        <div className="fixed inset-0 bg-white dark:bg-[#0a1929] z-50 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-white dark:bg-[#0a1929] border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center h-14 w-auto cursor-pointer" onClick={handleCloseAbout}>
                <img src={logoImg} alt="Delt Capital" className="h-10 w-auto object-contain" />
              </div>
              <button
                onClick={handleCloseAbout}
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
          <AboutPage onClose={handleCloseAbout} onApplyClick={handleQuizClick} onCalculatorClick={handleCalculatorClick} onReviewsClick={handleReviewsClick} />
        </div>
      )}
      
      {showReviews && <ReviewsPage onClose={handleCloseReviews} onCalculatorClick={handleCalculatorClick} />}
      
      {showBlog && <BlogPage onClose={handleCloseBlog} />}

      {showSupport && <SupportPage onClose={handleCloseSupport} onChatClick={handleChatClick} onFAQClick={handleFAQClick} onQuizClick={handleQuizClick} onBookingClick={handleTalkToSpecialist} />}

      {showWins && (
        <WinsPage
          onClose={handleCloseWins}
          onAboutClick={handleAboutClick}
          onHowItWorksClick={handleHowItWorksClick}
          onReviewsClick={handleReviewsClick}
          onBlogClick={handleBlogClick}
          onFAQClick={handleFAQClick}
          onSupportClick={handleSupportClick}
          onWinsClick={handleWinsClick}
          onApplyClick={handleApplyClick}
          onQuizClick={handleQuizClick}
          onPrivacyClick={() => handleLegalLinkClick('privacy')}
          onTermsClick={() => handleLegalLinkClick('terms')}
          onDisclosuresClick={() => handleLegalLinkClick('eca')}
        />
      )}

      {showBooking && <BookingPage onClose={() => setShowBooking(false)} />}

      {/* Calculator Modal */}
      {showCalculator && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseCalculator();
            }
          }}
        >
          <div className="w-full max-w-6xl mb-16">
            <div className="relative">
              <button
                onClick={handleCloseCalculator}
                className="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full shadow-lg flex items-center justify-center z-10 transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              <CapitalCostAnalyzer />
            </div>
          </div>
        </div>
      )}

      {/* Legal Pages Overlay */}
      {legalPage && (
        <div className="fixed inset-0 bg-white dark:bg-[#0A1F35] z-[60] overflow-y-auto">
          {legalPage === 'terms' && <TermsOfUse onClose={() => setLegalPage(null)} />}
          {legalPage === 'privacy' && <PrivacyPolicy onClose={() => setLegalPage(null)} />}
          {legalPage === 'eca' && <ElectronicCommunicationsAgreement onClose={() => setLegalPage(null)} />}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}