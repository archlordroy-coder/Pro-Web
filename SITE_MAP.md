# Plan du Site Pro Informatique

## Pages Publiques

### Accueil (/)
- Présentation rapide de l'entreprise
- Section des services populaires
- Section des produits populaires
- Navigation vers les autres pages
- Appels à l'action (Boutons CTA)

### Produits (/products)
- Liste complète des produits
- Grille affichage avec images
- Filtrage par catégorie
- Lien vers détail produit

### Détail Produit (/products/[id])
- Image principale du produit
- Description détaillée
- Prix et disponibilité
- Bouton "Demander un devis"
- Section avis et commentaires
- Formulaire d'ajout d'avis

### Services (/services)
- Liste complète des services
- Grille affichage avec icônes
- Filtrage par catégorie
- Lien vers détail service

### Détail Service (/services/[id])
- Image/illustration du service
- Description détaillée
- Prix et disponibilité
- Formulaire de demande de devis
- Section avis clients
- Formulaire d'ajout d'avis

### Contact (/contact)
- Formulaire de contact complet
  - Nom (obligatoire)
  - Email (obligatoire)
  - Téléphone (optionnel)
  - Sujet (liste déroulante)
  - Message (obligatoire)
- Informations de contact
  - Adresse
  - Téléphone
  - Email
  - Horaires

### À Propos (/about)
- Présentation de l'entreprise
- Historique et statistiques
  - 500+ clients satisfaits
  - 14+ années d'expérience
  - 50+ produits et services
  - 99% satisfaction client
- Valeurs de l'entreprise
  - Innovation
  - Qualité
  - Fiabilité
- Présentation de l'équipe
- Appel à l'action

### Promotions (/promotions)
- Liste des promotions actuelles
- Images et descriptions
- Dates de validité

### Commandes (/orders) [TODO]
- Historique des commandes (connecté)
- Suivi de commande
- Factures

### Utilisateurs (/users) [TODO]
- Profil utilisateur (connecté)
- Historique d'achat
- Adresses de livraison

---

## Pages Admin (Panel d'Administration)

### Page d'Accueil Admin (/admin)
- Dashboard avec statistiques
- Liens rapides vers les pages de gestion
- Notifications récentes
- Utilisateur connecté

### Gestion des Produits (/admin/products)
- **CRUD complet** pour les produits
- Tableau avec recherche et pagination
- Création: Nom, Description, Catégorie, Prix, Image
- Édition de produits existants
- Suppression avec confirmation
- Validation des formulaires

### Gestion des Services (/admin/services)
- **CRUD complet** pour les services
- Tableau avec colonnes importantes
- Création: Titre, Description, Catégorie, Prix
- Édition et suppression
- Tri et filtrage

### Gestion des Cyber-Tickets (/admin/cyber-tickets)
- **CRUD complet** pour les tickets cyber-café
- Tableau avec statut et informations
- Création: Nom client, ID Ordinateur, Durée, Prix
- Suivi des utilisations
- Historique des sessions

### Gestion des Ordinateurs (/admin/computers)
- **CRUD complet** pour les ordinateurs disponibles
- Tableau de disponibilité en temps réel
- Statut: Disponible / Occupé
- Édition de la configuration
- Gestion des réservations

### Gestion des Avis (/admin/reviews)
- **Lecture et suppression** des avis
- Tableau avec colonnes: Auteur, Produit, Note, Commentaire, Date
- Statistiques:
  - Total des avis
  - Note moyenne
  - Avis récents
- Modération des commentaires
- Suppression avec confirmation

### Gestion des Messages de Contact (/admin/contact-messages)
- **Lecture et réponse** aux messages
- Inbox des messages reçus
- Statut: Nouveau / Lus / Répondus
- Affichage détaillé du message
- Formulaire de réponse
- Suppression des messages
- Statistiques:
  - Total messages
  - Messages non lus
  - Messages répondus

### Gestion des Promotions (/admin/promotions)
- **CRUD complet** pour les promotions
- Tableau avec images miniatures
- Création: Titre, Description, Image
- Édition et suppression
- Gestion des dates de validité

### Gestion des Utilisateurs (/admin/users)
- **Lecture et modification** des utilisateurs
- Tableau avec colonnes: Email, Nom, Rôle, Date inscription
- Statistiques:
  - Total utilisateurs
  - Administrateurs
  - Utilisateurs réguliers
- Modification du rôle (User/Admin)
- Suppression de compte
- Historique d'activité

---

## Routes API

### Authentification
- POST /api/auth/login - Connexion
- POST /api/auth/register - Inscription

### Produits
- GET /api/products - Liste tous les produits
- POST /api/products - Créer un produit
- PUT /api/products/[id] - Mettre à jour
- DELETE /api/products/[id] - Supprimer

### Services
- GET /api/services - Liste tous les services
- POST /api/services - Créer
- PUT /api/services/[id] - Mettre à jour
- DELETE /api/services/[id] - Supprimer

### Avis & Commentaires
- GET /api/products/[id]/reviews - Avis d'un produit
- POST /api/products/[id]/reviews - Ajouter avis
- DELETE /api/reviews/[id] - Supprimer avis

### Contact
- POST /api/contact - Envoyer message
- GET /api/contact - Liste messages (admin)

### Cyber-Tickets
- GET /api/cyber-tickets - Liste tickets
- POST /api/cyber-tickets - Créer ticket
- PUT /api/cyber-tickets/[id] - Mettre à jour
- DELETE /api/cyber-tickets/[id] - Supprimer

### Ordinateurs
- GET /api/computers - Liste ordinateurs
- PUT /api/computers/[id] - Mettre à jour statut

### Promotions
- GET /api/promotions - Liste promotions
- POST /api/promotions - Créer
- PUT /api/promotions/[id] - Mettre à jour
- DELETE /api/promotions/[id] - Supprimer

### Utilisateurs
- GET /api/users - Liste utilisateurs (admin)
- DELETE /api/users/[id] - Supprimer utilisateur
- PUT /api/users/[id]/role - Changer rôle

---

## Flux Utilisateur Typique

### Visiteur Non-Connecté
1. Accueil (/)
2. Parcourir produits (/products)
3. Voir détail produit (/products/[id])
4. Lire avis
5. Parcourir services (/services)
6. Voir détail service (/services/[id])
7. Demander un devis
8. Consulter infos (About)
9. Prendre contact (/contact)

### Administrateur
1. Connexion (/admin → AuthGuard)
2. Dashboard admin (/admin)
3. Gérer contenu
   - Produits
   - Services
   - Promotions
4. Gérer opérations
   - Cyber-tickets
   - Ordinateurs
5. Modérer contenu
   - Avis
   - Messages
6. Gérer utilisateurs

---

## Authentification

- **Connexion**: Formulaire avec Email + Mot de passe
- **Persistance**: localStorage avec token JWT
- **Rôles**:
  - `admin` - Accès panel d'administration complet
  - `user` - Utilisateur standard (peut consulter, laisser avis)
- **Protection**: AuthGuard sur les pages admin
- **Déconnexion**: Bouton en haut à droite

---

## Éléments de Design

### Couleurs
- Primaire: #2B2E83 (Bleu professionnel)
- Secondaire: #076633 (Vert)
- Accent: #009FE3 (Cyan)
- Background: #F6F8FC (Gris très clair)
- Surface: #FFFFFF (Blanc)

### Composants Réutilisables
- **PublicHeader** - En-tête avec navigation
- **PublicFooter** - Pied de page
- **HeroSection** - Section titre avec CTA
- **AdminForm** - Formulaires admin
- **AdminTable** - Tableaux de données
- **ReviewsList** - Liste d'avis
- **SearchBar** - Recherche produits
- **Pagination** - Navigation pages
- **Skeleton** - Chargement
- **NotificationContainer** - Notifications toast

---

## Fonctionnalités Clés

✅ Authentification persistent avec localStorage
✅ Système de notations 5 étoiles
✅ Commentaires et avis des clients
✅ Demandes de devis
✅ Formulaire de contact
✅ Gestion des cyber-tickets
✅ Suivi de disponibilité des ordinateurs
✅ Panel d'administration complet
✅ Gestion des promotions
✅ Modération des avis
✅ Réponse aux messages de contact
✅ Gestion des utilisateurs et rôles

---

## Pages à Compléter Prochainement

- [ ] Page Commandes (/orders) - Historique et suivi
- [ ] Page Profil (/users) - Profil utilisateur
- [ ] Dashboard Admin amélioré - Statistiques avancées
- [ ] Export/Rapport Admin - Téléchargement données
- [ ] Emails de confirmation - Notifications
- [ ] Paiement en ligne - Intégration Stripe
- [ ] Panier d'achat - Fonctionnalité shopping
