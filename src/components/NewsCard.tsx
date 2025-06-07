import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

interface NewsCardProps {
  article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { t } = useLanguage();

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'match report':
        return 'bg-green-600';
      case 'transfer':
        return 'bg-blue-600';
      case 'interview':
        return 'bg-purple-600';
      case 'training':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <motion.article
      whileHover={{ y: -10 }}
      className="bg-slate-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-700/60 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-white text-xs font-bold rounded-full ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
          </div>
          <span>{article.readTime.replace('min read', t('common.readTime'))}</span>
        </div>

        {/* Read More Button */}
        <motion.button
          whileHover={{ x: 5 }}
          className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 font-medium transition-colors group-hover:text-orange-300"
        >
          <span>{t('news.readMore')}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.article>
  );
};

export default NewsCard;