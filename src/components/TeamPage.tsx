import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';
import PlayerCard from './PlayerCard';
import { playersData } from '../data/playersData';

const TeamPage = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [playersRef, playersInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const { t } = useLanguage();

  return (
    <div className="pt-16 min-h-screen bg-slate-900">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('team.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('team.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Players Grid */}
      <section ref={playersRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {playersData.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 50 }}
                animate={playersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PlayerCard player={player} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats Overview */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">{t('team.stats.title')}</h2>
            <p className="text-gray-400">{t('team.stats.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: t('team.stats.avgAge'), value: '24.5', suffix: t('team.stats.years') },
              { label: t('team.stats.totalGoals'), value: '127', suffix: t('team.stats.thisSeason') },
              { label: t('team.stats.cleanSheets'), value: '18', suffix: t('team.stats.matches') },
              { label: t('team.stats.winRate'), value: '78%', suffix: t('team.stats.overall') }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.suffix}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;