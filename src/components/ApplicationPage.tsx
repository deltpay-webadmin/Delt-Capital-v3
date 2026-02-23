import { X } from 'lucide-react';
import { PreQualificationGame } from './PreQualificationGame';
import logoImg from 'figma:asset/d59993d0ec9040f5cac8ad4361f161b6a4b3a746.png';

interface ApplicationPageProps {
  onClose: () => void;
  quizData?: any;
  fromQuiz?: boolean;
  onLegalLinkClick?: (page: 'terms' | 'privacy' | 'eca') => void;
}

export function ApplicationPage({ onClose, quizData, fromQuiz, onLegalLinkClick }: ApplicationPageProps) {
  return (
    <div 
      className="fixed inset-0 bg-[#ededf4] dark:bg-[#0A1F35] z-50 overflow-y-auto"
      style={{ scrollbarGutter: 'stable' }}
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-[#0a1929] border-b border-gray-200 dark:border-gray-700 shadow-sm isolate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center h-14 w-auto cursor-pointer" onClick={onClose}>
            <img src={logoImg} alt="Delt Capital" className="h-10 w-auto object-contain" />
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Application Content */}
      <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <PreQualificationGame 
          startWithQuiz={false} 
          quizData={quizData} 
          fromQuiz={fromQuiz}
          onLegalLinkClick={onLegalLinkClick}
        />
      </div>
    </div>
  );
}