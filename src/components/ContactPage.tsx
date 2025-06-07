import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [formRef, formInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [infoRef, infoInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.phone'),
      content: t('contact.info.phoneNumber'),
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      content: t('contact.info.emailAddress'),
      color: 'from-green-500 to-green-700'
    },
    {
      icon: MapPin,
      title: t('contact.info.address'),
      content: t('contact.info.stadiumAddress'),
      color: 'from-orange-500 to-orange-700'
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      content: t('contact.info.officeHours'),
      color: 'from-purple-500 to-purple-700'
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-slate-900">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-r from-teal-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-slate-800 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">{t('contact.form.title')}</h2>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">{t('contact.form.firstName')}</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">{t('contact.form.lastName')}</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">{t('contact.form.email')}</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">{t('contact.form.subject')}</label>
                  <motion.select
                    whileFocus={{ scale: 1.02 }}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-colors"
                  >
                    <option value="">{t('form.subject.select')}</option>
                    <option value="general">{t('form.subject.general')}</option>
                    <option value="tickets">{t('form.subject.tickets')}</option>
                    <option value="sponsorship">{t('form.subject.sponsorship')}</option>
                    <option value="media">{t('form.subject.media')}</option>
                    <option value="fan-club">{t('form.subject.fanClub')}</option>
                  </motion.select>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">{t('contact.form.message')}</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>{t('contact.form.send')}</span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: 50 }}
            animate={infoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">{t('contact.info.title')}</h2>
              <p className="text-gray-400 leading-relaxed">
                {t('contact.info.subtitle')}
              </p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={infoInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-6 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-colors"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-full flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{info.title}</h3>
                      <p className="text-gray-400">{info.content}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-64 bg-slate-800 rounded-2xl flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">{t('contact.map.title')}</h3>
                <p className="text-gray-400">{t('contact.map.subtitle')}</p>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={infoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-slate-800 rounded-2xl p-6"
            >
              <h3 className="text-white font-bold text-lg mb-4">{t('contact.follow')}</h3>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social, index) => (
                  <motion.button
                    key={social}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-sm hover:shadow-lg transition-shadow"
                  >
                    {social[0]}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;