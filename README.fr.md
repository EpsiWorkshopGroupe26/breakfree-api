# BreakFree API

[EN](README.md) | [FR](README.fr.md)

> [!IMPORTANT]  
> C'est un projet en cours de développement. Des fonctionnalités supplémentaires seront ajoutées dans les prochaines versions.

> [!NOTE]
> C'est un projet Etudiant réalisé dans le cadre de la formation de Master Informatique.

## Table des matières

- [BreakFree API](#breakfree-api)
  - [Table des matières](#table-des-matières)
  - [Description](#description)
  - [Fonctionnalités](#fonctionnalités)
  - [Structure du Projet](#structure-du-projet)
  - [Installation](#installation)
  - [Utilisation](#utilisation)
    - [Démarrer le serveur](#démarrer-le-serveur)
    - [Construire le projet](#construire-le-projet)
    - [Commandes AdonisJS](#commandes-adonisjs)
    - [Routes](#routes)
      - [Authentification](#authentification)
      - [Addictions](#addictions)
      - [Informations Générales](#informations-générales)
      - [Émotions](#émotions)
      - [Santé Mentale](#santé-mentale)
      - [Motivations](#motivations)
      - [Objectifs](#objectifs)
    - [Modèles](#modèles)
    - [Services](#services)
    - [Configuration](#configuration)
    - [Base de Données](#base-de-données)
    - [Docker](#docker)
    - [Evolution du Projet](#evolution-du-projet)

## Description

BreakFree est une API construite avec AdonisJS pour gérer les objectifs, motivations, et autres aspects liés à la santé mentale et aux addictions des utilisateurs.

## Fonctionnalités

- **Gestion des motivations**
- **Gestion des objectifs**
- **Gestion des addictions**
- **Gestion des utilisateurs**
- **Authentification et autorisation**
- **Validation des données**
- **Tests unitaires**
- **Documentation de l'API**
- **Docker**
- **CI/CD**
- **Monitoring**
- **Logging**
- **Sécurité**
- **Performance**
- **Scalabilité**
- **Extensibilité**
- **Maintenance**
- **Support**


## Structure du Projet

Le projet est organisé comme suit :

```
api/
├── .editorconfig
├── .env
├── .env.example
├── .gitignore
├── ace.js
├── adonisrc.ts
├── app/
│   ├── controllers/
│   ├── exceptions/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   └── validators/
├── bin/
│   └── console.ts
├── server.ts
├── test.ts
├── config/
│   ├── app.ts
│   ├── auth.ts
│   ├── bodyparser.ts
│   ├── cors.ts
│   ├── database.ts
│   ├── hash.ts
│   ├── logger.ts
├── database/
│   ├── factories/
│   └── migrations/
├── dockerfile
├── eslint.config.js
├── package.json
├── start/
├── tests/
├── tsconfig.json
├── docker-compose.yml
└── mcd/
    ├── breakfree.lo1
    ├── breakfree.loo
    └── createDatabaseBreakfree.sql
```

## Installation

1. Clonez le dépôt :
```sh
git clone 
cd api
```

2. Installez les dépendances :
```sh
npm install
```

3. Configurez les variables d'environnement :
    Copiez le fichier `.env.example` en `.env` et modifiez les valeurs selon vos besoins.

```sh
cp .env.example .env
```

## Utilisation

### Démarrer le serveur

Pour démarrer le serveur en mode développement, utilisez la commande suivante :

```sh
node ace serve --watch
```

### Construire le projet

Pour construire le projet, utilisez la commande suivante :

```sh
node ace build
cd build
npm ci --production
node bin/server.js
```

### Commandes AdonisJS

Le fichier `api/bin/console.ts` est le point d'entrée pour les commandes Ace d'AdonisJS. Vous pouvez exécuter des commandes en utilisant :
```sh
node ace <command>
```

### Routes

Les routes de l'API sont définies dans le fichier `api/start/routes.ts`. Voici quelques exemples de routes disponibles :

#### Authentification

- `POST /api/v1/auth/register` - **Enregistrer un nouvel utilisateur**
- `POST /api/v1/auth/login` - **Connecter un utilisateur existant**
- `POST /api/v1/auth/logout` - **Déconnecter l'utilisateur connecté** (nécessite une authentification)
- `DELETE /api/v1/auth/user/delete` - **Supprimer le compte de l'utilisateur connecté** (nécessite une authentification)

#### Addictions

- `GET /api/v1/addictions/shows` - **Récupérer toutes les addictions** (nécessite une authentification)
- `GET /api/v1/addictions/show/:id` - **Récupérer une addiction par ID** (nécessite une authentification)
- `POST /api/v1/addictions/create` - **Créer une nouvelle addiction** (nécessite une authentification)
- `PUT /api/v1/addictions/update/:id` - **Mettre à jour une addiction par ID** (nécessite une authentification)
- `DELETE /api/v1/addictions/delete/:id` - **Supprimer une addiction par ID** (nécessite une authentification)

#### Informations Générales

- `GET /api/v1/userInfos/show` - **Récupérer les informations de l'utilisateur connecté** (nécessite une authentification)
- `POST /api/v1/userInfos/create` - **Créer des informations pour l'utilisateur connecté** (nécessite une authentification)
- `PUT /api/v1/userInfos/update/:id` - **Mettre à jour les informations de l'utilisateur connecté** (nécessite une authentification)
- `DELETE /api/v1/userInfos/delete/:id` - **Supprimer les informations de l'utilisateur connecté** (nécessite une authentification)

#### Émotions

- `GET /api/v1/emotions/shows` - **Récupérer toutes les émotions** (nécessite une authentification)
- `GET /api/v1/emotions/show/:id` - **Récupérer une émotion par ID** (nécessite une authentification)
- `POST /api/v1/emotions/create` - **Créer une nouvelle émotion** (nécessite une authentification)
- `PUT /api/v1/emotions/update/:id` - **Mettre à jour une émotion par ID** (nécessite une authentification)
- `DELETE /api/v1/emotions/delete/:id` - **Supprimer une émotion par ID** (nécessite une authentification)

#### Santé Mentale

- `GET /api/v1/mentalHealths/shows` - **Récupérer toutes les informations de santé mentale** (nécessite une authentification)
- `GET /api/v1/mentalHealths/show/:id` - **Récupérer une information de santé mentale par ID** (nécessite une authentification)
- `POST /api/v1/mentalHealths/create` - **Créer une nouvelle information de santé mentale** (nécessite une authentification)
- `PUT /api/v1/mentalHealths/update/:id` - **Mettre à jour une information de santé mentale par ID** (nécessite une authentification)
- `DELETE /api/v1/mentalHealths/delete/:id` - **Supprimer une information de santé mentale par ID** (nécessite une authentification)

#### Motivations

- `GET /api/v1/motivations/shows` - **Récupérer toutes les motivations** (nécessite une authentification)
- `GET /api/v1/motivations/show/:id` - **Récupérer une motivation par ID** (nécessite une authentification)
- `POST /api/v1/motivations/create` - **Créer une nouvelle motivation** (nécessite une authentification)
- `PUT /api/v1/motivations/update/:id` - **Mettre à jour une motivation par ID** (nécessite une authentification)
- `DELETE /api/v1/motivations/delete/:id` - **Supprimer une motivation par ID** (nécessite une authentification)

#### Objectifs

- `GET /api/v1/objectives/shows` - **Récupérer tous les objectifs** (nécessite une authentification)
- `GET /api/v1/objectives/show/:id/addiction/:idAddiction` - **Récupérer un objectif spécifique** (nécessite une authentification)
- `POST /api/v1/objectives/create/:id` - **Créer un nouvel objectif** (nécessite une authentification)
- `PUT /api/v1/objectives/update/:id/addiction/:idAddiction` - **Mettre à jour un objectif spécifique** (nécessite une authentification)
- `DELETE /api/v1/objectives/delete/:id/addiction/:idAddiction` - **Supprimer un objectif spécifique** (nécessite une authentification)

### Modèles

Les modèles sont définis dans le dossier `api/app/models`. Par exemple, le modèle Objective est défini dans `api/app/models/objective.ts`.

### Services

Les services sont définis dans le dossier `api/app/services`. Par exemple, le service ObjectiveService est défini dans `api/app/services/objectives_service.ts`.

### Configuration

Les fichiers de configuration sont situés dans le dossier `api/config`. Par exemple, la configuration de l'application est définie dans `api/config/app.ts`.

### Base de Données

Les scripts de création de la base de données sont situés dans le dossier `mcd`. Par exemple, le script de création de la base de données BreakFree est défini dans `mcd/createDatabaseBreakfree.sql`.

### Docker

Un fichier `Dockerfile` est fourni pour créer une image Docker de l'application. Vous pouvez construire et exécuter le conteneur Docker en utilisant les commandes suivantes :
```sh
docker build -t breakfree-api .
docker run -p 3333:3333 breakfree-api
```

### Evolution du Projet

Pour suivre l'évolution du projet, veuillez consulter le Release.

