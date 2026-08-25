# Validation Vercel — ETS Pro-Informatique

Le journal fourni le 18 août 2026 montrait un échec de build Vercel : le projet était traité comme une application Next.js alors que le dépôt contient une application Vite.

La configuration `vercel.json` ajoute une installation verrouillée avec pnpm, la commande `pnpm build`, le répertoire de sortie `dist/public` et une réécriture SPA vers `/index.html`.

Un projet Vercel `ets-pro-informatique` a été créé et relié au dépôt GitHub `Archlord12345/Pro-Web`, branche `master`. Le déploiement de production associé au commit `9f7a47b` est passé à l’état `READY` et l’URL https://ets-pro-informatique.vercel.app a renvoyé HTTP 200 le 18 août 2026.
