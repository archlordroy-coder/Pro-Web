# Spécification de référence — ETS Pro-Informatique

Les deux planches fournies par l’utilisateur constituent la **spécification visuelle prioritaire**. La refonte reprend leur structure d’information, leurs proportions, leur hiérarchie, leur sobriété et leur logique catalogue, tout en remplaçant les marques, produits et contenus de démonstration par ceux d’ETS Pro-Informatique. La référence ne doit pas être diluée par les anciens rubans d’atelier, découpes angulaires ou compositions éditoriales.

## Référence web — catalogue professionnel

Le site web adopte une base blanc cassé et gris très clair, structurée par un liseré bleu nuit supérieur, un en-tête blanc fonctionnel et une navigation bleue horizontale. Le logo officiel ETS Pro-Informatique est placé à gauche ; un champ de recherche de services, des raccourcis Contact et Devis, puis l’accès WhatsApp structurent la zone supérieure. Le contenu est présenté comme un catalogue : carte héro avec promesse directe, familles de services illustrées, listes avec filtres à gauche, cartes en colonnes régulières et fiches de service à information dense à droite.

Les titres, repères de catégorie, boutons, tableaux d’information et blocs d’avantages reprennent une grille rigoureuse proche de la planche web : bleu confiance, gris ardoise, blanc, bleu clair et un vert ETS réservé aux statuts et confirmations. La police passe à **Montserrat** pour restituer le rythme géométrique de la référence. Les bords sont discrets, les ombres légères, les cartes peu arrondies et les espaces clairement cadencés.

## Référence mobile — application de services claire

L’application Flutter reprend le parcours mobile de la planche : un bandeau bleu de bienvenue, recherche, panneaux d’accès rapide, carte promotionnelle d’information, catégories et barre de navigation basse fixe. Le mot « produit » est remplacé par **service** et le panier devient **Mon devis**. La fiche détail met en avant une image, la description du service, les bénéfices, les formats possibles et un grand bouton WhatsApp. La page de confirmation devient une confirmation de demande de devis, et le profil garde les réglages d’ambiance déjà livrés.

Le design mobile abandonne les mécaniques de missions et de récompenses de la précédente itération au profit d’un catalogue professionnel lisible : en-têtes bleus, surfaces blanches, typographie sobre, cartes de service verticales, icônes fines, boutons bleus très visibles et navigation en cinq repères. Les sons, vibrations et ambiances sont maintenus dans les réglages, sans perturber le parcours principal.

## Règle de prix et conversion

ETS Pro-Informatique ne publie **aucun prix fixe** dans l’interface. Chaque emplacement de tarif est remplacé par l’un des libellés suivants, selon le contexte :

| Contexte | Libellé retenu |
| --- | --- |
| Carte catalogue | **Tarif à discuter** |
| Fiche de service | **Prix selon format, quantité et finition** |
| Action principale | **Demander un devis sur WhatsApp** |
| Information de réassurance | **Tarif discuté avec l’équipe via WhatsApp ou directement à l’atelier** |

Les actions de conversion ne simulent ni panier ni paiement. Elles construisent un message WhatsApp contextualisé avec le nom du service, puis encouragent si besoin une visite à BP 1313, descente Akwa, Bafoussam.

## Composants structurants

| Surface | Web | Mobile |
| --- | --- | --- |
| En-tête | Barre utilitaire bleu nuit, logo, recherche, contact, devis, navigation bleue | Bandeau bleu, salutation, recherche et notification |
| Catalogue | Filtres latéraux, grille de cartes, accès fiche détail | Liste verticale de services, filtres et raccourcis |
| Fiche service | Visuel, détails, options, disponibilités et appel WhatsApp | Image, information condensée, bénéfices et bouton devis |
| Devis | Formulaire et résumé sans prix, redirection WhatsApp | Parcours de demande, confirmation et WhatsApp |
| Réglages | Page dédiée existante, plus sobre | Profil/réglages depuis la barre basse |

## Structure Flutter actuelle des écrans de progression

L’ancienne interface Flutter utilise `AppShell` comme contrôleur de navigation. Son état `index` sélectionne l’une des quatre vues : accueil, services, devis et réglages. Chaque passage de navigation déclenche le signal discret défini dans `SoundController`, puis remplace la page dans un `AnimatedSwitcher`.

Le devis est le seul parcours à étapes : `_QuotePageState` conserve `_step`, de `0` à `2`, et rend son contenu avec `_buildStep()`. `_QuoteProgress` dessine les trois repères connectés, tandis que `_QuoteCard` encapsule le titre, l’aide et le contenu de chaque étape. `_next()` valide l’étape courante, déclenche un retour haptique/sonore optionnel et incrémente `_step`. À la dernière étape, `_send()` compose le message WhatsApp. Dans la refonte, cette structure de machine à états est conservée, mais les intitulés et les surfaces seront rendus conformes à la planche mobile : **service → coordonnées → besoin → confirmation de devis**.

## Décisions de style

- Bleu nuit : structure et informations de confiance ; bleu principal : boutons et navigation ; vert ETS : disponibilité, confirmation et statuts.
- Montserrat : titres, navigation, étiquettes et chiffres ; une police système lisible peut compléter les petits textes mobiles.
- Les mouvements sont limités à des transitions de 160 à 260 ms, au fondu et au déplacement très court, avec respect de `prefers-reduced-motion` côté web.
- Les prix n’apparaissent jamais, même à titre indicatif ; l’accès WhatsApp et la visite en atelier deviennent les sorties prioritaires.
