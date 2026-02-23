import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import logoImg from 'figma:asset/d59993d0ec9040f5cac8ad4361f161b6a4b3a746.png';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

interface FooterProps {
  onAboutClick: () => void;
  onHowItWorksClick: () => void;
  onReviewsClick: () => void;
  onBlogClick: () => void;
  onFAQClick: () => void;
  onSupportClick: () => void;
  onWinsClick: () => void;
  onApplyClick: () => void;
  onQuizClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onDisclosuresClick?: () => void;
  hideCTA?: boolean;
}

export function Footer({ onAboutClick, onHowItWorksClick, onReviewsClick, onBlogClick, onFAQClick, onSupportClick, onWinsClick, onApplyClick, onQuizClick, onPrivacyClick, onTermsClick, onDisclosuresClick, hideCTA }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-[#041E42] dark:bg-[#0A1F35] text-white">
      {/* CTA Section */}
      {!hideCTA && (
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1B17FF] via-[#4A47FF] to-[#7B77FF]">
        {/* Decorative curved shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -right-20 bottom-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute left-1/4 -top-20 w-64 h-64 bg-[#1510DD]/30 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            <span className="italic font-light">{t('cta.title').split(' ')[0]}</span>{' '}
            <span>{t('cta.title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-6">
            {t('cta.subtitle')}
          </p>
          <Button 
            onClick={onApplyClick}
            className="bg-white hover:bg-gray-100 text-[#1B17FF] font-semibold px-12 py-8 text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            {t('cta.button')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
      )}

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          {/* Company Info */}
          <div>
            <div className="mb-1">
              <img src={logoImg} alt="Delt Capital" className="h-10 brightness-0 invert" style={{ imageRendering: 'crisp-edges' }} />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={onAboutClick} className="text-gray-300 hover:text-white transition-colors">{t('footer.about')}</button></li>
              <li><button onClick={onQuizClick || onHowItWorksClick} className="text-gray-300 hover:text-white transition-colors">{t('footer.howItWorks')}</button></li>
              <li><button onClick={onReviewsClick} className="text-gray-300 hover:text-white transition-colors">{t('footer.reviews')}</button></li>
              <li><button onClick={onBlogClick} className="text-gray-300 hover:text-white transition-colors">{t('footer.blog')}</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.resources')}</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={onFAQClick} className="text-gray-300 hover:text-white transition-colors">{t('footer.faq')}</button></li>
              <li><button onClick={onSupportClick} className="text-gray-300 hover:text-white transition-colors">{t('footer.support')}</button></li>
              <li><button onClick={onWinsClick} className="text-gray-300 hover:text-white transition-colors">Wins</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Phone className="w-4 h-4 text-[#1B17FF] mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+18647293358" className="hover:text-[#1B17FF] transition-colors text-lg font-medium">
                    (864) 729-3358
                  </a>
                  <p className="text-xs text-gray-400">{t('footer.hours')}</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-4 h-4 text-[#1B17FF] mr-2 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@deltcapital.com" className="hover:text-[#1B17FF] transition-colors">info@deltcapital.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Delt. {t('footer.rights')}
            </p>
            <div className="flex space-x-6 text-sm">
              <button onClick={onPrivacyClick} className="text-gray-400 hover:text-white transition-colors">{t('footer.privacy')}</button>
              <button onClick={onTermsClick} className="text-gray-400 hover:text-white transition-colors">{t('footer.terms')}</button>
              <button onClick={onDisclosuresClick} className="text-gray-400 hover:text-white transition-colors">{t('footer.disclosures')}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#0A1F35] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
}