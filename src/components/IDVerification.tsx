import { useState } from 'react';
import { X, ArrowLeft, CheckCircle, Camera, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import idExampleImage from 'figma:asset/0cff291c22761eb0ef4ca70c2b8d99c7becc9199.png';
import selfieExampleImage from 'figma:asset/8d438a68b65210c0284b11b2b20a89a891d10ea8.png';

interface IDVerificationProps {
  ssn?: string;
  onComplete: (idPhoto: string, selfiePhoto: string) => void;
}

export function IDVerification({ onComplete }: IDVerificationProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<'id' | 'selfie'>('id');
  const [done, setDone] = useState(false);

  const openModal = () => {
    setStep('id');
    setModalOpen(true);
  };

  const confirmId = () => {
    setStep('selfie');
  };

  const confirmSelfie = () => {
    setDone(true);
    setModalOpen(false);
    onComplete('id-verified', 'selfie-verified');
  };

  const skipId = () => {
    setStep('selfie');
  };

  const skipSelfie = () => {
    setDone(true);
    setModalOpen(false);
    onComplete('', '');
  };

  return (
    <>
      {/* Trigger — matches bank connection pattern */}
      <div className="text-center py-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 mb-4">
          {done
            ? <CheckCircle className="w-6 h-6 text-emerald-500" />
            : <Camera className="w-6 h-6 text-[#1B17FF]" />
          }
        </div>
        <h4 className="text-[#041E42] dark:text-white mb-1">
          {done ? 'Identity Verified' : 'Verify Your Identity'}
        </h4>
        <p className="text-sm text-slate-400 dark:text-slate-400 max-w-xs mx-auto mb-6">
          {done
            ? 'Your ID and selfie have been captured successfully.'
            : "We'll guide you through a quick ID and selfie capture via Plaid."}
        </p>
        <button
          onClick={openModal}
          disabled={done}
          className={`px-8 py-3 rounded-full text-sm transition-all ${
            done
              ? 'bg-emerald-500 text-white cursor-default'
              : 'bg-[#1B17FF] hover:bg-[#1510dd] text-white'
          }`}
        >
          {done ? (
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Verified
            </span>
          ) : (
            'Begin Verification'
          )}
        </button>
      </div>

      {/* Plaid-style Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1F2933] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Capture ID */}
                {step === 'id' && (
                  <motion.div
                    key="id"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 pt-5">
                      <div />
                      <button
                        onClick={() => setModalOpen(false)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Logos */}
                    <div className="flex items-center justify-center gap-1.5 pt-2 pb-4">
                      <div className="w-10 h-10 rounded-full bg-[#041E42] flex items-center justify-center">
                        <span className="text-white text-lg">D</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" fill="white"/></svg>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="text-center px-8 mb-5">
                      <p className="text-lg text-[#041E42] dark:text-white">
                        Step 1 of 2 — <span className="font-semibold">Capture ID</span>
                      </p>
                      <p className="text-sm text-slate-400 dark:text-slate-400 mt-1">
                        Position your government-issued ID clearly
                      </p>
                    </div>

                    {/* ID Image */}
                    <div className="px-8 mb-6">
                      <img
                        src={idExampleImage}
                        alt="Capture your ID"
                        className="w-full rounded-xl"
                      />
                    </div>

                    {/* Terms */}
                    <p className="text-[11px] text-slate-300 dark:text-slate-500 text-center px-8 leading-relaxed mb-4">
                      Photos are encrypted end-to-end. By continuing you agree to Plaid's{' '}
                      <button className="underline hover:text-[#1B17FF]">Privacy Policy</button>
                    </p>

                    {/* Buttons */}
                    <div className="px-6 pb-6 flex gap-3">
                      <button
                        onClick={skipId}
                        className="flex-1 py-3 rounded-full text-sm text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                      >
                        Skip
                      </button>
                      <button
                        onClick={confirmId}
                        className="flex-1 py-3 rounded-full bg-[#111] dark:bg-white text-white dark:text-[#111] text-sm transition-all hover:opacity-90"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Take Selfie */}
                {step === 'selfie' && (
                  <motion.div
                    key="selfie"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 pt-5">
                      <button
                        onClick={() => setStep('id')}
                        className="text-slate-300 hover:text-slate-500 dark:hover:text-slate-200 transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" fill="#111"/></svg>
                        <span className="text-[10px] tracking-wider uppercase text-slate-500 dark:text-slate-200">Plaid</span>
                      </div>
                      <button
                        onClick={() => setModalOpen(false)}
                        className="text-slate-300 hover:text-slate-500 dark:hover:text-slate-200 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center pt-4 pb-3">
                      <div className="w-12 h-12 rounded-full bg-white border border-emerald-200 dark:bg-emerald-900/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="text-center px-8 mb-5">
                      <p className="text-lg text-[#041E42] dark:text-white">
                        Step 2 of 2 — <span className="font-semibold">Take a Selfie</span>
                      </p>
                      <p className="text-sm text-slate-400 dark:text-slate-400 mt-1">
                        Make sure your face is clearly visible
                      </p>
                    </div>

                    {/* Selfie Image */}
                    <div className="px-8 mb-6">
                      <img
                        src={selfieExampleImage}
                        alt="Take a selfie"
                        className="w-full rounded-xl"
                      />
                    </div>

                    {/* Terms */}
                    <p className="text-[11px] text-slate-300 dark:text-slate-500 text-center px-8 leading-relaxed mb-4">
                      Photos are encrypted end-to-end. By continuing you agree to Plaid's{' '}
                      <button className="underline hover:text-[#1B17FF]">Privacy Policy</button>
                    </p>

                    {/* Buttons */}
                    <div className="px-6 pb-6 flex gap-3">
                      <button
                        onClick={skipSelfie}
                        className="flex-1 py-3 rounded-full text-sm text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                      >
                        Skip
                      </button>
                      <button
                        onClick={confirmSelfie}
                        className="flex-1 py-3 rounded-full bg-[#111] dark:bg-white text-white dark:text-[#111] text-sm transition-all hover:opacity-90"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}