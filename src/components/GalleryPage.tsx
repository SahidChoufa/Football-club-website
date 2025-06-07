import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, X, Image, Video } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const GalleryPage = () => {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const { t } = useLanguage();

  const mediaItems = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
      thumbnail: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
      title: 'Victory Celebration',
      category: 'match'
    },
    {
      id: 2,
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg',
      title: 'Goal Highlights',
      category: 'highlights'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg',
      thumbnail: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg',
      title: 'Team Training',
      category: 'training'
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.pexels.com/photos/186076/pexels-photo-186076.jpeg',
      thumbnail: 'https://images.pexels.com/photos/186076/pexels-photo-186076.jpeg',
      title: 'Stadium Atmosphere',
      category: 'stadium'
    },
    {
      id: 5,
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_2mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/209954/pexels-photo-209954.jpeg',
      title: 'Match Recap',
      category: 'highlights'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg',
      thumbnail: 'https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg',
      title: 'Player Focus',
      category: 'training'
    }
  ];

  const filters = [
    { id: 'all', label: t('gallery.filter.all') },
    { id: 'match', label: t('gallery.filter.matches') },
    { id: 'training', label: t('gallery.filter.training') },
    { id: 'highlights', label: t('gallery.filter.highlights') },
    { id: 'stadium', label: t('gallery.filter.stadium') }
  ];

  const filteredItems = filter === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === filter);

  return (
    <div className="pt-16 min-h-screen bg-slate-900">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('gallery.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filterItem) => (
              <motion.button
                key={filterItem.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(filterItem.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  filter === filterItem.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {filterItem.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedMedia(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                  
                  {/* Media Type Icon */}
                  <div className="absolute top-4 right-4">
                    {item.type === 'video' ? (
                      <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Image className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Play Button for Videos */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.div>
                    </div>
                  )}

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-slate-800 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Media Content */}
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.src}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[80vh]"
                />
              ) : (
                <img
                  src={selectedMedia.src}
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}

              {/* Media Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedMedia.title}</h3>
                <p className="text-gray-400 capitalize">{selectedMedia.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;