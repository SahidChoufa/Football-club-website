import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Trophy, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: 'upcoming' | 'live' | 'completed';
  isHome: boolean;
}

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { t } = useLanguage();

  const getStatusColor = () => {
    switch (match.status) {
      case 'live':
        return 'bg-red-600';
      case 'upcoming':
        return 'bg-blue-600';
      case 'completed':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusText = () => {
    switch (match.status) {
      case 'live':
        return t('matches.status.live');
      case 'upcoming':
        return t('matches.status.upcoming');
      case 'completed':
        return t('matches.status.completed');
      default:
        return '';
    }
  };

  const getResultColor = () => {
    if (match.status !== 'completed' || match.homeScore === undefined || match.awayScore === undefined) {
      return '';
    }
    
    const isWin = match.isHome 
      ? match.homeScore > match.awayScore 
      : match.awayScore > match.homeScore;
    const isDraw = match.homeScore === match.awayScore;
    
    if (isWin) return 'border-green-500';
    if (isDraw) return 'border-yellow-500';
    return 'border-red-500';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`bg-slate-800 rounded-2xl p-6 border-2 border-slate-700 hover:border-orange-500 transition-all duration-300 ${getResultColor()}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor()}`}>
            {getStatusText()}
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Trophy className="w-4 h-4 mr-1" />
            {match.competition}
          </div>
        </div>
        
        {match.status === 'live' && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center text-red-400 text-sm font-medium"
          >
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2" />
            {t('matches.status.live')}
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        {/* Home Team */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {match.homeTeam.substring(0, 3).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-white font-bold text-lg">{match.homeTeam}</div>
            {match.isHome && (
              <div className="text-orange-400 text-xs font-medium">{t('matches.home')}</div>
            )}
          </div>
        </div>

        {/* Score or VS */}
        <div className="px-6">
          {match.status === 'completed' && match.homeScore !== undefined && match.awayScore !== undefined ? (
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {match.homeScore} - {match.awayScore}
              </div>
            </div>
          ) : (
            <div className="text-2xl font-bold text-gray-400">VS</div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div className="text-right">
            <div className="text-white font-bold text-lg">{match.awayTeam}</div>
            {!match.isHome && (
              <div className="text-orange-400 text-xs font-medium">{t('matches.home')}</div>
            )}
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {match.awayTeam.substring(0, 3).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          {match.date}
        </div>
        <div className="flex items-center text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          {match.time}
        </div>
        <div className="flex items-center text-gray-400">
          <MapPin className="w-4 h-4 mr-2" />
          {match.venue}
        </div>
      </div>

      {match.status === 'upcoming' && (
        <motion.div
          className="mt-4 pt-4 border-t border-slate-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center text-gray-400 text-sm">
              <Users className="w-4 h-4 mr-1" />
              {t('matches.getTickets')}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {t('matches.bookNow')}
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MatchCard;