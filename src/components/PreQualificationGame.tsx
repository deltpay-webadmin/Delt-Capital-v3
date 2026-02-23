import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2,
  User,
  DollarSign,
  CreditCard,
  Upload,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
  Check,
  FileText,
  Home,
  Phone,
  Mail,
  AlertCircle,
  Briefcase,
  Link as LinkIcon,
  X,
  TrendingUp,
  Award,
  Calendar,
  Target,
  Zap,
  Clock
} from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLanguage } from '../contexts/LanguageContext';
import { StateSelect } from './StateSelect';
import { lookupZipCode } from '../utils/zipCodeLookup';
import { SecureInput } from './SecureInput';
import { TimeToCompleteTracker } from './TimeToCompleteTracker';
import { ApplicationStatusMessage } from './ApplicationStatusMessage';
import { IDVerification } from './IDVerification';
import { TermsOfUse, PrivacyPolicy, ElectronicCommunicationsAgreement } from './legal/LegalPages';
import logoImg from 'figma:asset/d59993d0ec9040f5cac8ad4361f161b6a4b3a746.png';
import deltFavicon from 'figma:asset/c3c469c594c03c3bfc98fd83feeab8caee9ddef8.png';
import BookingPage from './BookingPage';

function DocumentUploadSection({ 
  title, 
  description, 
  files, 
  onUpload, 
  onRemove, 
  accept = ".pdf,.png,.jpg,.jpeg", 
  progressSteps 
}: {
  title: string;
  description: React.ReactNode;
  files: File[];
  onUpload: (files: File[]) => void;
  onRemove: (index: number) => void;
  accept?: string;
  progressSteps: string[];
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Reset status if files are removed
  useEffect(() => {
    if (files.length === 0) {
      setUploadStatus('idle');
      setCurrentStepIndex(0);
      setProgress(0);
    } else if (uploadStatus === 'idle') {
      setUploadStatus('processing');
      setCurrentStepIndex(0);
      setProgress(0);
    }
  }, [files.length]);

  // Processing simulation with progress bar
  useEffect(() => {
    if (uploadStatus === 'processing') {
      const totalDuration = 4800;
      const stepDuration = totalDuration / progressSteps.length;
      const progressIncrement = 100 / (totalDuration / 50);
      
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + progressIncrement;
          if (next >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return next;
        });
      }, 50);

      const stepInterval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          const next = prev + 1;
          if (next >= progressSteps.length) {
            clearInterval(stepInterval);
            setTimeout(() => setUploadStatus('complete'), 300);
            return prev;
          }
          return next;
        });
      }, stepDuration);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
      };
    }
  }, [uploadStatus, progressSteps.length]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files));
    }
  };

  return (
    <div className="mb-10">
      <h4 className="text-[17px] font-semibold text-[#041E42] dark:text-white mb-1.5">
        {title}
      </h4>
      <div className="text-[13.5px] text-[#6B7280] dark:text-slate-400 mb-5 leading-relaxed max-w-xl">
        {description}
      </div>

      {files.length > 0 ? (
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#3E4C59] bg-white dark:bg-[#1F2933] overflow-hidden">
          {/* Document thumbnail preview area */}
          <div className="bg-[#F3F4F6] dark:bg-[#0A1F35] px-6 py-8 flex items-center justify-center">
            <div className="flex gap-4 flex-wrap justify-center">
              {files.map((file, index) => (
                <div key={index} className="w-[100px] h-[130px] bg-white dark:bg-[#020C1B] rounded-md shadow-sm border border-[#E5E7EB] dark:border-[#3E4C59] flex flex-col items-center justify-center p-3">
                  <FileText className="w-8 h-8 text-[#9CA3AF] mb-2" />
                  <div className="w-full space-y-1">
                    <div className="h-[3px] bg-[#D1D5DB] rounded-full w-full" />
                    <div className="h-[3px] bg-[#D1D5DB] rounded-full w-4/5" />
                    <div className="h-[3px] bg-[#D1D5DB] rounded-full w-3/5" />
                    <div className="h-[3px] bg-[#D1D5DB] rounded-full w-4/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slim progress bar */}
          {uploadStatus === 'processing' && (
            <div className="h-[3px] bg-[#E5E7EB] dark:bg-[#3E4C59] w-full">
              <div 
                className="h-full bg-[#1B17FF] transition-all duration-100 ease-linear rounded-r-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* File info rows */}
          <div className="divide-y divide-[#F3F4F6] dark:divide-[#3E4C59]">
            {files.map((file, index) => (
              <div key={index} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#9CA3AF] flex-shrink-0" />
                  <span className="text-[13px] text-[#374151] dark:text-slate-300 truncate max-w-[240px] md:max-w-sm">
                    {file.name}
                  </span>
                </div>
                <button 
                  onClick={() => onRemove(index)}
                  className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors p-0.5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Status line */}
          <div className="px-5 py-3 border-t border-[#F3F4F6] dark:border-[#3E4C59]">
            {uploadStatus === 'processing' ? (
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-[#1B17FF] border-t-transparent rounded-full animate-spin flex-shrink-0" />
                <span className="text-[13px] font-medium text-[#1B17FF]">
                  {progressSteps[Math.min(currentStepIndex, progressSteps.length - 1)]}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-[#16A34A] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-[13px] text-[#6B7280] dark:text-slate-400">
                  Your document has all the information we need.
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`cursor-pointer block rounded-xl border-2 border-dashed transition-all ${
            isDragging
              ? 'border-[#1B17FF] bg-[#EEF2FF]'
              : 'border-[#D1D5DB] dark:border-[#3E4C59] hover:border-[#1B17FF] hover:bg-[#FAFAFA] dark:hover:bg-[#1F2933]'
          }`}
        >
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="w-11 h-11 bg-[#F3F4F6] dark:bg-[#1F2933] rounded-full flex items-center justify-center mb-3">
              <Upload className="w-5 h-5 text-[#6B7280]" />
            </div>
            <p className="text-[13.5px] font-medium text-[#374151] dark:text-white mb-0.5">
              Click to upload or drag and drop
            </p>
            <p className="text-[12px] text-[#9CA3AF] dark:text-slate-500">
              PDF, PNG, JPG (max 10MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            accept={accept}
            onChange={handleFileInput}
          />
        </label>
      )}
    </div>
  );
}

interface QuizAnswer {
  questionId: number;
  value: string;
  label: string;
  score: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  businessLegalName: string;
  businessDBA: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessPhone: string;
  businessEIN: string;
  industry: string;
  industryOther: string;
  timeInBusiness: string;
  monthlyRevenue: string;
  creditCardProcessing: string;
  creditScore: string;
  ownerFullName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerAddress: string;
  ownerCity: string;
  ownerState: string;
  ownerZip: string;
  ownerSSN: string;
  idPhoto: string | null;
  selfiePhoto: string | null;
  ssnLast4: string;
  requestedAmount: string;
  intendedUse: string;
  bankConnected: boolean;
  bankConnectionSkipped: boolean;
  bankStatements: File[];
  creditCardProcessor: string;
  creditCardProcessorOther: string;
  processorStatements: File[];
  governmentID: File | null;
  voidedCheck: File | null;
  agreedToTerms: boolean;
  eSignature: string;
}

type Phase = 'quiz' | 'results' | 'transition' | 'application';

interface PreQualificationGameProps {
  startWithQuiz?: boolean;
  onShowResults?: (data?: any) => void;
  showResultsOnly?: boolean;
  onCloseResults?: () => void;
  onStartApplication?: () => void;
  onLegalLinkClick?: (page: 'terms' | 'privacy' | 'eca') => void;
  quizData?: any;
  fromQuiz?: boolean;
}

export function PreQualificationGame({ 
  startWithQuiz = true, 
  onShowResults, 
  showResultsOnly = false,
  onCloseResults,
  onStartApplication,
  onLegalLinkClick,
  quizData,
  fromQuiz = false
}: PreQualificationGameProps) {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>(startWithQuiz ? 'quiz' : 'application');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, QuizAnswer>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0); // For Connect & Verify sub-steps
  const [basicInfoMicroStep, setBasicInfoMicroStep] = useState(0); // For Basic Info micro-steps (0-4)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    businessLegalName: '',
    businessDBA: '',
    businessAddress: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    businessPhone: '',
    businessEIN: '',
    industry: '',
    industryOther: '',
    timeInBusiness: '',
    monthlyRevenue: '',
    creditCardProcessing: '',
    creditScore: '',
    ownerFullName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerAddress: '',
    ownerCity: '',
    ownerState: '',
    ownerZip: '',
    ownerSSN: '',
    idPhoto: null,
    selfiePhoto: null,
    ssnLast4: '',
    requestedAmount: '',
    intendedUse: '',
    bankConnected: false,
    bankConnectionSkipped: false,
    bankStatements: [],
    creditCardProcessor: '',
    creditCardProcessorOther: '',
    processorStatements: [],
    governmentID: null,
    voidedCheck: null,
    agreedToTerms: false,
    eSignature: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragActive, setDragActive] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [sameAsBusinessAddress, setSameAsBusinessAddress] = useState(false);
  const [showAutoFillHint, setShowAutoFillHint] = useState<'business' | 'owner' | null>(null);
  const [formStartTime] = useState(Date.now());
  const [autoAdvanceTimeout, setAutoAdvanceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [userWentBack, setUserWentBack] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [sameAsLegalName, setSameAsLegalName] = useState(false);
  const [manualNavigation, setManualNavigation] = useState(false);
  const [ssnDisplayValue, setSsnDisplayValue] = useState('');
  const [ssnTimeout, setSsnTimeout] = useState<NodeJS.Timeout | null>(null);
  const [idVerificationComplete, setIdVerificationComplete] = useState(false);
  const [plaidModalOpen, setPlaidModalOpen] = useState(false);
  const [plaidStep, setPlaidStep] = useState<'phone' | 'link'>('phone');
  const [plaidPhone, setPlaidPhone] = useState('');
  const [plaidLinkMethod, setPlaidLinkMethod] = useState<'instant' | 'manual'>('instant');
  const [localLegalPage, setLocalLegalPage] = useState<'terms' | 'privacy' | 'eca' | null>(null);

  const handleLegalLink = (page: 'terms' | 'privacy' | 'eca') => {
    if (onLegalLinkClick) {
      onLegalLinkClick(page);
    } else {
      setLocalLegalPage(page);
    }
  };

  // Auto-advance when all validation passes
  useEffect(() => {
    // Clear any existing timeout
    if (autoAdvanceTimeout) {
      clearTimeout(autoAdvanceTimeout);
      setAutoAdvanceTimeout(null);
    }

    // Exclude auto-advance for micro-step 2 (Business Contact & Tax Info - Phone & EIN)
    const isBusinessContactStep = currentStep === 1 && basicInfoMicroStep === 2;

    // Exclude auto-advance for Step 0 (Get Started) — let user finish typing names and press Enter
    const isGetStartedStep = currentStep === 0;

    // Only auto-advance if we're in the application phase, can proceed, user didn't manually navigate, user didn't go back, and not on excluded step
    if (phase === 'application' && canProceed() && currentStep < steps.length - 1 && !userWentBack && !manualNavigation && !isBusinessContactStep && !isGetStartedStep) {
      // Wait 1 second before auto-advancing to give user time to review
      const timeout = setTimeout(() => {
        handleNext();
      }, 1000);
      setAutoAdvanceTimeout(timeout);
    }

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (autoAdvanceTimeout) {
        clearTimeout(autoAdvanceTimeout);
      }
    };
  }, [formData, currentStep, phase, userWentBack, manualNavigation, basicInfoMicroStep]);

  // Store quiz answers when they change
  useEffect(() => {
    if (Object.keys(quizAnswers).length > 0) {
      sessionStorage.setItem('quizAnswers', JSON.stringify(quizAnswers));
    }
  }, [quizAnswers]);

  // Load quiz answers when showing results only
  useEffect(() => {
    if (showResultsOnly) {
      const stored = sessionStorage.getItem('quizAnswers');
      if (stored) {
        setQuizAnswers(JSON.parse(stored));
      }
      setShowResults(true);
    }
  }, [showResultsOnly]);

  // Pre-fill form data from quiz when provided
  useEffect(() => {
    if (quizData && fromQuiz) {
      setFormData(prev => ({
        ...prev,
        ...quizData
      }));
    }
  }, [quizData, fromQuiz]);

  // Handle "Same as Business Address" functionality
  useEffect(() => {
    if (sameAsBusinessAddress) {
      setFormData(prev => ({
        ...prev,
        ownerAddress: prev.businessAddress,
        ownerCity: prev.businessCity,
        ownerState: prev.businessState,
        ownerZip: prev.businessZip,
      }));
    }
  }, [sameAsBusinessAddress]);

  const quizQuestions = [
    {
      id: 1,
      icon: DollarSign,
      question: t('quiz.q1.question'),
      subtitle: t('quiz.q1.subtitle'),
      options: [
        { value: '<10k', label: t('quiz.q1.opt1'), score: 5 },
        { value: '10-25k', label: t('quiz.q1.opt2'), score: 15 },
        { value: '25-50k', label: t('quiz.q1.opt3'), score: 30 },
        { value: '50-100k', label: t('quiz.q1.opt4'), score: 50 },
        { value: '100k+', label: t('quiz.q1.opt5'), score: 75 },
      ],
    },
    {
      id: 2,
      icon: Calendar,
      question: t('quiz.q2.question'),
      subtitle: t('quiz.q2.subtitle'),
      options: [
        { value: '<6', label: t('quiz.q2.opt1'), score: 5 },
        { value: '6-12', label: t('quiz.q2.opt2'), score: 15 },
        { value: '1-2', label: t('quiz.q2.opt3'), score: 25 },
        { value: '2-5', label: t('quiz.q2.opt4'), score: 40 },
        { value: '5+', label: t('quiz.q2.opt5'), score: 50 },
      ],
    },
    {
      id: 3,
      icon: CreditCard,
      question: t('quiz.q3.question'),
      subtitle: t('quiz.q3.subtitle'),
      options: [
        { value: 'none', label: t('quiz.q3.opt1'), score: 0 },
        { value: '<5k', label: t('quiz.q3.opt2'), score: 10 },
        { value: '5-15k', label: t('quiz.q3.opt3'), score: 25 },
        { value: '15-40k', label: t('quiz.q3.opt4'), score: 40 },
        { value: '40k+', label: t('quiz.q3.opt5'), score: 60 },
      ],
    },
    {
      id: 4,
      icon: Award,
      question: t('quiz.q4.question'),
      subtitle: t('quiz.q4.subtitle'),
      options: [
        { value: '<550', label: t('quiz.q4.opt1'), score: 5 },
        { value: '550-599', label: t('quiz.q4.opt2'), score: 15 },
        { value: '600-649', label: t('quiz.q4.opt3'), score: 25 },
        { value: '650-699', label: t('quiz.q4.opt4'), score: 35 },
        { value: '700+', label: t('quiz.q4.opt5'), score: 45 },
      ],
    },
    {
      id: 5,
      icon: Target,
      question: t('quiz.q5.question'),
      subtitle: t('quiz.q5.subtitle'),
      options: [
        { value: '10-25k', label: t('quiz.q5.opt1'), score: 10 },
        { value: '25-50k', label: t('quiz.q5.opt2'), score: 20 },
        { value: '50-100k', label: t('quiz.q5.opt3'), score: 30 },
        { value: '100-150k', label: t('quiz.q5.opt4'), score: 35 },
        { value: '150k+', label: t('quiz.q5.opt5'), score: 40 },
      ],
    },
    {
      id: 6,
      icon: Briefcase,
      question: t('quiz.q6.question'),
      subtitle: t('quiz.q6.subtitle'),
      options: [
        { value: 'inventory', label: t('quiz.q6.opt1'), score: 10 },
        { value: 'equipment', label: t('quiz.q6.opt2'), score: 10 },
        { value: 'marketing', label: t('quiz.q6.opt3'), score: 10 },
        { value: 'working-capital', label: t('quiz.q6.opt4'), score: 10 },
        { value: 'expansion', label: t('quiz.q6.opt5'), score: 10 },
        { value: 'other', label: t('quiz.q6.opt6'), score: 10 },
      ],
    },
  ];

  const calculateFundingEstimate = () => {
    const totalScore = Object.values(quizAnswers).reduce((sum, answer) => sum + answer.score, 0);
    const maxScore = 250; // Maximum possible score
    const rawPercentage = (totalScore / maxScore) * 100;
    const percentage = Math.min(rawPercentage, 99); // Cap at 99%

    // Get monthly revenue and requested amount from quiz answers
    const revenueAnswer = quizAnswers[1];
    const requestedAnswer = quizAnswers[5];
    
    let minFunding = 10000;
    let maxFunding = 50000;

    // Adjust based on revenue
    if (revenueAnswer) {
      if (revenueAnswer.value === '100k+') {
        minFunding = 75000;
        maxFunding = 250000;
      } else if (revenueAnswer.value === '50-100k') {
        minFunding = 50000;
        maxFunding = 150000;
      } else if (revenueAnswer.value === '25-50k') {
        minFunding = 25000;
        maxFunding = 100000;
      } else if (revenueAnswer.value === '10-25k') {
        minFunding = 10000;
        maxFunding = 50000;
      }
    }

    // Adjust based on credit card processing
    const processingAnswer = quizAnswers[3];
    if (processingAnswer && processingAnswer.value === 'none') {
      maxFunding = Math.min(maxFunding, 25000);
    }

    return {
      min: minFunding,
      max: maxFunding,
      percentage,
      totalScore,
    };
  };

  const handleOptionSelect = (questionId: number, option: any) => {
    setSelectedOption(option.value);
    const updatedAnswers = {
      ...quizAnswers,
      [questionId]: {
        questionId,
        value: option.value,
        label: option.label,
        score: option.score,
      },
    };
    setQuizAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResults(true);
        if (onShowResults) {
          // Pass updated answers to avoid stale closure
          const quizFormData = extractQuizData(updatedAnswers);
          onShowResults(quizFormData);
        }
      }
    }, 400);
  };

  const handleBackQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  // Helper function to extract and map quiz data for pre-filling form
  // Accepts optional overrideAnswers to avoid stale closure when called right after setQuizAnswers
  const extractQuizData = (overrideAnswers?: Record<number, QuizAnswer>) => {
    const answers = overrideAnswers || quizAnswers;
    const revenueAnswer = answers[1];
    const timeAnswer = answers[2];
    const processingAnswer = answers[3];
    const creditAnswer = answers[4];
    const fundingAnswer = answers[5];
    const useOfFundsAnswer = answers[6];

    // Map quiz value codes to exact form select values (language-independent)
    const revenueMap: Record<string, string> = {
      '<10k': 'Under $10,000/month',
      '10-25k': '$10,000 - $25,000/month',
      '25-50k': '$25,000 - $50,000/month',
      '50-100k': '$50,000 - $100,000/month',
      '100k+': '$100,000+/month',
    };

    const processingMap: Record<string, string> = {
      'none': 'No credit card processing',
      '<5k': 'Under $5,000/month',
      '5-15k': '$5,000 - $15,000/month',
      '15-40k': '$15,000 - $40,000/month',
      '40k+': '$40,000+/month',
    };

    const creditMap: Record<string, string> = {
      '<550': 'Under 550',
      '550-599': '550-599',
      '600-649': '600-649',
      '650-699': '650-699',
      '700+': '700+',
    };

    const timeMap: Record<string, string> = {
      '<6': t('quiz.q2.opt1'),
      '6-12': t('quiz.q2.opt2'),
      '1-2': t('quiz.q2.opt3'),
      '2-5': t('quiz.q2.opt4'),
      '5+': t('quiz.q2.opt5'),
    };

    const fundingMap: Record<string, string> = {
      '10-25k': '25000',
      '25-50k': '50000',
      '50-100k': '75000',
      '100-150k': '150000',
      '150k+': '200000',
    };

    const useMap: Record<string, string> = {
      'inventory': t('use.inventory'),
      'equipment': t('use.equipment'),
      'marketing': t('use.marketing'),
      'working-capital': t('use.workingCapital'),
      'expansion': t('use.expansion'),
      'other': t('use.other'),
    };

    const monthlyRevenue = revenueAnswer ? (revenueMap[revenueAnswer.value] || revenueAnswer.label) : '';
    const timeInBusiness = timeAnswer ? (timeMap[timeAnswer.value] || timeAnswer.label) : '';
    const creditCardProcessing = processingAnswer ? (processingMap[processingAnswer.value] || processingAnswer.label) : '';
    const creditScore = creditAnswer ? (creditMap[creditAnswer.value] || creditAnswer.label) : '';
    const requestedAmount = fundingAnswer ? (fundingMap[fundingAnswer.value] || '') : '';
    const intendedUse = useOfFundsAnswer ? (useMap[useOfFundsAnswer.value] || useOfFundsAnswer.label) : '';
    
    return {
      monthlyRevenue,
      timeInBusiness,
      creditCardProcessing,
      creditScore,
      requestedAmount,
      intendedUse,
    };
  };

  const handleStartApplication = () => {
    // If external handler is provided (full-page results mode), use it
    if (onStartApplication) {
      onStartApplication();
      return;
    }

    // Otherwise, use internal application flow
    // Pre-fill form data from ALL quiz answers
    const quizFormData = extractQuizData();
    
    setFormData({
      ...formData,
      ...quizFormData,
    });

    // Show transition screen first
    setPhase('transition');
    setShowTransition(true);
    
    // Auto-advance to application after 3 seconds
    setTimeout(() => {
      setPhase('application');
      setCurrentStep(0); // Start at Basic Information, we'll skip Funding Request (step 2)
      setShowTransition(false);
    }, 3000);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const estimate = (showResults || showResultsOnly) ? calculateFundingEstimate() : null;

  // Application form states and handlers
  const steps = [
    { title: 'Get Started', icon: User },
    { title: t('form.step.basicInfo'), icon: Building2 },
    { title: t('form.step.fundingRequest'), icon: DollarSign },
    { title: 'Financial Documents', icon: CreditCard },
    { title: t('form.step.connectAccounts'), icon: LinkIcon },
    { title: t('form.step.reviewSubmit'), icon: CheckCircle },
  ];

  const industries = [
    t('industry.restaurant'),
    t('industry.retail'),
    t('industry.healthcare'),
    t('industry.professional'),
    t('industry.construction'),
    t('industry.transportation'),
    t('industry.manufacturing'),
    t('industry.technology'),
    t('industry.hospitality'),
    t('industry.realEstate'),
    t('industry.other'),
  ];

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const fundingUses = [
    t('use.workingCapital'),
    t('use.inventory'),
    t('use.equipment'),
    t('use.marketing'),
    t('use.expansion'),
    t('use.payroll'),
    t('use.debtConsolidation'),
    t('use.renovations'),
    t('use.emergency'),
    t('use.other'),
  ];

  const creditCardProcessors = [
    t('processor.square'),
    t('processor.clover'),
    t('processor.toast'),
    t('processor.stripe'),
    t('processor.paypal'),
    t('processor.shopify'),
    t('processor.authorizenet'),
    t('processor.firstdata'),
    t('processor.worldpay'),
    t('processor.other'),
  ];

  const timeInBusinessOptions = [
    t('quiz.q2.opt1'),
    t('quiz.q2.opt2'),
    t('quiz.q2.opt3'),
    t('quiz.q2.opt4'),
    t('quiz.q2.opt5'),
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Smart ZIP code auto-fill for business address
      if (field === 'businessZip' && value.length === 5) {
        const zipData = lookupZipCode(value);
        if (zipData && !prev.businessCity && !prev.businessState) {
          updated.businessCity = zipData.city;
          updated.businessState = zipData.state;
          // Show hint
          setShowAutoFillHint('business');
          setTimeout(() => setShowAutoFillHint(null), 3000);
        }
      }
      
      // Smart ZIP code auto-fill for owner address
      if (field === 'ownerZip' && value.length === 5) {
        const zipData = lookupZipCode(value);
        if (zipData && !prev.ownerCity && !prev.ownerState) {
          updated.ownerCity = zipData.city;
          updated.ownerState = zipData.state;
          // Show hint
          setShowAutoFillHint('owner');
          setTimeout(() => setShowAutoFillHint(null), 3000);
        }
      }
      
      return updated;
    });
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 10;
  };

  const validateZip = (zip: string) => {
    return /^\d{5}$/.test(zip);
  };

  const validateSSN = (ssn: string) => {
    return /^\d{9}$/.test(ssn);
  };

  const validateEIN = (ein: string) => {
    const digitsOnly = ein.replace(/\D/g, '');
    return digitsOnly.length === 9;
  };

  // Format phone number as (xxx)-xxx-xxxx
  const formatPhoneNumber = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
    if (digitsOnly.length === 0) return '';
    if (digitsOnly.length <= 3) return `(${digitsOnly}`;
    if (digitsOnly.length <= 6) return `(${digitsOnly.slice(0, 3)})-${digitsOnly.slice(3)}`;
    return `(${digitsOnly.slice(0, 3)})-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
  };

  // Format EIN as XX-XXXXXXX
  const formatEIN = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 9);
    if (digitsOnly.length === 0) return '';
    if (digitsOnly.length <= 2) return digitsOnly;
    return `${digitsOnly.slice(0, 2)}-${digitsOnly.slice(2)}`;
  };

  // Format SSN as XXX-XX-XXXX
  const formatSSN = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 9);
    if (digitsOnly.length === 0) return '';
    if (digitsOnly.length <= 3) return digitsOnly;
    if (digitsOnly.length <= 5) return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
    return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 5)}-${digitsOnly.slice(5)}`;
  };

  const canProceedBasicInfoMicroStep = () => {
    switch (basicInfoMicroStep) {
      case 0: // Business Name & DBA
        return formData.businessLegalName.trim() !== '' && 
               (formData.businessDBA.trim() !== '' || sameAsLegalName);
      case 1: // Business Location
        return (
          formData.businessAddress.trim() !== '' &&
          formData.businessCity.trim() !== '' &&
          formData.businessState.trim() !== '' &&
          validateZip(formData.businessZip)
        );
      case 2: // Business Contact & Tax Info
        return (
          validatePhone(formData.businessPhone) &&
          validateEIN(formData.businessEIN)
        );
      case 3: // Business Profile
        const isOtherIndustry = formData.industry === t('industry.other') || formData.industry === 'Other';
        return (
          formData.industry !== '' &&
          (!isOtherIndustry || formData.industryOther.trim() !== '') &&
          formData.timeInBusiness !== ''
        );
      case 4: // Financial Overview
        return (
          formData.monthlyRevenue !== '' &&
          formData.creditCardProcessing !== '' &&
          formData.creditScore !== ''
        );
      default:
        return false;
    }
  };

  const canProceedStep1 = () => {
    // For step 1, we need all fields from all micro-steps to be complete
    const isOtherIndustry = formData.industry === t('industry.other') || formData.industry === 'Other';
    return (
      formData.businessLegalName.trim() !== '' &&
      formData.businessAddress.trim() !== '' &&
      formData.businessCity.trim() !== '' &&
      formData.businessState.trim() !== '' &&
      validateZip(formData.businessZip) &&
      validatePhone(formData.businessPhone) &&
      validateEIN(formData.businessEIN) &&
      formData.industry !== '' &&
      (!isOtherIndustry || formData.industryOther.trim() !== '') &&
      formData.timeInBusiness !== '' &&
      formData.monthlyRevenue !== '' &&
      formData.creditCardProcessing !== '' &&
      formData.creditScore !== ''
    );
  };

  const canProceedStep3 = () => {
    return (
      formData.requestedAmount !== '' &&
      formData.intendedUse !== ''
    );
  };

  const canProceedStep4 = () => {
    return (
      (formData.bankConnected || formData.bankConnectionSkipped) &&
      idVerificationComplete &&
      formData.ssnLast4 && formData.ssnLast4.length === 4
    );
  };

  const canProceedStep5 = () => {
    const processorSelected = formData.creditCardProcessor !== '';
    const otherFilled = formData.creditCardProcessor === t('processor.other')
      ? formData.creditCardProcessorOther.trim() !== ''
      : true;
    return (
      processorSelected &&
      otherFilled &&
      formData.processorStatements.length > 0
    );
  };

  const canProceedStep6 = () => {
    return (
      formData.agreedToTerms &&
      formData.eSignature.trim() !== ''
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.firstName.trim() !== '' && formData.lastName.trim() !== '';
      case 1: return canProceedBasicInfoMicroStep(); // Use micro-step validation
      case 2: return canProceedStep3();
      case 3: return canProceedStep5(); // Financial Documents (was step 4)
      case 4: return canProceedStep4(); // Connect & Verify (was step 3)
      case 5: return canProceedStep6();
      default: return false;
    }
  };

  const handleNext = () => {
    // Step 0: Get Started
    if (currentStep === 0) {
      if (formData.firstName.trim() !== '' && formData.lastName.trim() !== '') {
        // Combine names into ownerFullName for backend compatibility if needed
        updateFormData('ownerFullName', `${formData.firstName} ${formData.lastName}`);
        setManualNavigation(true);
        setUserWentBack(false);
        setCurrentStep(1);
      }
      return;
    }

    // Handle micro-step navigation for Step 1 (Basic Info)
    if (currentStep === 1) {
      if (basicInfoMicroStep < 4 && canProceedBasicInfoMicroStep()) {
        setBasicInfoMicroStep(basicInfoMicroStep + 1);
        return;
      } else if (basicInfoMicroStep === 4 && canProceedBasicInfoMicroStep()) {
        // Move to next main step (Funding Request)
        setBasicInfoMicroStep(0);
        setManualNavigation(true);
        setUserWentBack(false);
        setCurrentStep(currentStep + 1);
        return;
      }
      return; // Don't proceed if validation fails
    }

    // Handle sub-step navigation for Step 4 (Connect & Verify)
    if (currentStep === 4) {
      if (currentSubStep === 0 && (formData.bankConnected || (formData.bankConnectionSkipped && formData.bankStatements.length > 0))) {
        setCurrentSubStep(1);
        return;
      } else if (currentSubStep === 1 && formData.ssnLast4 && formData.ssnLast4.length === 4) {
        setCurrentSubStep(2);
        return;
      } else if (currentSubStep === 2 && idVerificationComplete) {
        // Move to next main step
        setCurrentSubStep(0);
        setManualNavigation(true);
        setUserWentBack(false);
        setCurrentStep(currentStep + 1);
        return;
      }
      return; // Don't proceed if validation fails
    }
    
    // Regular step navigation
    if (canProceed()) {
      // Disable auto-advance permanently when user manually clicks Continue
      setManualNavigation(true);
      setUserWentBack(false);
      
      if (currentStep === steps.length - 1) {
        setShowSuccess(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    // Handle micro-step navigation for Step 1 (Basic Info)
    if (currentStep === 1 && basicInfoMicroStep > 0) {
      setBasicInfoMicroStep(basicInfoMicroStep - 1);
      return;
    }

    // Handle sub-step navigation for Step 4 (Connect & Verify)
    if (currentStep === 4 && currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
      // Reset verification complete flag when going back to ID verification
      if (currentSubStep === 2) {
        setIdVerificationComplete(false);
      }
      return;
    }
    
    // Regular step navigation
    if (currentStep > 0) {
      // Disable auto-advance permanently when user goes back
      setManualNavigation(true);
      setUserWentBack(true);
      
      // Reset micro-step when going back to Step 1 (Basic Info)
      if (currentStep === 2) {
        setBasicInfoMicroStep(4); // Go to last micro-step of Basic Info
      }

      // When going back to Step 4 (Connect & Verify), go to last sub-step
      if (currentStep === 5) {
        setCurrentSubStep(2); // Go to last sub-step (ID Verification)
      }

      // Reset sub-step when going back past Step 4 (Connect & Verify)
      if (currentStep === 4) {
        setCurrentSubStep(0);
      }
      
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent, field: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(field);
    } else if (e.type === 'dragleave') {
      setDragActive(null);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, field: 'governmentID' | 'voidedCheck' | 'processorStatements') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (field === 'processorStatements') {
        updateFormData('processorStatements', [...formData.processorStatements, file]);
      } else {
        updateFormData(field, file);
      }
    }
  }, [formData.processorStatements]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, field: 'governmentID' | 'voidedCheck' | 'processorStatements') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (field === 'processorStatements') {
        updateFormData('processorStatements', [...formData.processorStatements, file]);
      } else {
        updateFormData(field, file);
      }
    }
  };

  const removeFile = (field: 'governmentID' | 'voidedCheck') => {
    updateFormData(field, null);
  };

  const removeProcessorStatement = (index: number) => {
    const newStatements = formData.processorStatements.filter((_, i) => i !== index);
    updateFormData('processorStatements', newStatements);
  };

  // Calculate progress based on filled form fields
  const calculateFieldBasedProgress = () => {
    const fields = {
      // Step 0 - Basic Info (5 micro-steps)
      businessName: formData.businessName,
      businessDBA: formData.businessDBA || formData.businessName, // DBA or same as legal name
      businessAddress: formData.businessAddress,
      businessCity: formData.businessCity,
      businessState: formData.businessState,
      businessZip: formData.businessZip,
      businessPhone: formData.businessPhone,
      businessEmail: formData.businessEmail,
      businessEIN: formData.businessEIN,
      businessIndustry: formData.businessIndustry,
      businessType: formData.businessType,
      businessStartDate: formData.businessStartDate,
      monthlyRevenue: formData.monthlyRevenue,
      creditScore: formData.creditScore,
      // Step 1 - Funding Request
      requestedAmount: formData.requestedAmount,
      intendedUse: formData.intendedUse,
      // Step 2 - Connect & Verify (3 sub-steps)
      bankConnected: formData.bankConnected,
      ssnLast4: formData.ssnLast4,
      idPhoto: formData.idPhoto,
      selfiePhoto: formData.selfiePhoto,
      // Step 3 - Payment Processing
      currentProcessor: formData.currentProcessor,
      monthlyProcessingVolume: formData.monthlyProcessingVolume,
      avgTransactionAmount: formData.avgTransactionAmount,
      governmentID: formData.governmentID,
      voidedCheck: formData.voidedCheck,
      processorStatements: formData.processorStatements.length > 0,
    };

    const totalFields = Object.keys(fields).length;
    const filledFields = Object.values(fields).filter(value => {
      if (typeof value === 'boolean') return value;
      if (typeof value === 'string') return value.trim() !== '';
      return value !== null && value !== undefined;
    }).length;

    return totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
  };

  const appProgress = calculateFieldBasedProgress();
  
  // Calculate total units for step display
  const totalUnits = 5 + (steps.length - 1); // 5 micro-steps + 4 other steps = 9 units

  // BOOKING PAGE
  if (showBooking) {
    return <BookingPage onClose={() => setShowBooking(false)} />;
  }

  // QUIZ PHASE
  if (phase === 'quiz' && !showResults) {
    const question = quizQuestions[currentQuestion];
    const IconComponent = question.icon;

    return (
      <div className="bg-white dark:bg-[#020C1B] rounded-2xl shadow-2xl border border-[#E4E7EB] dark:border-[#1F2933] p-6 md:p-10 max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-[#1E40AF] dark:text-[#60A5FA]">
              {t('quiz.progress').replace('{{current}}', String(currentQuestion + 1)).replace('{{total}}', String(quizQuestions.length))}
            </span>
            <span className="text-sm text-[#52606D] dark:text-[#CBD2D9]">
              {Math.round(progress)}% {t('quiz.complete')}
            </span>
          </div>
          <div className="w-full h-2 bg-[#E4E7EB] dark:bg-[#1F2933] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-16 h-16 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-xl flex items-center justify-center mx-auto mb-4"
              >
                <IconComponent className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#041E42] dark:text-white mb-2">
                {question.question}
              </h3>
              <p className="text-[#52606D] dark:text-[#CBD2D9]">
                {question.subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleOptionSelect(question.id, option)}
                  className={`w-full p-5 rounded-xl border-2 text-left transition-all ${
                    selectedOption === option.value
                      ? 'border-[#1E40AF] bg-[#EFF6FF] dark:bg-[#1E40AF]/20 shadow-lg scale-[1.02]'
                      : quizAnswers[question.id]?.value === option.value
                      ? 'border-[#16A34A] bg-[#F0FDF4] dark:bg-[#16A34A]/20'
                      : 'border-[#E4E7EB] dark:border-[#1F2933] hover:border-[#1E40AF] hover:bg-[#F9FAFB] dark:hover:bg-[#1F2933]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-[#041E42] dark:text-white">
                      {option.label}
                    </span>
                    {quizAnswers[question.id]?.value === option.value && (
                      <CheckCircle className="w-6 h-6 text-[#16A34A]" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              {currentQuestion > 0 ? (
                <Button
                  onClick={handleBackQuestion}
                  variant="outline"
                  className="border-[#E4E7EB] dark:border-[#1F2933] text-[#52606D] dark:text-[#CBD2D9]"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t('quiz.back')}
                </Button>
              ) : (
                <div />
              )}
              {quizAnswers[question.id] && currentQuestion < quizQuestions.length - 1 && (
                <Button
                  onClick={() => {
                    setCurrentQuestion(currentQuestion + 1);
                    setSelectedOption(null);
                  }}
                  className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] hover:from-[#1E3A8A] hover:to-[#2563EB] text-white"
                >
                  {t('quiz.next')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // RESULTS PHASE
  if ((phase === 'quiz' && showResults && estimate) || showResultsOnly) {
    return (
      <div className="min-h-screen bg-[#F5FBFF] dark:bg-[#0A1F35]">
        {/* Logo Header */}
        <div className="bg-white dark:bg-[#1F2933] border-b border-[#E4E7EB] dark:border-[#3E4C59] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-14 w-auto">
              <img src={logoImg} alt="Delt Capital" className="h-10 w-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-[#041E42] dark:bg-[#1E40AF]/20 py-10 md:py-16 text-white text-center border-b border-white/10">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20"
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base font-bold uppercase tracking-wider text-slate-300 mb-2"
            >
              {t('results.fundingRange')}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="text-5xl md:text-6xl font-bold mb-3 tracking-tight"
            >
              ${(estimate.min / 1000).toFixed(0)}K - ${(estimate.max / 1000).toFixed(0)}K
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-slate-300"
            >
              {t('results.basedOnProfile')}
            </motion.p>
          </div>
        </div>

        {/* Details Section */}
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          {/* Approval Likelihood */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold text-[#041E42] dark:text-white">{t('results.approvalLikelihood')}</h4>
              <span className="text-2xl font-bold text-[#16A34A]">{Math.round(estimate.percentage)}%</span>
            </div>
            <div className="w-full h-3 bg-[#E4E7EB] dark:bg-[#1F2933] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#16A34A] to-[#22C55E]"
                initial={{ width: 0 }}
                animate={{ width: `${estimate.percentage}%` }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </div>
          </div>

          {/* Key Factors */}
          <div className="mb-6">
            <h4 className="text-lg font-bold text-[#041E42] dark:text-white mb-3">{t('results.factorsConsidered')}</h4>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.values(quizAnswers).map((answer, index) => (
                <motion.div
                  key={answer.questionId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-2 p-3 bg-white dark:bg-[#1F2933] rounded-lg shadow-sm border border-[#E4E7EB] dark:border-[#1F2933]"
                >
                  <CheckCircle className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-[#52606D] dark:text-[#CBD2D9]">
                      {quizQuestions.find(q => q.id === answer.questionId)?.question}
                    </p>
                    <p className="text-sm font-semibold text-[#041E42] dark:text-white">
                      {answer.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F0FDF4] dark:from-[#1F2933] dark:to-[#132030] rounded-xl p-4 mb-6 border border-[#1E40AF]/20">
            <h4 className="text-lg font-bold text-[#041E42] dark:text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#1E40AF]" />
              {t('results.whatHappensNext')}
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#1E40AF] rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#041E42] dark:text-white">{t('results.completeApp')}</p>
                  <p className="text-xs text-[#52606D] dark:text-[#CBD2D9]">{t('results.completeApp.time')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#1E40AF] rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#041E42] dark:text-white">{t('results.instantReview')}</p>
                  <p className="text-xs text-[#52606D] dark:text-[#CBD2D9]">{t('results.instantReview.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#1E40AF] rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#041E42] dark:text-white">{t('results.getFunded')}</p>
                  <p className="text-xs text-[#52606D] dark:text-[#CBD2D9]">{t('results.getFunded.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="max-w-2xl mx-auto space-y-3">
            <button
              onClick={handleStartApplication}
              className="w-full h-12 text-base font-semibold rounded-md bg-[#041E42] hover:bg-[#03152F] text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{t('quiz.startApp')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-slate-500 hover:text-[#041E42] hover:bg-slate-50 dark:hover:bg-[#1E40AF]/10 h-12 text-sm font-medium"
              onClick={() => setShowBooking(true)}
            >
              <Phone className="w-4 h-4 mr-2" />
              {t('quiz.speakSpecialist')}
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-6 max-w-3xl mx-auto border-t border-slate-100 dark:border-[#3E4C59] pt-4">
            {t('results.disclaimer')}
          </p>
        </div>
      </div>
    );
  }

  // TRANSITION PHASE - Smooth bridge from quiz to application
  if (phase === 'transition' && showTransition) {
    return (
      <div className="bg-white dark:bg-[#020C1B] rounded-lg shadow-sm border border-slate-200 dark:border-[#1F2933] overflow-hidden max-w-4xl mx-auto">
        <div className="bg-[#041E42] dark:bg-[#1E40AF]/20 p-10 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20"
          >
            <Check className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight"
          >
            {t('transition.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/80"
          >
            {t('transition.subtitle')}
          </motion.p>
        </div>

        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6 text-center">
              Preliminary Assessment
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-50 dark:bg-[#1F2933] rounded-md p-4 border border-slate-200 dark:border-[#3E4C59]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Funding Amount</span>
                </div>
                <p className="text-lg font-bold text-[#041E42] dark:text-white">
                  ${parseInt(formData.requestedAmount || '0').toLocaleString()}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="bg-slate-50 dark:bg-[#1F2933] rounded-md p-4 border border-slate-200 dark:border-[#3E4C59]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Use of Funds</span>
                </div>
                <p className="text-lg font-bold text-[#041E42] dark:text-white">
                  {formData.intendedUse}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-50 dark:bg-[#1F2933] rounded-md p-4 border border-slate-200 dark:border-[#3E4C59]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Monthly Revenue</span>
                </div>
                <p className="text-lg font-bold text-[#041E42] dark:text-white">
                  {formData.monthlyRevenue}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-slate-50 dark:bg-[#1F2933] rounded-md p-4 border border-slate-200 dark:border-[#3E4C59]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Time in Business</span>
                </div>
                <p className="text-lg font-bold text-[#041E42] dark:text-white">
                  {formData.timeInBusiness}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-slate-50 dark:bg-[#1F2933] rounded-md p-4 border border-slate-200 dark:border-[#3E4C59]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Card Processing</span>
                </div>
                <p className="text-lg font-bold text-[#041E42] dark:text-white">
                  {formData.creditCardProcessing}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="bg-slate-50 dark:bg-[#1F2933] rounded-md p-4 border border-slate-200 dark:border-[#3E4C59]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Credit Score</span>
                </div>
                <p className="text-lg font-bold text-[#041E42] dark:text-white">
                  {formData.creditScore}
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-5 h-5 border-2 border-[#1B17FF] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-[#041E42] dark:text-white">
              Preparing your application secure environment...
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // SUCCESS SCREEN (after application submitted)
  if (showSuccess) {
    return (
      <ApplicationStatusMessage
        applicantName={formData.ownerFullName || `${formData.firstName} ${formData.lastName}`.trim()}
        phoneNumber={formatPhoneNumber(formData.ownerPhone || formData.businessPhone)}
        email={formData.ownerEmail}
        receivedItems={{
          businessInfo: !!(formData.businessLegalName || formData.firstName),
          ownerInfo: !!formData.ownerFullName,
          fundingRequest: !!(formData.requestedAmount && formData.intendedUse),
          bankConnected: formData.bankConnected,
          bankStatements: formData.bankStatements.length > 0,
          processorStatements: formData.processorStatements.length > 0,
          creditCardProcessor: !!formData.creditCardProcessor,
          identityVerified: !!(formData.idPhoto && formData.selfiePhoto),
          ssnProvided: !!formData.ssnLast4,
          eSignature: !!formData.eSignature,
        }}
        businessName={formData.businessLegalName || formData.businessDBA}
      />
    );
  }

  // APPLICATION FORM PHASE
  if (phase === 'application') {
    // Step 0: Get Started (Mercury Style)
    if (currentStep === 0) {
      return (
        <>
        <div className="flex items-center justify-center min-h-[60vh] md:min-h-[70vh]">
          <div className="bg-white dark:bg-[#1F2933] rounded-2xl shadow-xl max-w-lg w-full p-8 md:p-10 border border-slate-100 dark:border-[#3E4C59]">
            <h2 className="text-3xl font-semibold text-[#041E42] dark:text-white mb-2">Get started</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Apply in 10 minutes.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && formData.firstName.trim() !== '' && formData.lastName.trim() !== '') {
                  handleNext();
                }
              }}
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="John"
                  className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-md text-[#041E42] dark:text-white focus:ring-2 focus:ring-[#1B17FF] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Citizen"
                  className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-md text-[#041E42] dark:text-white focus:ring-2 focus:ring-[#1B17FF] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              By continuing, I agree to Delt's{' '}
              <button type="button" onClick={() => handleLegalLink('terms')} className="underline hover:text-[#1B17FF]">Terms of Use</button>,{' '}
              <button type="button" onClick={() => handleLegalLink('privacy')} className="underline hover:text-[#1B17FF]">Privacy Policy</button>{' '}
              and to receive electronic communication about my accounts and services per Delt's{' '}
              <button type="button" onClick={() => handleLegalLink('eca')} className="underline hover:text-[#1B17FF]">Electronic Communications Agreement</button>.
            </p>

            <Button
              onClick={handleNext}
              disabled={formData.firstName.trim() === '' || formData.lastName.trim() === ''}
              className="w-full mt-6 bg-[#041E42] hover:bg-[#03152F] dark:bg-[#1B17FF] dark:hover:bg-[#1510dd] text-white font-semibold py-2.5 px-6 rounded-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Start Application
            </Button>
          </div>
        </div>

        {/* Local Legal Page Overlay */}
        {localLegalPage && (
          <div className="fixed inset-0 bg-white dark:bg-[#0A1F35] z-[70] overflow-y-auto">
            {localLegalPage === 'terms' && <TermsOfUse onClose={() => setLocalLegalPage(null)} />}
            {localLegalPage === 'privacy' && <PrivacyPolicy onClose={() => setLocalLegalPage(null)} />}
            {localLegalPage === 'eca' && <ElectronicCommunicationsAgreement onClose={() => setLocalLegalPage(null)} />}
          </div>
        )}
      </>
      );
    }

    return (
      <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0A1628] py-10 md:py-16 px-4">
        <div className="bg-white dark:bg-[#020C1B] rounded-2xl border border-slate-200/80 dark:border-[#1F2933] shadow-[0_4px_32px_rgba(0,0,0,0.06)] max-w-4xl mx-auto p-8 md:p-12">
          {/* Header & Back Button Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-[#1F2933]">
            <div>
              {(currentStep > 0 || basicInfoMicroStep > 0) && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-slate-500 hover:text-[#041E42] dark:text-slate-400 dark:hover:text-white transition-colors mb-4 text-xs font-semibold tracking-wide uppercase"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Back
                </button>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-[#041E42] dark:text-white tracking-tight">
                See What You Qualify For
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Please provide accurate business information to process your funding request.
              </p>
            </div>
            
            {/* Trust Indicator - Top Right */}
            <div className="hidden md:flex items-center gap-2 bg-slate-50 dark:bg-[#1F2933] px-3 py-1.5 rounded-md border border-slate-100 dark:border-[#3E4C59]">
              <Shield className="w-3.5 h-3.5 text-[#041E42] dark:text-white" />
              <span className="text-xs font-medium text-[#041E42] dark:text-white">Bank-Grade Security</span>
            </div>
          </div>

          {/* Progress Stepper - Institutional Style */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#041E42] dark:text-white">
                {currentStep === 0 
                  ? steps[0].title
                  : steps[currentStep]?.title || 'Final Review'}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            
            <div className="flex gap-2 w-full">
              {steps.map((step, index) => {
                // Calculate progress for the current active step
                let segmentProgress = 0;
                
                if (index < currentStep) {
                  segmentProgress = 100;
                } else if (index === currentStep) {
                  if (index === 1) {
                    // Basic Info has 5 micro-steps (0-4)
                    segmentProgress = ((basicInfoMicroStep + 1) / 5) * 100;
                  } else if (index === 4) {
                    // Connect & Verify has 3 sub-steps (0-2)
                    segmentProgress = ((currentSubStep + 1) / 3) * 100;
                  } else {
                    // Other steps are single screens, so if active they are "in progress" or just starting
                    // We'll show 10% to indicate "started"
                    segmentProgress = 10;
                  }
                } else {
                  segmentProgress = 0;
                }

                return (
                  <div key={index} className="h-1.5 flex-1 bg-slate-100 dark:bg-[#1F2933] rounded-sm overflow-hidden">
                    <motion.div
                      className="h-full bg-[#041E42] dark:bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${segmentProgress}%` }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Basic Information - Now with Micro-steps */}
              {currentStep === 1 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={basicInfoMicroStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {/* Micro-step 0: Business Identity */}
                    {basicInfoMicroStep === 0 && (
                      <>
                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              Legal Business Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.businessLegalName}
                              onChange={(e) => updateFormData('businessLegalName', e.target.value)}
                              placeholder="e.g. Acme Corporation LLC"
                              autoComplete="organization"
                              className="w-full px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white placeholder-slate-400 focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm"
                            />
                            <p className="text-xs text-slate-500 mt-1">Please enter the name as it appears on tax documents.</p>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              DBA (Doing Business As)
                            </label>
                            <input
                              type="text"
                              value={formData.businessDBA}
                              onChange={(e) => {
                                updateFormData('businessDBA', e.target.value);
                                if (sameAsLegalName) setSameAsLegalName(false);
                              }}
                              placeholder="If different from legal name"
                              className="w-full px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white placeholder-slate-400 focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm"
                            />
                            <label className="flex items-center gap-2 mt-2 text-xs font-medium text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={sameAsLegalName}
                                onChange={(e) => {
                                  setSameAsLegalName(e.target.checked);
                                  if (e.target.checked) {
                                    updateFormData('businessDBA', formData.businessLegalName);
                                  } else {
                                    updateFormData('businessDBA', '');
                                  }
                                }}
                                className="w-4 h-4 rounded border-slate-300 text-[#041E42] focus:ring-[#041E42] focus:ring-offset-0"
                              />
                              Same as legal name
                            </label>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Micro-step 1: Business Location */}
                    {basicInfoMicroStep === 1 && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                            Physical Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.businessAddress}
                            onChange={(e) => updateFormData('businessAddress', e.target.value)}
                            placeholder="Street Address, P.O. Box"
                            autoComplete="street-address"
                            className="w-full px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white placeholder-slate-400 focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm"
                          />
                        </div>

                        <div className="grid md:grid-cols-3 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              City <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.businessCity}
                              onChange={(e) => updateFormData('businessCity', e.target.value)}
                              placeholder="City"
                              className="w-full px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white placeholder-slate-400 focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              State <span className="text-red-500">*</span>
                            </label>
                            <StateSelect
                              value={formData.businessState}
                              onChange={(value) => updateFormData('businessState', value)}
                              className="w-full px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              ZIP Code <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.businessZip}
                              onChange={(e) => updateFormData('businessZip', e.target.value.replace(/\D/g, '').slice(0, 5))}
                              placeholder="00000"
                              maxLength={5}
                              className={`w-full px-4 py-3 border rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white placeholder-slate-400 focus:ring-1 focus:outline-none transition-all shadow-sm ${
                                formData.businessZip && !validateZip(formData.businessZip)
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                  : 'border-slate-300 dark:border-[#1F2933] focus:border-[#1B17FF] focus:ring-[#1B17FF]'
                              }`}
                            />
                            {formData.businessZip && !validateZip(formData.businessZip) && (
                              <p className="text-red-500 text-xs mt-1 font-medium">Please enter a valid 5-digit ZIP code.</p>
                            )}
                            {showAutoFillHint === 'business' && (
                              <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-[#1B17FF] text-xs mt-1 flex items-center gap-1 font-medium"
                              >
                                <Check className="w-3 h-3" />
                                City and state auto-filled
                              </motion.p>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Micro-step 2: Business Contact & Tax Info */}
                    {basicInfoMicroStep === 2 && (
                      <>
                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              Primary Business Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              value={formatPhoneNumber(formData.businessPhone)}
                              onChange={(e) => updateFormData('businessPhone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                              placeholder="(000) 000-0000"
                              maxLength={14}
                              className={`w-full px-4 py-3 border rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white placeholder-slate-400 focus:ring-1 focus:outline-none transition-all shadow-sm ${
                                formData.businessPhone && !validatePhone(formData.businessPhone)
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                  : 'border-slate-300 dark:border-[#1F2933] focus:border-[#1B17FF] focus:ring-[#1B17FF]'
                              }`}
                            />
                            {formData.businessPhone && !validatePhone(formData.businessPhone) && (
                              <p className="text-red-500 text-xs mt-1 font-medium">Please enter a valid 10-digit phone number.</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              Federal Tax ID (EIN) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formatEIN(formData.businessEIN)}
                              onChange={(e) => {
                                const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 9);
                                updateFormData('businessEIN', digitsOnly);
                              }}
                              placeholder="00-0000000"
                              maxLength={10}
                              className={`w-full px-4 py-3 border rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white placeholder-slate-400 focus:ring-1 focus:outline-none transition-all shadow-sm ${
                                formData.businessEIN && !validateEIN(formData.businessEIN)
                                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                  : 'border-slate-300 dark:border-[#1F2933] focus:border-[#1B17FF] focus:ring-[#1B17FF]'
                              }`}
                            />
                            {formData.businessEIN && !validateEIN(formData.businessEIN) && (
                              <p className="text-red-500 text-xs mt-1 font-medium">Please enter a valid 9-digit EIN.</p>
                            )}
                          </div>
                        </div>

                        {/* Soft Credit Pull Notification */}
                        {formData.businessEIN && validateEIN(formData.businessEIN) && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-50 dark:bg-[#1B17FF]/5 border border-slate-200 dark:border-blue-900/30 rounded-md p-4 flex items-start gap-3 mt-4"
                          >
                            <Shield className="w-5 h-5 text-[#041E42] dark:text-[#1B17FF] flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-semibold text-[#041E42] dark:text-white mb-1">
                                No Hard Credit Inquiry
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                This pre-qualification step utilizes a <span className="font-semibold text-[#041E42] dark:text-white">soft credit check</span> only. It will not impact your credit score.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </>
                    )}

                    {/* Micro-step 3: Business Profile */}
                    {basicInfoMicroStep === 3 && (
                      <>
                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              Primary Industry <span className="text-red-500">*</span>
                            </label>
                            <Select
                              value={formData.industry}
                              onValueChange={(value) => {
                                updateFormData('industry', value);
                                // Clear the custom industry input if not "Other"
                                if (value !== t('industry.other') && value !== 'Other') {
                                  updateFormData('industryOther', '');
                                }
                              }}
                            >
                              <SelectTrigger className="w-full h-auto px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm">
                                <SelectValue placeholder="Select Industry" />
                              </SelectTrigger>
                              <SelectContent>
                                {industries.map((industry) => (
                                  <SelectItem key={industry} value={industry}>
                                    {industry}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {(formData.industry === t('industry.other') || formData.industry === 'Other') && (
                              <div className="mt-3">
                                <input
                                  type="text"
                                  value={formData.industryOther}
                                  onChange={(e) => updateFormData('industryOther', e.target.value)}
                                  placeholder="Please specify your industry"
                                  className="w-full px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white placeholder-slate-400 focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm"
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              Time in Business <span className="text-red-500">*</span>
                            </label>
                            <Select
                              value={formData.timeInBusiness}
                              onValueChange={(value) => updateFormData('timeInBusiness', value)}
                            >
                              <SelectTrigger className="w-full h-auto px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm">
                                <SelectValue placeholder="Select Duration" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeInBusinessOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Micro-step 4: Financial Overview */}
                    {basicInfoMicroStep === 4 && (
                      <>
                        <div className="grid md:grid-cols-3 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              Average Monthly Revenue <span className="text-red-500">*</span>
                            </label>
                            <Select
                              value={formData.monthlyRevenue}
                              onValueChange={(value) => updateFormData('monthlyRevenue', value)}
                            >
                              <SelectTrigger className="w-full h-auto px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm">
                                <SelectValue placeholder="Select Range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Under $10,000/month">Under $10,000/month</SelectItem>
                                <SelectItem value="$10,000 - $25,000/month">$10,000 - $25,000/month</SelectItem>
                                <SelectItem value="$25,000 - $50,000/month">$25,000 - $50,000/month</SelectItem>
                                <SelectItem value="$50,000 - $100,000/month">$50,000 - $100,000/month</SelectItem>
                                <SelectItem value="$100,000+/month">$100,000+/month</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              Credit Card Volume <span className="text-red-500">*</span>
                            </label>
                            <Select
                              value={formData.creditCardProcessing}
                              onValueChange={(value) => updateFormData('creditCardProcessing', value)}
                            >
                              <SelectTrigger className="w-full h-auto px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm">
                                <SelectValue placeholder="Select Volume" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="No credit card processing">No credit card processing</SelectItem>
                                <SelectItem value="Under $5,000/month">Under $5,000/month</SelectItem>
                                <SelectItem value="$5,000 - $15,000/month">$5,000 - $15,000/month</SelectItem>
                                <SelectItem value="$15,000 - $40,000/month">$15,000 - $40,000/month</SelectItem>
                                <SelectItem value="$40,000+/month">$40,000+/month</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                              Estimated Credit Score <span className="text-red-500">*</span>
                            </label>
                            <Select
                              value={formData.creditScore}
                              onValueChange={(value) => updateFormData('creditScore', value)}
                            >
                              <SelectTrigger className="w-full h-auto px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm">
                                <SelectValue placeholder="Select Range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Under 550">Under 550</SelectItem>
                                <SelectItem value="550-599">550-599</SelectItem>
                                <SelectItem value="600-649">600-649</SelectItem>
                                <SelectItem value="650-699">650-699</SelectItem>
                                <SelectItem value="700+">700+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Step 2: Funding Request */}
              {currentStep === 2 && (
                <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                    Requested Funding Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 z-10" />
                    <Select
                      value={formData.requestedAmount}
                      onValueChange={(value) => updateFormData('requestedAmount', value)}
                    >
                      <SelectTrigger className="w-full h-auto pl-10 pr-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm">
                        <SelectValue placeholder="Select Amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10000">$10,000</SelectItem>
                        <SelectItem value="25000">$25,000</SelectItem>
                        <SelectItem value="50000">$50,000</SelectItem>
                        <SelectItem value="75000">$75,000</SelectItem>
                        <SelectItem value="100000">$100,000</SelectItem>
                        <SelectItem value="150000">$150,000</SelectItem>
                        <SelectItem value="200000">$200,000</SelectItem>
                        <SelectItem value="250000">$250,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                    Intended Use of Funds <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.intendedUse}
                    onValueChange={(value) => updateFormData('intendedUse', value)}
                  >
                    <SelectTrigger className="w-full h-auto px-4 py-3 border border-slate-300 dark:border-[#1F2933] rounded-md bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all shadow-sm">
                      <SelectValue placeholder="Select Use" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundingUses.map((use) => (
                        <SelectItem key={use} value={use}>
                          {use}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </div>
                )}

              {/* Step 3: Financial Documents */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-[22px] font-semibold text-[#041E42] dark:text-white mb-8">
                    Financial documents
                  </h2>

                  {/* Credit Card Processor Selection */}
                  <div className="mb-10">
                    <h4 className="text-[17px] font-semibold text-[#041E42] dark:text-white mb-1.5">
                      Credit card processor
                    </h4>
                    <p className="text-[13.5px] text-[#6B7280] dark:text-slate-400 mb-4 leading-relaxed max-w-xl">
                      Select the processor your business currently uses for card transactions.
                    </p>
                    <Select
                      value={formData.creditCardProcessor}
                      onValueChange={(value) => {
                        updateFormData('creditCardProcessor', value);
                        if (value !== t('processor.other')) {
                          updateFormData('creditCardProcessorOther', '');
                        }
                      }}
                    >
                      <SelectTrigger className="w-full max-w-md h-auto px-4 py-3 border border-[#D1D5DB] dark:border-[#1F2933] rounded-lg bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all">
                        <SelectValue placeholder="Select your processor" />
                      </SelectTrigger>
                      <SelectContent>
                        {creditCardProcessors.map((processor) => (
                          <SelectItem key={processor} value={processor}>
                            {processor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.creditCardProcessor === t('processor.other') && (
                      <input
                        type="text"
                        value={formData.creditCardProcessorOther}
                        onChange={(e) => updateFormData('creditCardProcessorOther', e.target.value)}
                        placeholder="Enter your processor name"
                        className="mt-3 w-full max-w-md px-4 py-3 border border-[#D1D5DB] dark:border-[#1F2933] rounded-lg bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:ring-1 focus:ring-[#1B17FF] focus:outline-none transition-all placeholder:text-[#9CA3AF]"
                        required
                      />
                    )}
                  </div>

                  {/* Credit Card Processing Statements */}
                  <DocumentUploadSection
                    title="Credit card processing statements"
                    description={
                      <>
                        Please upload <strong>3–4 months</strong> of merchant processing statements. We analyze your card volume to maximize your offer.
                      </>
                    }
                    files={formData.processorStatements}
                    onUpload={(files) => updateFormData('processorStatements', [...formData.processorStatements, ...files])}
                    onRemove={(index) => {
                      const newFiles = [...formData.processorStatements];
                      newFiles.splice(index, 1);
                      updateFormData('processorStatements', newFiles);
                    }}
                    progressSteps={[
                      'Scanning...',
                      'Analyzing Revenue...',
                      'Parsing Data...'
                    ]}
                  />

                  {/* Secure upload note */}
                  <div className="flex items-start gap-2.5 mt-2">
                    <Shield className="w-4 h-4 text-[#9CA3AF] flex-shrink-0 mt-0.5" />
                    <p className="text-[12px] text-[#9CA3AF] dark:text-slate-500 leading-relaxed">
                      All documents are encrypted and stored securely. We use this data solely for underwriting purposes and never share it with unauthorized third parties.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Connect Accounts & Verify Identity */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Sub-step Progress Indicator */}
                  <div className="flex items-center justify-center gap-2">
                    {['Bank', 'SSN', 'ID'].map((label, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                          index === currentSubStep 
                            ? 'bg-[#1B17FF] text-white scale-110' 
                            : index < currentSubStep 
                            ? 'bg-[#16A34A] text-white' 
                            : 'bg-[#E4E7EB] dark:bg-[#1F2933] text-[#52606D] dark:text-[#CBD2D9]'
                        }`}>
                          {index < currentSubStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                        </div>
                        <span className="ml-2 text-xs font-semibold text-[#041E42] dark:text-white">{label}</span>
                        {index < 2 && <div className="w-8 h-0.5 bg-[#E4E7EB] dark:bg-[#1F2933] mx-2" />}
                      </div>
                    ))}
                  </div>

                  {/* Sub-step 0: Bank Connection */}
                  {currentSubStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-[#041E42] dark:text-white mb-4">
                          Connect Your Bank Account
                        </h4>
                        <div className="bg-gradient-to-br from-[#E8EBF0] to-[#F5F7FA] dark:from-[#1F2933] dark:to-[#132030] rounded-xl p-6 border border-[#041E42]/15">
                          <div className="flex items-start gap-4 mb-4">
                            <Shield className="w-10 h-10 text-[#041E42] dark:text-white flex-shrink-0" />
                            <div>
                              <p className="text-base font-semibold text-[#041E42] dark:text-white mb-2">
                                Secure Bank Connection via Plaid
                              </p>
                              <p className="text-sm text-[#52606D] dark:text-[#CBD2D9]">
                                We use bank-level encryption to securely connect your account and verify 3-4 months of transactions. This helps us provide you with the best funding options.
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              if (!formData.bankConnected) {
                                setPlaidStep('phone');
                                setPlaidPhone('');
                                setPlaidLinkMethod('instant');
                                setPlaidModalOpen(true);
                              }
                            }}
                            className={`w-full h-12 ${
                              formData.bankConnected
                                ? 'bg-[#16A34A] hover:bg-[#15803D]'
                                : 'bg-[#041E42] hover:bg-[#03152F]'
                            } text-white font-semibold`}
                          >
                            {formData.bankConnected ? (
                              <>
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Bank Account Connected
                              </>
                            ) : (
                              <>
                                <LinkIcon className="w-5 h-5 mr-2" />
                                Connect Bank Account
                              </>
                            )}
                          </Button>
                          
                          {/* Manual Upload Option */}
                          {!formData.bankConnected && !formData.bankConnectionSkipped && (
                            <div className="mt-4 text-center">
                              <button
                                onClick={() => {
                                  updateFormData('bankConnectionSkipped', true);
                                  updateFormData('bankConnected', false);
                                }}
                                className="text-sm text-slate-500 hover:text-[#041E42] underline transition-colors"
                              >
                                I prefer to upload bank statements manually
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bank Statement Upload - shown when Plaid is skipped */}
                      {formData.bankConnectionSkipped && (
                        <div className="mt-6">
                          <DocumentUploadSection
                            title="Bank statements"
                            description={
                              <>
                                Please upload <strong>3 months</strong> of recent business bank statements. Ensure the business name and address are visible.
                              </>
                            }
                            files={formData.bankStatements}
                            onUpload={(files) => updateFormData('bankStatements', [...formData.bankStatements, ...files])}
                            onRemove={(index) => {
                              const newFiles = [...formData.bankStatements];
                              newFiles.splice(index, 1);
                              updateFormData('bankStatements', newFiles);
                            }}
                            progressSteps={[
                              'Verifying...',
                              'Indexing...',
                              'Detecting Cash Flow...'
                            ]}
                          />
                          <button
                            onClick={() => {
                              updateFormData('bankConnectionSkipped', false);
                              updateFormData('bankStatements', []);
                            }}
                            className="text-sm text-slate-500 hover:text-[#1B17FF] underline transition-colors mt-3"
                          >
                            Connect via Plaid instead
                          </button>
                        </div>
                      )}

                      {/* Plaid Modal Overlay */}
                      <AnimatePresence>
                        {plaidModalOpen && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
                            onClick={() => setPlaidModalOpen(false)}
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 20 }}
                              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                              onClick={(e) => e.stopPropagation()}
                              className="bg-white dark:bg-[#1F2933] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col"
                              style={{ maxHeight: '90vh' }}
                            >
                              {/* Plaid Step 1: Phone Number */}
                              {plaidStep === 'phone' && (
                                <div className="flex flex-col h-full">
                                  {/* Header */}
                                  <div className="flex items-center justify-end p-4 pb-0">
                                    <button
                                      onClick={() => setPlaidModalOpen(false)}
                                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>

                                  {/* Body */}
                                  <div className="px-8 pt-4 pb-6 flex-1">
                                    {/* Logos */}
                                    <div className="flex items-center justify-center gap-1 mb-6">
                                      <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                                        <img src={deltFavicon} alt="Delt" className="w-full h-full object-cover" />
                                      </div>
                                      <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                          <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" fill="white"/>
                                        </svg>
                                      </div>
                                    </div>

                                    <h3 className="text-center text-lg text-[#041E42] dark:text-white mb-1">
                                      Delt uses <span className="font-semibold">Plaid</span> to connect
                                    </h3>
                                    <p className="text-center text-lg text-[#041E42] dark:text-white mb-8">your account</p>

                                    {/* Phone Input */}
                                    <div className="border border-slate-200 dark:border-slate-600 rounded-lg flex items-center px-3 py-3 mb-3 focus-within:border-[#1B17FF] focus-within:ring-1 focus-within:ring-[#1B17FF] transition-all">
                                      <span className="text-lg mr-2">🇺🇸</span>
                                      <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">+1</span>
                                      <input
                                        type="tel"
                                        value={plaidPhone}
                                        onChange={(e) => {
                                          const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                                          let formatted = digits;
                                          if (digits.length > 6) {
                                            formatted = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
                                          } else if (digits.length > 3) {
                                            formatted = `(${digits.slice(0,3)}) ${digits.slice(3)}`;
                                          } else if (digits.length > 0) {
                                            formatted = `(${digits}`;
                                          }
                                          setPlaidPhone(formatted);
                                        }}
                                        placeholder="Phone"
                                        className="flex-1 outline-none bg-transparent text-[#041E42] dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm"
                                        autoFocus
                                      />
                                    </div>

                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                      <span className="text-amber-500 mr-1">⚡</span>
                                      Use your phone number to log in or sign up with Plaid to go faster next time.{' '}
                                      <button className="underline hover:text-[#1B17FF] transition-colors">Learn more</button>
                                    </p>

                                    <div className="mt-auto pt-8">
                                      <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center leading-relaxed">
                                        <button className="underline hover:text-[#1B17FF] transition-colors">Terms</button> apply. By continuing, you agree to Plaid's{' '}
                                        <button className="underline hover:text-[#1B17FF] transition-colors">Privacy Policy</button> and to receive updates on plaid.com
                                      </p>
                                    </div>
                                  </div>

                                  {/* Footer */}
                                  <div className="px-6 pb-6 pt-2">
                                    <button
                                      onClick={() => setPlaidStep('link')}
                                      disabled={plaidPhone.replace(/\D/g, '').length < 10}
                                      className="w-full py-3.5 rounded-full bg-[#0A85EA] hover:bg-[#0977D5] disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 text-white font-semibold text-base transition-all"
                                    >
                                      Continue
                                    </button>
                                  </div>
                                </div>
                              )}

                              {/* Plaid Step 2: Link Method */}
                              {plaidStep === 'link' && (
                                <div className="flex flex-col h-full">
                                  {/* Header */}
                                  <div className="flex items-center justify-between p-4 pb-0">
                                    <button
                                      onClick={() => setPlaidStep('phone')}
                                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                    >
                                      <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <div className="flex items-center gap-1.5">
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" fill="#111"/>
                                      </svg>
                                      <span className="text-xs font-semibold tracking-wider uppercase text-slate-800 dark:text-slate-200">Plaid</span>
                                    </div>
                                    <button
                                      onClick={() => setPlaidModalOpen(false)}
                                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>

                                  {/* Body */}
                                  <div className="px-8 pt-6 pb-6 flex-1">
                                    {/* Bank Icon */}
                                    <div className="flex justify-center mb-6">
                                      <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                                        <Building2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                                      </div>
                                    </div>

                                    <h3 className="text-center text-lg font-semibold text-[#041E42] dark:text-white mb-6">
                                      Choose how you'll link your bank account
                                    </h3>

                                    {/* Option: Instant */}
                                    <button
                                      onClick={() => setPlaidLinkMethod('instant')}
                                      className={`w-full text-left border rounded-xl p-4 mb-3 transition-all ${
                                        plaidLinkMethod === 'instant'
                                          ? 'border-[#1B17FF] bg-[#F8F8FF] dark:bg-[#1B17FF]/10 ring-1 ring-[#1B17FF]'
                                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                                      }`}
                                    >
                                      <div className="flex items-start gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                          plaidLinkMethod === 'instant'
                                            ? 'border-[#1B17FF]'
                                            : 'border-slate-300 dark:border-slate-500'
                                        }`}>
                                          {plaidLinkMethod === 'instant' && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#1B17FF]" />
                                          )}
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-sm text-[#041E42] dark:text-white">Instant</span>
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold rounded-full uppercase tracking-wide">
                                              <CheckCircle className="w-3 h-3" /> Recommended
                                            </span>
                                          </div>
                                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                            Log into your bank to link instantly
                                          </p>
                                        </div>
                                      </div>
                                    </button>

                                    {/* Option: Manual */}
                                    <button
                                      onClick={() => setPlaidLinkMethod('manual')}
                                      className={`w-full text-left border rounded-xl p-4 transition-all ${
                                        plaidLinkMethod === 'manual'
                                          ? 'border-[#1B17FF] bg-[#F8F8FF] dark:bg-[#1B17FF]/10 ring-1 ring-[#1B17FF]'
                                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                                      }`}
                                    >
                                      <div className="flex items-start gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                          plaidLinkMethod === 'manual'
                                            ? 'border-[#1B17FF]'
                                            : 'border-slate-300 dark:border-slate-500'
                                        }`}>
                                          {plaidLinkMethod === 'manual' && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#1B17FF]" />
                                          )}
                                        </div>
                                        <div>
                                          <span className="font-semibold text-sm text-[#041E42] dark:text-white block mb-1">Manual</span>
                                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                            Enter account and routing numbers. Typically takes 1-2 days to verify.
                                          </p>
                                        </div>
                                      </div>
                                    </button>
                                  </div>

                                  {/* Footer */}
                                  <div className="px-6 pb-6 pt-2">
                                    <button
                                      onClick={() => {
                                        updateFormData('bankConnected', true);
                                        setPlaidModalOpen(false);
                                      }}
                                      className="w-full py-3.5 rounded-full bg-[#111] hover:bg-[#222] dark:bg-white dark:hover:bg-slate-100 dark:text-[#111] text-white font-semibold text-base transition-all"
                                    >
                                      Continue
                                    </button>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* Sub-step 1: SSN Verification */}
                  {currentSubStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-lg font-bold text-[#041E42] dark:text-white mb-4">
                          Verify Your Identity
                        </h4>
                        <div className="bg-gradient-to-br from-[#E8EBF0] to-[#F5F7FA] dark:from-[#1F2933] dark:to-[#132030] rounded-xl p-6 border border-[#041E42]/15">
                          <div className="flex items-start gap-4 mb-4">
                            <Shield className="w-10 h-10 text-[#041E42] dark:text-white flex-shrink-0" />
                            <div>
                              <p className="text-base font-semibold text-[#041E42] dark:text-white mb-2">
                                Social Security Number (Last 4 Digits)
                              </p>
                              <p className="text-sm text-[#52606D] dark:text-[#CBD2D9]">
                                Used for identity verification only. Your information is encrypted and secure.
                              </p>
                            </div>
                          </div>
                          <div className="max-w-xs mx-auto">
                            <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-3 text-center">
                              Last 4 Digits of SSN <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={ssnDisplayValue}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').replace(/•/g, '').slice(0, 4);
                                
                                // Update the actual data
                                updateFormData('ssnLast4', value);
                                
                                // Show the actual digit briefly
                                setSsnDisplayValue(value);
                                
                                // Clear any existing timeout
                                if (ssnTimeout) {
                                  clearTimeout(ssnTimeout);
                                }
                                
                                // Convert to dots after 500ms
                                const timeout = setTimeout(() => {
                                  setSsnDisplayValue('•'.repeat(value.length));
                                }, 500);
                                setSsnTimeout(timeout);
                              }}
                              placeholder="****"
                              maxLength={4}
                              className="w-full px-4 py-4 border-2 border-[#D1D5DB] dark:border-[#1F2933] rounded-lg bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:outline-none transition-colors text-center text-3xl font-mono tracking-[0.5em]"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Sub-step 2: ID Verification */}
                  {currentSubStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <IDVerification
                        onComplete={(idPhoto, selfiePhoto) => {
                          updateFormData('idPhoto', idPhoto);
                          updateFormData('selfiePhoto', selfiePhoto);
                          setIdVerificationComplete(true);
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 5 && (
                <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-[#1F2933] border border-slate-200 dark:border-[#3E4C59] rounded-md p-6 md:p-8">
                  <h4 className="text-xl font-bold text-[#041E42] dark:text-white mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#041E42] dark:text-white" />
                    Application Summary
                  </h4>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Business Information</p>
                        <p className="text-base font-semibold text-[#041E42] dark:text-white">{formData.businessLegalName}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          {formData.businessAddress}<br />
                          {formData.businessCity}, {formData.businessState} {formData.businessZip}
                        </p>
                        <div className="flex gap-3 mt-2 text-sm text-slate-600 dark:text-slate-300">
                          <span className="bg-white dark:bg-[#020C1B] px-2 py-0.5 rounded border border-slate-200 dark:border-[#3E4C59]">{formData.industry}</span>
                          <span className="bg-white dark:bg-[#020C1B] px-2 py-0.5 rounded border border-slate-200 dark:border-[#3E4C59]">{formData.timeInBusiness}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Owner Information</p>
                        <p className="text-base font-semibold text-[#041E42] dark:text-white">{formData.ownerFullName}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{formData.ownerEmail}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{formData.ownerPhone}</p>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 dark:border-[#3E4C59] pt-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Funding Request</p>
                          <p className="text-2xl font-bold text-[#041E42] dark:text-white">
                            ${parseInt(formData.requestedAmount).toLocaleString()}
                          </p>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                            Purpose: {formData.intendedUse}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Verification Status</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-[#041E42] dark:text-white">
                              <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                              </div>
                              <span>
                                {formData.bankConnected 
                                  ? 'Bank account connected' 
                                  : 'Bank statements provided'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-[#041E42] dark:text-white">
                              <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                              </div>
                              <span>Identity verified (SSN & ID)</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-[#041E42] dark:text-white">
                              <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                              </div>
                              <span>Processing statements uploaded</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#041E42] dark:text-white mb-2">
                    Electronic Signature <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.eSignature}
                    onChange={(e) => updateFormData('eSignature', e.target.value)}
                    placeholder="Type your full name"
                    className="w-full px-4 py-3 border-2 border-[#D1D5DB] dark:border-[#1F2933] rounded-lg bg-white dark:bg-[#020C1B] text-[#041E42] dark:text-white focus:border-[#1B17FF] focus:outline-none transition-colors text-2xl"
                    style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', 'Apple Chancery', cursive" }}
                  />
                  <p className="text-xs text-[#52606D] dark:text-[#CBD2D9] mt-2">
                    By typing your name, you agree to use electronic signatures
                  </p>
                </div>

                <div className="bg-[#F5F7FA] dark:bg-[#1F2933] rounded-xl p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) => updateFormData('agreedToTerms', e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-[#D1D5DB] dark:border-[#3E4C59] text-[#1B17FF] focus:ring-[#1B17FF]"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-[#041E42] dark:text-white">
                        I authorize Delt to obtain my credit report and verify the information provided. I agree to the{' '}
                        <span className="text-[#1B17FF] font-semibold">Terms of Service</span> and{' '}
                        <span className="text-[#1B17FF] font-semibold">Privacy Policy</span>.
                      </p>
                    </div>
                  </label>
                </div>

                {!canProceedStep6() && (
                  <div className="bg-[#FEF2F2] dark:bg-[#7F1D1D]/20 rounded-xl p-4 border border-red-200 dark:border-red-900/50">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">
                          Action Required
                        </p>
                        <p className="text-xs text-red-700 dark:text-red-400">
                          Please provide your electronic signature and agree to the terms before submitting.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
                )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 pt-6 border-t border-slate-100 dark:border-[#1F2933]">
            <div className="flex flex-col-reverse sm:flex-row gap-4 justify-end">
              <Button
                onClick={() => {
                  // Skip to next step without validation
                  if (currentStep === 4) {
                    if (currentSubStep < 2) {
                      setCurrentSubStep(currentSubStep + 1);
                    } else {
                      setCurrentSubStep(0);
                      setManualNavigation(true);
                      setUserWentBack(false);
                      setCurrentStep(currentStep + 1);
                    }
                  } else {
                    setManualNavigation(true);
                    setUserWentBack(false);
                    if (currentStep === steps.length - 1) {
                      setShowSuccess(true);
                    } else {
                      setCurrentStep(currentStep + 1);
                    }
                  }
                }}
                variant="ghost"
                className="w-full sm:w-auto text-slate-500 hover:text-[#041E42] hover:bg-slate-50 dark:hover:bg-[#1F2933] font-medium py-3 px-6 rounded transition-all"
              >
                Skip Step
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  currentStep === steps.length - 1 
                    ? false // Allow submission on final step for testing
                    : currentStep === 4 
                      ? (currentSubStep === 0 && !formData.bankConnected && !(formData.bankConnectionSkipped && formData.bankStatements.length > 0)) ||
                        (currentSubStep === 1 && (!formData.ssnLast4 || formData.ssnLast4.length !== 4)) ||
                        (currentSubStep === 2 && !idVerificationComplete)
                      : !canProceed()
                }
                className="w-full sm:w-auto bg-[#041E42] hover:bg-[#03152F] dark:bg-[#1B17FF] dark:hover:bg-[#1510dd] text-white font-semibold py-3 px-8 rounded shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
              >
                {currentStep === steps.length - 1 ? 'Submit Application' : 
                 currentStep === 4 && currentSubStep < 2 ? 'Next' : 
                 currentStep === 1 && basicInfoMicroStep < 4 ? 'Next' :
                 'Save & Continue'}
              </Button>
            </div>

            {/* Security Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 mt-6">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">256-bit encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">No impact to your credit to apply</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
