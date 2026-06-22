# Faire-Part de Mariage Cinématique & Atelier des Mariés

Une application web moderne, élégante et interactive conçue pour célébrer et organiser l'invitation au mariage dans un style provençal raffiné (tons crème, or et olive). Le site propose un faire-part immersif pour les invités et un tableau de bord d'administration complet pour les mariés.

---

## Galerie et Captures d'Écran

### L'Expérience d'Ouverture de l'Enveloppe
![Ouverture de l'Enveloppe](/public/screenshots/envelope.png)
*L'enveloppe scellée avec de la cire dorée s'ouvre avec une animation fluide pour révéler le faire-part personnalisé.*

### Le Faire-Part de Mariage (Aperçu Bureau)
![Faire-part Provençal](/public/screenshots/faire-part.png)
*Un design épuré, des polices de caractères premium, et une palette harmonieuse aux accents provençaux.*

### L'Atelier d'Administration
![Atelier Admin](/public/screenshots/admin.png)
*L'interface d'administration sécurisée permettant de gérer la playlist, de modérer le livre d'or et de suivre les RSVP.*

### Générateur de Code QR & Cartes PDF
![Code QR Invitation](/screenshots/qrcode.png)
*Génération et export PDF haute fidélité de cartes d'invitation avec code QR et monogramme.*

---

## Fonctionnalités Clés

### Côté Invités
- **Ouverture interactive :** Saisie du nom de l'invité sur une enveloppe animée en 3D/CSS avec cachet de cire.
- **Formulaire de RSVP :** Confirmation de présence, nombre d'accompagnants, choix du menu traiteur (Classique, Végétarien, Enfant), restrictions alimentaires et option de navette.
- **Livre d'Or interactif :** Envoi de vœux avec choix de timbres botaniques ou traditionnels.
- **Playlist Collective :** Proposition de morceaux de musique et vote en temps réel pour composer la playlist de la soirée de danse.
- **Carnet de Route de Provence :** Recommandations d'hébergements, vols, trains et adresses locales incontournables.

### Côté Mariés (Atelier d'Administration)
- **Accès Sécurisé :** Authentification simple via phrase de passe.
- **Paramètres Généraux :** Modification en temps réel des noms, dates, lieux et citation éditoriale du site.
- **Suivi des RSVP :** Tableau récapitulatif détaillé avec décompte automatique du nombre d'invités présents et de leurs choix.
- **Gestion de Contenu :** Édition de la frise chronologique du programme, des chapitres de l'histoire du couple, des photos de la galerie et des nuances du code couleur.
- **Générateur de QR Code :** Outil de création de cartes d'invitation premium imprimables ou exportables au format PDF pour envoi aux invités.

---

## Pile Technique

- **Framework :** [Next.js 16 (App Router)](https://nextjs.org/) utilisant le compilateur Turbopack.
- **Bibliothèque UI :** [React 19](https://react.dev/) et [Tailwind CSS v4](https://tailwindcss.com/).
- **Base de Données & ORM :** [Neon (PostgreSQL Serverless)](https://neon.tech/) avec l'ORM [Drizzle](https://orm.drizzle.team/).
- **Stockage de Fichiers :** [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob) pour la galerie de photos.
- **Animations :** Motion.

---

## Variables d'Environnement

Créez un fichier `.env` à la racine du projet contenant :

```env
DATABASE_URL="votre_lien_de_connexion_postgresql"
BLOB_READ_WRITE_TOKEN="votre_token_vercel_blob"
ATELIER_PASSPHRASE="mot_de_passe_de_l_administration"
NEXT_PUBLIC_URL="http://localhost:3000"
```

---

## Démarrage Rapide

### 1. Installation des Dépendances
```bash
npm install
```

### 2. Configuration et Remplissage de la Base de Données
Poussez le schéma de base de données vers Neon :
```bash
npm run db:push
```

Alimentez la base de données avec les données initiales configurées en français :
```bash
npm run db:seed
```

### 3. Lancer le Serveur de Développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour visualiser le site.

### 4. Compilation pour la Production
Pour compiler et optimiser l'application pour le déploiement :
```bash
npm run build
```
Le projet compilera les pages dynamiques (`/`, `/rsvp`, etc.) en mode de rendu serveur à la demande (`force-dynamic`) pour garantir l'actualisation en temps réel des votes et RSVP.
