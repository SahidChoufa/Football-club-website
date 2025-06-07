import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Calendar, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  age: number;
  nationality: string;
  goals: number;
  assists: number;
  appearances: number;
  image: string;
}

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useLanguage();

  const getTranslatedPosition = (position: string) => {
    const positionKey = `position.${position.toLowerCase()}`;
    return t(positionKey);
  };

  return (
    <motion.div
      className="relative h-96 w-full cursor-pointer"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      whileHover={{ scale: 1.05 }}
    >
      <AnimatePresence>
        {!isFlipped ? (
          <motion.div
            key="front"
            initial={{ rotateY: 0 }}
            exit={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full backface-hidden"
          >
            <div className="relative h-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl overflow-hidden shadow-xl">
              {/* Player Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent" />
                
                {/* Jersey Number */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-orange-600 text-white font-bold text-xl rounded-full flex items-center justify-center">
                  {player.number}
                </div>
              </div>

              {/* Player Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{player.name}</h3>
                <p className="text-orange-400 font-medium mb-4">{getTranslatedPosition(player.position)}</p>
                
                <div className="flex items-center text-gray-300 text-sm space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{player.age}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{player.nationality}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ rotateY: -180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="h-full bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">{player.name}</h3>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-orange-100">{t('common.goals')}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((player.goals / 20) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="font-bold text-white">{player.goals}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-orange-100">{t('common.assists')}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((player.assists / 15) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="font-bold text-white">{player.assists}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-orange-100">{t('common.appearances')}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((player.appearances / 30) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="font-bold text-white">{player.appearances}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-orange-100 text-sm">
                  "Dedicated to bringing thunder to every match and leading by example on and off the field."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlayerCard;