# Application Web

## Installation

Pour installer les dépendances de l'application, vous devez exécuter la commande suivante.

```bash
npm install
```

_**Note :**_ Vous devez avoir Node.js installé sur votre système pour pouvoir exécuter cette commande.

## Utilisation

Afin de pouvoir développer, vous devez générer les fichiers liés à l'API. Pour ce faire, vous devez exécuter la commande suivante.

```bash
npm run gen:queries
```

Ensuite, vous pouvez démarrer le serveur de mock pour le développement sans backend. Pour ce faire, vous devez exécuter la commande suivante.

```bash
npm run mock
```

Pour finir, pour lancer le serveur développement, vous devez exécuter la commande suivante qui démarre le serveur de développement sur le port 5173.

```bash
npm run dev
```

Ensuite, vous pouvez accéder à l'application en ouvrant votre navigateur et en accédant à l'adresse suivante : [https://localhost:5173](https://localhost:5173)

## Développement

### Librairies

L'application se base sur plusieurs librairies pour son bon fonctionnement. Voici une liste des librairies utilisées :

- [React](https://react.dev) : La librairie principale de l'application.
- [Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/overview) : La librairie de routage de l'application.
- [Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview) : Librairie permettant de gérer les requêtes HTTP et autres de l'application.
- [Zod](https://zod.dev/) : Validation des données pendant le fonctionnement de l'application.
- [Tailwind CSS](https://tailwindcss.com) : Styling pour le CSS.
- [shadcn/ui](https://ui.shadcn.com/) : Les composants primaires de l'application.
- [lucid-react](https://lucide.dev/icons/) : La librairie d'icônes.

### Structure

L'application est structurée de la manière suivante depuis le dossier `src` :

- `components` : Les différents composants de l'application
- `hooks` : Les hooks personnalisés de l'application.
- `stores`: Les stores de l'application.
- `routes` : Les pages de l'application.
- `lib` : Les utilitaires de l'application.
