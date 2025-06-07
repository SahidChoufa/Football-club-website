import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const translations = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.team': 'Team',
      'nav.matches': 'Matches',
      'nav.news': 'News',
      'nav.gallery': 'Gallery',
      'nav.contact': 'Contact',
      
      // Homepage
      'home.hero.title': 'THUNDER FC',
      'home.hero.subtitle': 'Dominating the field with passion, precision, and unwavering spirit',
      'home.hero.joinButton': 'Join the Thunder',
      'home.hero.pauseVideo': 'Pause Video',
      'home.hero.playVideo': 'Play Video',
      'home.stats.trophies': 'Trophies Won',
      'home.stats.members': 'Squad Members',
      'home.stats.founded': 'Founded',
      'home.stats.rating': 'Fan Rating',
      'home.features.title': 'What Makes Us Thunder',
      'home.features.subtitle': 'Discover the pillars that have built our legacy and continue to drive our success',
      'home.features.championship.title': 'Championship Legacy',
      'home.features.championship.desc': 'Built on decades of excellence and championship victories',
      'home.features.training.title': 'Elite Training',
      'home.features.training.desc': 'State-of-the-art facilities and world-class coaching staff',
      'home.features.community.title': 'Community Spirit',
      'home.features.community.desc': 'Deeply rooted in our community with passionate fan support',
      'home.cta.title': 'Ready to Join the Thunder?',
      'home.cta.subtitle': 'Be part of our journey and experience the thrill of victory',
      'home.cta.button': 'Get Season Tickets',
      
      // Team Page
      'team.title': 'Meet Our Squad',
      'team.subtitle': 'The warriors who bring thunder to the field. Each player brings unique skills, dedication, and the relentless spirit that defines Thunder FC.',
      'team.stats.title': 'Team Statistics',
      'team.stats.subtitle': 'Our collective strength in numbers',
      'team.stats.avgAge': 'Average Age',
      'team.stats.totalGoals': 'Total Goals',
      'team.stats.cleanSheets': 'Clean Sheets',
      'team.stats.winRate': 'Win Rate',
      'team.stats.years': 'years',
      'team.stats.thisSeason': 'this season',
      'team.stats.matches': 'matches',
      'team.stats.overall': 'overall',
      
      // Matches Page
      'matches.title': 'Match Schedule',
      'matches.subtitle': 'Follow Thunder FC\'s journey through the season. From intense rivalries to championship battles, witness every moment of our quest for glory.',
      'matches.played': 'Matches Played',
      'matches.wins': 'Wins',
      'matches.draws': 'Draws',
      'matches.losses': 'Losses',
      'matches.upcoming.title': 'Upcoming Fixtures',
      'matches.upcoming.subtitle': 'Don\'t miss the next Thunder FC matches',
      'matches.recent.title': 'Recent Results',
      'matches.recent.subtitle': 'Latest Thunder FC match outcomes',
      'matches.status.live': 'LIVE',
      'matches.status.upcoming': 'UPCOMING',
      'matches.status.completed': 'FULL TIME',
      'matches.home': 'HOME',
      'matches.getTickets': 'Get Tickets',
      'matches.bookNow': 'Book Now',
      
      // News Page
      'news.title': 'Thunder News',
      'news.subtitle': 'Stay updated with the latest Thunder FC news, match reports, player interviews, and behind-the-scenes insights from your favorite football club.',
      'news.featured': 'Featured Story',
      'news.latest.title': 'Latest Updates',
      'news.latest.subtitle': 'All the latest Thunder FC news and updates',
      'news.readMore': 'Read More',
      'news.readFull': 'Read Full Story',
      'news.newsletter.title': 'Never Miss an Update',
      'news.newsletter.subtitle': 'Subscribe to our newsletter and get the latest Thunder FC news delivered to your inbox',
      'news.newsletter.placeholder': 'Enter your email',
      'news.newsletter.subscribe': 'Subscribe',
      
      // Gallery Page
      'gallery.title': 'Media Gallery',
      'gallery.subtitle': 'Relive the most memorable moments of Thunder FC. From spectacular goals to championship celebrations, explore our visual journey.',
      'gallery.filter.all': 'All Media',
      'gallery.filter.matches': 'Matches',
      'gallery.filter.training': 'Training',
      'gallery.filter.highlights': 'Highlights',
      'gallery.filter.stadium': 'Stadium',
      
      // Contact Page
      'contact.title': 'Get In Touch',
      'contact.subtitle': 'Connect with Thunder FC. Whether you\'re a fan, sponsor, or media representative, we\'d love to hear from you. Reach out and be part of our community.',
      'contact.form.title': 'Send us a Message',
      'contact.form.firstName': 'First Name',
      'contact.form.lastName': 'Last Name',
      'contact.form.email': 'Email',
      'contact.form.subject': 'Subject',
      'contact.form.message': 'Message',
      'contact.form.messagePlaceholder': 'Tell us how we can help you...',
      'contact.form.send': 'Send Message',
      'contact.info.title': 'Contact Information',
      'contact.info.subtitle': 'We\'re here to help and answer any questions you might have. We look forward to hearing from you and welcoming you to the Thunder FC family.',
      'contact.info.phone': 'Phone',
      'contact.info.email': 'Email',
      'contact.info.address': 'Stadium Address',
      'contact.info.hours': 'Office Hours',
      'contact.info.phoneNumber': '+1 (555) 123-4567',
      'contact.info.emailAddress': 'info@thunderfc.com',
      'contact.info.stadiumAddress': '123 Thunder Stadium, Sports City',
      'contact.info.officeHours': 'Mon-Fri: 9AM-6PM',
      'contact.follow': 'Follow Us',
      'contact.map.title': 'Thunder Stadium',
      'contact.map.subtitle': 'Interactive map coming soon',
      
      // Form Options
      'form.subject.general': 'General Inquiry',
      'form.subject.tickets': 'Ticket Information',
      'form.subject.sponsorship': 'Sponsorship',
      'form.subject.media': 'Media Request',
      'form.subject.fanClub': 'Fan Club',
      'form.subject.select': 'Select a subject',
      
      // Player Positions
      'position.striker': 'Striker',
      'position.goalkeeper': 'Goalkeeper',
      'position.midfielder': 'Midfielder',
      'position.defender': 'Defender',
      'position.winger': 'Winger',
      
      // Common
      'common.readTime': 'min read',
      'common.goals': 'Goals',
      'common.assists': 'Assists',
      'common.appearances': 'Appearances'
    },
    fr: {
      // Navigation
      'nav.home': 'Accueil',
      'nav.team': 'Équipe',
      'nav.matches': 'Matchs',
      'nav.news': 'Actualités',
      'nav.gallery': 'Galerie',
      'nav.contact': 'Contact',
      
      // Homepage
      'home.hero.title': 'THUNDER FC',
      'home.hero.subtitle': 'Dominer le terrain avec passion, précision et esprit inébranlable',
      'home.hero.joinButton': 'Rejoignez le Thunder',
      'home.hero.pauseVideo': 'Pause Vidéo',
      'home.hero.playVideo': 'Lire Vidéo',
      'home.stats.trophies': 'Trophées Gagnés',
      'home.stats.members': 'Membres de l\'Équipe',
      'home.stats.founded': 'Fondé',
      'home.stats.rating': 'Note des Fans',
      'home.features.title': 'Ce qui fait notre Thunder',
      'home.features.subtitle': 'Découvrez les piliers qui ont bâti notre héritage et continuent de stimuler notre succès',
      'home.features.championship.title': 'Héritage de Champion',
      'home.features.championship.desc': 'Construit sur des décennies d\'excellence et de victoires en championnat',
      'home.features.training.title': 'Entraînement d\'Élite',
      'home.features.training.desc': 'Installations de pointe et personnel d\'entraînement de classe mondiale',
      'home.features.community.title': 'Esprit Communautaire',
      'home.features.community.desc': 'Profondément enraciné dans notre communauté avec un soutien passionné des fans',
      'home.cta.title': 'Prêt à rejoindre le Thunder?',
      'home.cta.subtitle': 'Faites partie de notre voyage et vivez le frisson de la victoire',
      'home.cta.button': 'Obtenir des Billets de Saison',
      
      // Team Page
      'team.title': 'Rencontrez notre Équipe',
      'team.subtitle': 'Les guerriers qui apportent le tonnerre sur le terrain. Chaque joueur apporte des compétences uniques, du dévouement et l\'esprit implacable qui définit Thunder FC.',
      'team.stats.title': 'Statistiques de l\'Équipe',
      'team.stats.subtitle': 'Notre force collective en chiffres',
      'team.stats.avgAge': 'Âge Moyen',
      'team.stats.totalGoals': 'Total des Buts',
      'team.stats.cleanSheets': 'Matchs sans Encaisser',
      'team.stats.winRate': 'Taux de Victoire',
      'team.stats.years': 'ans',
      'team.stats.thisSeason': 'cette saison',
      'team.stats.matches': 'matchs',
      'team.stats.overall': 'global',
      
      // Matches Page
      'matches.title': 'Calendrier des Matchs',
      'matches.subtitle': 'Suivez le parcours de Thunder FC à travers la saison. Des rivalités intenses aux batailles de championnat, assistez à chaque moment de notre quête de gloire.',
      'matches.played': 'Matchs Joués',
      'matches.wins': 'Victoires',
      'matches.draws': 'Nuls',
      'matches.losses': 'Défaites',
      'matches.upcoming.title': 'Prochains Matchs',
      'matches.upcoming.subtitle': 'Ne manquez pas les prochains matchs de Thunder FC',
      'matches.recent.title': 'Résultats Récents',
      'matches.recent.subtitle': 'Derniers résultats des matchs de Thunder FC',
      'matches.status.live': 'EN DIRECT',
      'matches.status.upcoming': 'À VENIR',
      'matches.status.completed': 'TEMPS PLEIN',
      'matches.home': 'DOMICILE',
      'matches.getTickets': 'Obtenir des Billets',
      'matches.bookNow': 'Réserver Maintenant',
      
      // News Page
      'news.title': 'Actualités Thunder',
      'news.subtitle': 'Restez informé des dernières nouvelles de Thunder FC, des rapports de match, des interviews de joueurs et des aperçus en coulisses de votre club de football préféré.',
      'news.featured': 'Article Vedette',
      'news.latest.title': 'Dernières Mises à Jour',
      'news.latest.subtitle': 'Toutes les dernières nouvelles et mises à jour de Thunder FC',
      'news.readMore': 'Lire Plus',
      'news.readFull': 'Lire l\'Article Complet',
      'news.newsletter.title': 'Ne Manquez Jamais une Mise à Jour',
      'news.newsletter.subtitle': 'Abonnez-vous à notre newsletter et recevez les dernières nouvelles de Thunder FC dans votre boîte de réception',
      'news.newsletter.placeholder': 'Entrez votre email',
      'news.newsletter.subscribe': 'S\'abonner',
      
      // Gallery Page
      'gallery.title': 'Galerie Média',
      'gallery.subtitle': 'Revivez les moments les plus mémorables de Thunder FC. Des buts spectaculaires aux célébrations de championnat, explorez notre voyage visuel.',
      'gallery.filter.all': 'Tous les Médias',
      'gallery.filter.matches': 'Matchs',
      'gallery.filter.training': 'Entraînement',
      'gallery.filter.highlights': 'Moments Forts',
      'gallery.filter.stadium': 'Stade',
      
      // Contact Page
      'contact.title': 'Contactez-nous',
      'contact.subtitle': 'Connectez-vous avec Thunder FC. Que vous soyez un fan, un sponsor ou un représentant des médias, nous aimerions avoir de vos nouvelles. Contactez-nous et faites partie de notre communauté.',
      'contact.form.title': 'Envoyez-nous un Message',
      'contact.form.firstName': 'Prénom',
      'contact.form.lastName': 'Nom',
      'contact.form.email': 'Email',
      'contact.form.subject': 'Sujet',
      'contact.form.message': 'Message',
      'contact.form.messagePlaceholder': 'Dites-nous comment nous pouvons vous aider...',
      'contact.form.send': 'Envoyer le Message',
      'contact.info.title': 'Informations de Contact',
      'contact.info.subtitle': 'Nous sommes là pour vous aider et répondre à toutes vos questions. Nous avons hâte d\'avoir de vos nouvelles et de vous accueillir dans la famille Thunder FC.',
      'contact.info.phone': 'Téléphone',
      'contact.info.email': 'Email',
      'contact.info.address': 'Adresse du Stade',
      'contact.info.hours': 'Heures de Bureau',
      'contact.info.phoneNumber': '+1 (555) 123-4567',
      'contact.info.emailAddress': 'info@thunderfc.com',
      'contact.info.stadiumAddress': '123 Thunder Stadium, Sports City',
      'contact.info.officeHours': 'Lun-Ven: 9h-18h',
      'contact.follow': 'Suivez-nous',
      'contact.map.title': 'Stade Thunder',
      'contact.map.subtitle': 'Carte interactive bientôt disponible',
      
      // Form Options
      'form.subject.general': 'Demande Générale',
      'form.subject.tickets': 'Information sur les Billets',
      'form.subject.sponsorship': 'Parrainage',
      'form.subject.media': 'Demande Média',
      'form.subject.fanClub': 'Club de Fans',
      'form.subject.select': 'Sélectionnez un sujet',
      
      // Player Positions
      'position.striker': 'Attaquant',
      'position.goalkeeper': 'Gardien de But',
      'position.midfielder': 'Milieu de Terrain',
      'position.defender': 'Défenseur',
      'position.winger': 'Ailier',
      
      // Common
      'common.readTime': 'min de lecture',
      'common.goals': 'Buts',
      'common.assists': 'Passes Décisives',
      'common.appearances': 'Apparitions'
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};