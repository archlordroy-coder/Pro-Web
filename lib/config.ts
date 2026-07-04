/**
 * Configuration centralisée du projet
 */

export const config = {
  // API
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.proinformatique.dev',
    timeout: 30000, // 30 secondes
  },

  // Cache
  cache: {
    enabled: true,
    duration: 5 * 60 * 1000, // 5 minutes
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 50,
  },

  // Notifications
  notifications: {
    defaultDuration: 5000, // 5 secondes
    maxDuration: 15000, // 15 secondes
  },

  // Authentification
  auth: {
    storageKeys: {
      user: 'auth_user',
      token: 'auth_token',
    },
  },

  // Validation
  validation: {
    minPasswordLength: 6,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },

  // Recherche
  search: {
    debounceMs: 300,
    minChars: 1,
  },

  // UI
  ui: {
    borderRadius: 'rounded-xl',
    animationDuration: '300ms',
    toastPosition: 'top-right',
  },
} as const;

/**
 * Messages standards
 */
export const messages = {
  errors: {
    invalidEmail: 'Email invalide',
    passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
    requiredField: 'Ce champ est requis',
    loadingFailed: 'Erreur lors du chargement des données',
    savingFailed: 'Erreur lors de la sauvegarde',
    deletingFailed: 'Erreur lors de la suppression',
    networkError: 'Erreur de connexion réseau',
    unexpectedError: 'Une erreur inconnue s\'est produite',
  },
  success: {
    loggedIn: 'Connecté avec succès',
    loggedOut: 'Déconnecté avec succès',
    created: 'Créé avec succès',
    updated: 'Mis à jour avec succès',
    deleted: 'Supprimé avec succès',
    saved: 'Sauvegardé avec succès',
  },
  confirmations: {
    deleteItem: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
    discardChanges: 'Vous avez des modifications non enregistrées. Les ignorer ?',
    logout: 'Êtes-vous sûr de vouloir vous déconnecter ?',
  },
  placeholders: {
    email: 'votre@email.com',
    password: 'Minimum 6 caractères',
    search: 'Rechercher...',
    name: 'Entrer le nom',
    description: 'Entrer la description',
  },
} as const;

/**
 * Routes
 */
export const routes = {
  public: {
    home: '/',
    services: '/services',
    products: '/products',
    promotions: '/promotions',
  },
  admin: {
    dashboard: '/admin',
    products: '/admin/products',
    services: '/admin/services',
    users: '/users',
    orders: '/orders',
  },
} as const;
