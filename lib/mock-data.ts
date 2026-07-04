// Mock data pour développement et tests
// À remplacer par des appels API réels

import { Product, Service } from './api';

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Laptop Pro',
    description: 'Ordinateur portable haute performance conçu pour les professionnels et les développeurs. Doté d\'un processeur dernière génération, cette machine offre une puissance de calcul exceptionnelle pour toutes vos tâches informatiques complexes.',
    price: 1200000,
    priceDisplay: 'À partir de 1 200 000 FCFA',
    category: 'Ordinateurs',
    imageUrl: '/products/laptop-pro.png',
  },
  {
    id: 'prod-2',
    name: 'Cloud Server',
    description: 'Solution de serveur cloud sécurisée et fiable pour vos données sensibles. Avec une disponibilité garantie de 99.9% et des sauvegardes automatiques, votre infrastructure informatique est entre les mains de vrais experts.',
    price: 5000000,
    priceDisplay: 'À partir de 5 000 000 FCFA',
    category: 'Serveurs',
    imageUrl: '/products/cloud-server.png',
  },
  {
    id: 'prod-3',
    name: 'GPU Gaming',
    description: 'Carte graphique haute performance pour le gaming professionnel et la création de contenu. Avec une mémoire de 8GB GDDR6, cette GPU offre des performances exceptionnelles pour les applications graphiquement intensives.',
    price: 800000,
    priceDisplay: 'À partir de 800 000 FCFA',
    category: 'Composants',
    imageUrl: '/products/gpu-gaming.png',
  },
  {
    id: 'prod-4',
    name: 'RAM Memory',
    description: 'Module mémoire rapide DDR4 pour améliorer les performances de votre système. Compatible avec la plupart des ordinateurs récents, cette RAM offre une vitesse de transfert de 3200 MHz.',
    price: 350000,
    priceDisplay: 'À partir de 350 000 FCFA',
    category: 'Composants',
    imageUrl: '/products/ram-memory.png',
  },
  {
    id: 'prod-5',
    name: 'SSD Storage',
    description: 'Disque dur SSD ultra-rapide avec une capacité de 1TB. Avec une vitesse de lecture jusqu\'à 3500 MB/s, ce disque offre une expérience utilisateur fluide et réactive.',
    price: 600000,
    priceDisplay: 'À partir de 600 000 FCFA',
    category: 'Stockage',
    imageUrl: '/products/ssd-storage.png',
  },
  {
    id: 'prod-6',
    name: 'Network Switch',
    description: 'Commutateur réseau professionnel avec 48 ports Gigabit. Idéal pour les entreprises et les centres de données, ce switch offre une gestion avancée du trafic réseau.',
    price: 450000,
    priceDisplay: 'À partir de 450 000 FCFA',
    category: 'Réseau',
    imageUrl: '/products/network-switch.png',
  },
];

export const mockServices: Service[] = [
  {
    id: 'serv-1',
    title: 'Support Technique',
    description: 'Assistance technique complète 24/7 pour tous vos problèmes informatiques. Notre équipe d\'experts est prête à vous aider rapidement et efficacement pour résoudre tout problème technique.',
    iconCode: 1,
    features: [
      'Support par téléphone et email',
      'Temps de réponse rapide (moins de 2 heures)',
      'Diagnostic gratuit',
      'Support multilingue',
    ],
    category: 'Support',
    priceDisplay: 'À partir de 5 000 FCFA/mois',
  },
  {
    id: 'serv-2',
    title: 'Maintenance Informatique',
    description: 'Service de maintenance préventive pour maintenir votre système informatique en bon état. Nos technicians effectuent des vérifications régulières pour éviter les pannes.',
    iconCode: 2,
    features: [
      'Maintenance mensuelle incluse',
      'Remplacement de composants défectueux',
      'Nettoyage du système',
      'Mise à jour des logiciels',
    ],
    category: 'Maintenance',
    priceDisplay: 'À partir de 10 000 FCFA/mois',
  },
  {
    id: 'serv-3',
    title: 'Sécurité Informatique',
    description: 'Solutions de sécurité avancées pour protéger vos données sensibles contre les cyber-menaces. Nous utilisons les dernières technologies de chiffrement et de protection.',
    iconCode: 3,
    features: [
      'Antivirus professionnel',
      'Pare-feu configuré',
      'Chiffrement des données',
      'Audit de sécurité trimestriel',
    ],
    category: 'Sécurité',
    priceDisplay: 'À partir de 15 000 FCFA/mois',
  },
  {
    id: 'serv-4',
    title: 'Installation & Configuration',
    description: 'Installation professionnelle et configuration complète de vos systèmes informatiques. Nous nous assurons que tout est configuré correctement pour une performance optimale.',
    iconCode: 4,
    features: [
      'Installation du matériel',
      'Configuration du système',
      'Installation des logiciels',
      'Tests de performance',
    ],
    category: 'Installation',
    priceDisplay: 'À partir de 20 000 FCFA',
  },
  {
    id: 'serv-5',
    title: 'Consulting IT',
    description: 'Conseil informatique stratégique pour optimiser votre infrastructure IT. Nos consultants ont une expérience approfondie dans tous les aspects de l\'informatique entreprise.',
    iconCode: 5,
    features: [
      'Audit complète de l\'infrastructure',
      'Plan de mise à jour recommandé',
      'Formation du personnel',
      'Support stratégique continu',
    ],
    category: 'Consulting',
    priceDisplay: 'À partir de 50 000 FCFA',
  },
];
