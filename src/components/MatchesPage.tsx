import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import MatchCard from './MatchCard';
import { matchesData } from '../data/matchesData';

const MatchesPage = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [upcomingRef, upcomingInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [recentRef, recentInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const { t } = useLanguage();

  const upcomingMatches = matchesData.filter(match => match.status === 'upcoming');
  const recentMatches = matchesData.filter(match => match.status === 'completed');

  return (
    <div className="pt-16 min-h-screen bg-slate-900">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('matches.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('matches.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Season Stats */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: t('matches.played'), value: '28', color: 'text-blue-400' },
              { label: t('matches.wins'), value: '22', color: 'text-green-400' },
              { label: t('matches.draws'), value: '4', color: 'text-yellow-400' },
              { label: t('matches.losses'), value: '2', color: 'text-red-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-700 rounded-lg p-6"
              >
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section ref={upcomingRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={upcomingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">{t('matches.upcoming.title')}</h2>
            <p className="text-gray-400">{t('matches.upcoming.subtitle')}</p>
          </motion.div>

          <div className="grid gap-8">
            {upcomingMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -50 }}
                animate={upcomingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <MatchCard match={match} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Results */}
      <section ref={recentRef} className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={recentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">{t('matches.recent.title')}</h2>
            <p className="text-gray-400">{t('matches.recent.subtitle')}</p>
          </motion.div>

          <div className="grid gap-8">
            {recentMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: 50 }}
                animate={recentInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <MatchCard match={match} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MatchesPage;