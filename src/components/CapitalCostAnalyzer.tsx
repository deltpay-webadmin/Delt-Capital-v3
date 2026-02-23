import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Slider } from './ui/slider';

interface CapitalCostAnalyzerProps {
  onApplyClick?: () => void;
}

export function CapitalCostAnalyzer({ onApplyClick }: CapitalCostAnalyzerProps) {
  const [advanceAmount, setAdvanceAmount] = useState(95000);
  const [factorRate, setFactorRate] = useState(1.10);
  const [dailyHoldback, setDailyHoldback] = useState(20);
  const [repaymentFrequency, setRepaymentFrequency] = useState<'daily' | 'weekly'>('daily');

  // Calculations
  const totalRepayment = advanceAmount * factorRate;
  const costOfCapital = totalRepayment - advanceAmount;
  const paymentAmount = repaymentFrequency === 'daily' 
    ? (totalRepayment * (dailyHoldback / 100)) / 30  // Daily payment
    : ((totalRepayment * (dailyHoldback / 100)) / 30) * 5;  // Weekly payment (5 business days)
  const estimatedPeriods = totalRepayment / paymentAmount;
  const estimatedDays = repaymentFrequency === 'daily' ? estimatedPeriods : estimatedPeriods * 5;
  const estimatedMonths = Math.round(estimatedDays / 30);

  return (
    <div className="bg-white dark:bg-[#0A1F35] rounded-xl md:rounded-2xl shadow-xl max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center pt-6 md:pt-8 pb-4 md:pb-6 px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          Calculator
        </h2>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 px-4 md:px-6 lg:px-10 pb-6 md:pb-10">
        {/* Left Column - Inputs */}
        <div className="space-y-5 md:space-y-7">
          {/* Advance Amount */}
          <div>
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <label className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                Advance Amount
              </label>
              <input
                type="text"
                value={`$${advanceAmount.toLocaleString()}`}
                readOnly
                className="w-28 md:w-32 px-2 md:px-3 py-1 md:py-1.5 text-right border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0f1f2e] text-gray-900 dark:text-white font-medium text-xs md:text-sm focus:outline-none"
              />
            </div>
            
            <Slider
              value={[advanceAmount]}
              onValueChange={(value) => setAdvanceAmount(value[0])}
              min={10000}
              max={250000}
              step={5000}
              className="mb-2"
            />
            
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1.5">
              <span>$10,000</span>
              <span>$250,000</span>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Enter the total advance amount you want to receive
            </p>
          </div>

          {/* Factor Rate */}
          <div>
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <label className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                Factor Rate
              </label>
              <input
                type="text"
                value={factorRate.toFixed(2)}
                readOnly
                className="w-28 md:w-32 px-2 md:px-3 py-1 md:py-1.5 text-right border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0f1f2e] text-gray-900 dark:text-white font-medium text-xs md:text-sm focus:outline-none"
              />
            </div>
            
            <Slider
              value={[factorRate * 100]}
              onValueChange={(value) => setFactorRate(value[0] / 100)}
              min={105}
              max={115}
              step={1}
              className="mb-2"
            />
            
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1.5">
              <span>1.05</span>
              <span>1.15</span>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Range 1.05-1.15 is the preferred applicant range. Not all may qualify for these rates.
            </p>
          </div>

          {/* Daily Payment Percentage */}
          <div>
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <label className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                Daily Payment %
              </label>
              <input
                type="text"
                value={`${dailyHoldback}%`}
                readOnly
                className="w-28 md:w-32 px-2 md:px-3 py-1 md:py-1.5 text-right border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#0f1f2e] text-gray-900 dark:text-white font-medium text-xs md:text-sm focus:outline-none"
              />
            </div>
            
            <Slider
              value={[dailyHoldback]}
              onValueChange={(value) => setDailyHoldback(value[0])}
              min={10}
              max={25}
              step={1}
              className="mb-2"
            />
            
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1.5">
              <span>10%</span>
              <span>25%</span>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Percentage of daily sales used for repayment
            </p>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="bg-[#F5F7FA] dark:bg-[#0f1f2e] rounded-lg md:rounded-xl p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Payment with Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                {repaymentFrequency === 'daily' ? 'Daily' : 'Weekly'} Payment
              </h3>
              <div className="inline-flex rounded-lg bg-gray-200 dark:bg-gray-700 p-0.5">
                <button
                  onClick={() => setRepaymentFrequency('daily')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    repaymentFrequency === 'daily'
                      ? 'bg-[#1B17FF] text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setRepaymentFrequency('weekly')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    repaymentFrequency === 'weekly'
                      ? 'bg-[#1B17FF] text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Weekly
                </button>
              </div>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
              ${Math.round(paymentAmount).toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              This is an approximate {repaymentFrequency} repayment amount based on {dailyHoldback}% of your {repaymentFrequency} sales.
            </p>
          </div>

          <hr className="border-gray-300 dark:border-gray-600" />

          {/* Total Repayment */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                Total Repayment
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Total amount you will repay
              </p>
            </div>
            <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
              ${totalRepayment.toLocaleString()}
            </p>
          </div>

          {/* Cost of Capital */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                Cost of Capital
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Total cost of the advance
              </p>
            </div>
            <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
              ${costOfCapital.toLocaleString()}
            </p>
          </div>

          {/* Estimated Timeline */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-0.5 md:mb-1">
                Estimated Timeline
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Approximate repayment period
              </p>
            </div>
            <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
              {estimatedMonths} months
            </p>
          </div>

          <hr className="border-gray-300 dark:border-gray-600" />

          {/* CTA Section */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1.5 md:mb-2">
              Ready to get started?
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
              Get in touch with our funding advisors for personalized guidance and fast approval!
            </p>
            <button 
              onClick={onApplyClick}
              className="w-full bg-[#1B17FF] hover:bg-[#1510dd] text-white font-semibold py-2.5 md:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}