import { Check, X, Zap, CreditCard, BarChart3, FileText, TrendingDown, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function ComparisonTable() {
  const { t } = useLanguage();
  
  const comparisonData = [
    {
      featureKey: 'comparison.getFunded',
      descriptionKey: 'comparison.getFunded.desc',
      traditionalKey: 'comparison.getFunded.traditional',
      deltKey: 'comparison.getFunded.delt',
      isHighlight: true,
    },
    {
      featureKey: 'comparison.repayment',
      descriptionKey: 'comparison.repayment.desc',
      traditionalKey: 'comparison.repayment.traditional',
      deltKey: 'comparison.repayment.delt',
      isHighlight: true,
    },
    {
      featureKey: 'comparison.credit',
      descriptionKey: 'comparison.credit.desc',
      traditionalKey: 'comparison.credit.traditional',
      deltKey: 'comparison.credit.delt',
      isHighlight: true,
    },
    {
      featureKey: 'comparison.paperwork',
      descriptionKey: 'comparison.paperwork.desc',
      traditionalKey: 'comparison.paperwork.traditional',
      deltKey: 'comparison.paperwork.delt',
      isHighlight: true,
    },
    {
      featureKey: 'comparison.slowMonths',
      descriptionKey: 'comparison.slowMonths.desc',
      traditionalKey: 'comparison.slowMonths.traditional',
      deltKey: 'comparison.slowMonths.delt',
      isHighlight: true,
    },
    {
      featureKey: 'comparison.collateral',
      descriptionKey: 'comparison.collateral.desc',
      traditionalKey: 'comparison.collateral.traditional',
      deltKey: 'comparison.collateral.delt',
      isHighlight: true,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0A1F35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl text-[#041E42] dark:text-white mb-4">
            {t('comparison.title')} <span className="text-[#1B17FF]">{t('comparison.delt')}</span> {t('comparison.overLoans')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('comparison.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Desktop Table */}
          <div className="hidden md:block bg-white dark:bg-[#0F2744] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-[#0A1F35] dark:to-[#0F2744]">
                  <th className="px-8 py-6 text-left text-lg font-semibold text-[#041E42] dark:text-white">
                    {t('comparison.feature')}
                  </th>
                  <th className="px-8 py-6 text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {t('comparison.traditional')}
                  </th>
                  <th className="px-8 py-6 text-center text-lg font-semibold bg-[#1B17FF]/5 dark:bg-[#1B17FF]/10">
                    <span className="text-[#1B17FF]">{t('comparison.delt.capital')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => {
                  const icons = [Zap, CreditCard, BarChart3, FileText, TrendingDown, Shield];
                  const Icon = icons[index];
                  
                  return (
                    <tr
                      key={index}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#0A1F35]/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B17FF] to-[#5B57FF] flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-[#041E42] dark:text-white font-semibold text-base mb-1">
                              {t(row.featureKey)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {t(row.descriptionKey)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center text-gray-600 dark:text-gray-400">
                        <div className="flex items-center justify-center gap-2">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <span>{t(row.traditionalKey)}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center bg-[#1B17FF]/5 dark:bg-[#1B17FF]/10">
                        <div className="flex items-center justify-center gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-[#041E42] dark:text-white font-semibold">
                            {t(row.deltKey)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-6">
            {comparisonData.map((row, index) => {
              const icons = [Zap, CreditCard, BarChart3, FileText, TrendingDown, Shield];
              const Icon = icons[index];
              
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-[#0F2744] rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-[#0A1F35] dark:to-[#0F2744] px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1B17FF] to-[#5B57FF] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#041E42] dark:text-white">
                          {t(row.featureKey)}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {t(row.descriptionKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{t('comparison.traditional')}</span>
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-500" />
                        <span className="text-gray-600 dark:text-gray-400">{t(row.traditionalKey)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-[#1B17FF]/5 dark:bg-[#1B17FF]/10 rounded-lg p-3">
                      <span className="text-sm font-semibold text-[#1B17FF]">{t('comparison.delt.capital')}</span>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-[#041E42] dark:text-white font-semibold">
                          {t(row.deltKey)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
