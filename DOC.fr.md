# BreakFree API Documentation

[EN](DOC.md) | [FR](DOC.fr.md)

## Introduction

BreakFree API est une API RESTful qui permet de gérer divers aspects de la santé mentale et physique des utilisateurs, tels que leurs addictions, émotions, objectifs, informations générales, et motivations. L'API utilise des jetons d'authentification (Bearer Tokens) pour sécuriser l'accès aux routes et garantir que chaque utilisateur interagit uniquement avec ses propres données.

## Table des Matières

- [BreakFree API Documentation](#breakfree-api-documentation)
  - [Introduction](#introduction)
  - [Table des Matières](#table-des-matières)
  - [Prérequis](#prérequis)
  - [Configuration de l'API](#configuration-de-lapi)
  - [Authentification](#authentification)
  - [Documentation Postman](#documentation-postman)
  - [Routes de l'API](#routes-de-lapi)
    - [Auth](#auth)
    - [Addictions](#addictions)
    - [Objectives](#objectives)
    - [Emotions](#emotions)
    - [General Information](#general-information)
    - [Mental Health](#mental-health)
    - [Motivations](#motivations)
  - [Tester avec Postman](#tester-avec-postman)
    - [Importer la Collection:](#importer-la-collection)
    - [Configurer l'Autorisation:](#configurer-lautorisation)
    - [Tester les Routes:](#tester-les-routes)
  - [Remarques Finales](#remarques-finales)

## Prérequis

Avant d'utiliser cette API, assurez-vous d'avoir :

- Node.js et npm installés sur votre machine.
- Un outil pour tester les API, tel que Postman.
- Une instance de l'API BreakFree en cours d'exécution localement ou sur un serveur distant.

## Configuration de l'API

Lire le [README](README.fr.md) du projet pour obtenir des instructions détaillées sur la configuration de l'API, l'installation des dépendances, le démarrage du serveur, et l'utilisation des différentes fonctionnalités.

## Authentification

L'API utilise un système de token JWT pour sécuriser l'accès aux routes. Pour accéder aux routes protégées, vous devez :

1. Créer un compte utilisateur via l'endpoint `register`.
2. Se connecter via l'endpoint `login` pour obtenir un token.
3. Utiliser ce token comme Bearer Token dans les en-têtes de vos requêtes pour accéder aux autres routes.

## Documentation Postman

La documentation complète de l'API est disponible sur Postman et comprend toutes les routes, les paramètres, et les exemples de réponses. Vous pouvez accéder à la documentation via le lien suivant :

[Documentation Postman - BreakFree API](#)

Pour importer la collection dans votre propre Postman :

1. Téléchargez le fichier JSON de la collection depuis le dépôt ou utilisez le lien public fourni ci-dessus.
2. Dans Postman, cliquez sur `Import` et sélectionnez le fichier JSON de la collection.

## Routes de l'API

### Auth

| Méthode | Endpoint                  | Description                    |
|---------|---------------------------|--------------------------------|
| POST    | /api/v1/auth/register     | Inscrire un nouvel utilisateur |
| POST    | /api/v1/auth/login        | Authentifier un utilisateur    |
| POST    | /api/v1/auth/logout       | Déconnecter l'utilisateur      |
| DELETE  | /api/v1/auth/user/delete  | Supprimer le compte de l'utilisateur |

### Addictions

| Méthode | Endpoint                      | Description                    |
|---------|-------------------------------|--------------------------------|
| POST    | /api/v1/addictions/create     | Créer une nouvelle addiction   |
| GET     | /api/v1/addictions/show/:id   | Récupérer une addiction spécifique |
| GET     | /api/v1/addictions/shows      | Lister toutes les addictions   |
| PUT     | /api/v1/addictions/update/:id | Mettre à jour une addiction    |
| DELETE  | /api/v1/addictions/delete/:id | Supprimer une addiction        |

### Objectives

| Méthode | Endpoint                                      | Description                    |
|---------|-----------------------------------------------|--------------------------------|
| POST    | /api/v1/objectives/create/:id                 | Créer un objectif pour une addiction |
| GET     | /api/v1/objectives/shows                      | Lister tous les objectifs      |
| GET     | /api/v1/objectives/show/:id/addiction/:idAddiction | Récupérer un objectif spécifique |
| PUT     | /api/v1/objectives/update/:id/addiction/:idAddiction | Mettre à jour un objectif      |
| DELETE  | /api/v1/objectives/delete/:id/addiction/:idAddiction | Supprimer un objectif          |

### Emotions

| Méthode | Endpoint                      | Description                    |
|---------|-------------------------------|--------------------------------|
| POST    | /api/v1/emotions/create       | Ajouter une nouvelle émotion   |
| GET     | /api/v1/emotions/shows        | Lister toutes les émotions     |
| GET     | /api/v1/emotions/show/:id     | Récupérer une émotion spécifique |
| PUT     | /api/v1/emotions/update/:id   | Mettre à jour une émotion      |
| DELETE  | /api/v1/emotions/delete/:id   | Supprimer une émotion          |

### General Information

| Méthode | Endpoint                      | Description                    |
|---------|-------------------------------|--------------------------------|
| POST    | /api/v1/userInfos/create      | Créer ou mettre à jour des informations personnelles |
| GET     | /api/v1/userInfos/show        | Récupérer les informations personnelles de l'utilisateur |
| PUT     | /api/v1/userInfos/update/:id  | Mettre à jour une information personnelle |
| DELETE  | /api/v1/userInfos/delete/:id  | Supprimer une information personnelle |

### Mental Health

| Méthode | Endpoint                      | Description                    |
|---------|-------------------------------|--------------------------------|
| POST    | /api/v1/mentalHealths/create  | Enregistrer un nouvel état de santé mentale |
| GET     | /api/v1/mentalHealths/shows   | Lister tous les enregistrements de santé mentale |
| GET     | /api/v1/mentalHealths/show/:id| Récupérer un enregistrement spécifique |
| PUT     | /api/v1/mentalHealths/update/:id | Mettre à jour un enregistrement |
| DELETE  | /api/v1/mentalHealths/delete/:id | Supprimer un enregistrement    |

### Motivations

| Méthode | Endpoint                      | Description                    |
|---------|-------------------------------|--------------------------------|
| POST    | /api/v1/motivations/create    | Créer une nouvelle motivation  |
| GET     | /api/v1/motivations/shows     | Lister toutes les motivations  |
| GET     | /api/v1/motivations/show/:id  | Récupérer une motivation spécifique |
| PUT     | /api/v1/motivations/update/:id | Mettre à jour une motivation   |
| DELETE  | /api/v1/motivations/delete/:id | Supprimer une motivation       |

## Tester avec Postman

### Importer la Collection:

1. Téléchargez le fichier JSON de la collection ou utilisez le lien partagé fourni ci-dessus.
2. Importez-le dans Postman en cliquant sur `Import`.

### Configurer l'Autorisation:

1. Sélectionnez la collection BreakFree dans Postman.
2. Allez dans l'onglet `Authorization` et sélectionnez `Bearer Token`.
3. Ajoutez votre token JWT après authentification via `/api/v1/auth/login`.

### Tester les Routes:

1. Testez chaque route en utilisant les paramètres et les corps de requête spécifiés dans la documentation ci-dessus.
2. Vérifiez les réponses attendues pour valider le bon fonctionnement de l'API.

## Remarques Finales

L’API BreakFree est un outil puissant pour gérer et surveiller les aspects personnels de la santé des utilisateurs. Assurez-vous de toujours utiliser un token valide pour accéder aux routes protégées et de tester les fonctionnalités en suivant les directives fournies.
