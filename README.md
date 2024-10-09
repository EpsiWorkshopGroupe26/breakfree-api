# BreakFree API

[EN](README.md) | [FR](README.fr.md)

> [!IMPORTANT]  
> This is a project under development. Additional features will be added in future versions.

> [!NOTE]
> This is a student project carried out as part of the Master's degree in Computer Science.

## Table of Contents

- [BreakFree API](#breakfree-api)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Start the Server](#start-the-server)
    - [Build the Project](#build-the-project)
    - [AdonisJS Commands](#adonisjs-commands)
    - [Routes](#routes)
      - [Authentication](#authentication)
      - [Addictions](#addictions)
      - [General Information](#general-information)
      - [Emotions](#emotions)
      - [Mental Health](#mental-health)
      - [Motivations](#motivations)
      - [Objectives](#objectives)
    - [Models](#models)
    - [Services](#services)
    - [Configuration](#configuration)
    - [Database](#database)
    - [Docker](#docker)
    - [Project Evolution](#project-evolution)

## Description

BreakFree is an API built with AdonisJS to manage goals, motivations, and other aspects related to users' mental health and addictions.

## Features

- **Motivation Management**
- **Goal Management**
- **Addiction Management**
- **User Management**
- **Authentication and Authorization**
- **Data Validation**
- **Unit Testing**
- **API Documentation**
- **Docker**
- **CI/CD**
- **Monitoring**
- **Logging**
- **Security**
- **Performance**
- **Scalability**
- **Extensibility**
- **Maintenance**
- **Support**

## Project Structure

The project is organized as follows:

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

1. Clone the repository:
```sh
git clone 
cd api
```

2. Install dependencies:
```sh
npm install
```

3. Configure environment variables:
        Copy the `.env.example` file to `.env` and modify the values as needed.

```sh
cp .env.example .env
```

## Usage

### Start the Server

To start the server in development mode, use the following command:

```sh
node ace serve --watch
```

### Build the Project

To build the project, use the following command:

```sh
node ace build
cd build
npm ci --production
node bin/server.js
```

### AdonisJS Commands

The `api/bin/console.ts` file is the entry point for AdonisJS Ace commands. You can run commands using:
```sh
node ace <command>
```

### Routes

The API routes are defined in the `api/start/routes.ts` file. Here are some examples of available routes:

#### Authentication

- `POST /api/v1/auth/register` - **Register a new user**
- `POST /api/v1/auth/login` - **Log in an existing user**
- `POST /api/v1/auth/logout` - **Log out the logged-in user** (requires authentication)
- `DELETE /api/v1/auth/user/delete` - **Delete the logged-in user's account** (requires authentication)

#### Addictions

- `GET /api/v1/addictions/shows` - **Retrieve all addictions** (requires authentication)
- `GET /api/v1/addictions/show/:id` - **Retrieve an addiction by ID** (requires authentication)
- `POST /api/v1/addictions/create` - **Create a new addiction** (requires authentication)
- `PUT /api/v1/addictions/update/:id` - **Update an addiction by ID** (requires authentication)
- `DELETE /api/v1/addictions/delete/:id` - **Delete an addiction by ID** (requires authentication)

#### General Information

- `GET /api/v1/userInfos/show` - **Retrieve the logged-in user's information** (requires authentication)
- `POST /api/v1/userInfos/create` - **Create information for the logged-in user** (requires authentication)
- `PUT /api/v1/userInfos/update/:id` - **Update the logged-in user's information** (requires authentication)
- `DELETE /api/v1/userInfos/delete/:id` - **Delete the logged-in user's information** (requires authentication)

#### Emotions

- `GET /api/v1/emotions/shows` - **Retrieve all emotions** (requires authentication)
- `GET /api/v1/emotions/show/:id` - **Retrieve an emotion by ID** (requires authentication)
- `POST /api/v1/emotions/create` - **Create a new emotion** (requires authentication)
- `PUT /api/v1/emotions/update/:id` - **Update an emotion by ID** (requires authentication)
- `DELETE /api/v1/emotions/delete/:id` - **Delete an emotion by ID** (requires authentication)

#### Mental Health

- `GET /api/v1/mentalHealths/shows` - **Retrieve all mental health information** (requires authentication)
- `GET /api/v1/mentalHealths/show/:id` - **Retrieve mental health information by ID** (requires authentication)
- `POST /api/v1/mentalHealths/create` - **Create new mental health information** (requires authentication)
- `PUT /api/v1/mentalHealths/update/:id` - **Update mental health information by ID** (requires authentication)
- `DELETE /api/v1/mentalHealths/delete/:id` - **Delete mental health information by ID** (requires authentication)

#### Motivations

- `GET /api/v1/motivations/shows` - **Retrieve all motivations** (requires authentication)
- `GET /api/v1/motivations/show/:id` - **Retrieve a motivation by ID** (requires authentication)
- `POST /api/v1/motivations/create` - **Create a new motivation** (requires authentication)
- `PUT /api/v1/motivations/update/:id` - **Update a motivation by ID** (requires authentication)
- `DELETE /api/v1/motivations/delete/:id` - **Delete a motivation by ID** (requires authentication)

#### Objectives

- `GET /api/v1/objectives/shows` - **Retrieve all objectives** (requires authentication)
- `GET /api/v1/objectives/show/:id/addiction/:idAddiction` - **Retrieve a specific objective** (requires authentication)
- `POST /api/v1/objectives/create/:id` - **Create a new objective** (requires authentication)
- `PUT /api/v1/objectives/update/:id/addiction/:idAddiction` - **Update a specific objective** (requires authentication)
- `DELETE /api/v1/objectives/delete/:id/addiction/:idAddiction` - **Delete a specific objective** (requires authentication)

### Models

Models are defined in the `api/app/models` folder. For example, the Objective model is defined in `api/app/models/objective.ts`.

### Services

Services are defined in the `api/app/services` folder. For example, the ObjectiveService is defined in `api/app/services/objectives_service.ts`.

### Configuration

Configuration files are located in the `api/config` folder. For example, the application configuration is defined in `api/config/app.ts`.

### Database

Database creation scripts are located in the `mcd` folder. For example, the BreakFree database creation script is defined in `mcd/createDatabaseBreakfree.sql`.

### Docker

A `Dockerfile` is provided to create a Docker image of the application. You can build and run the Docker container using the following commands:
```sh
docker build -t breakfree-api .
docker run -p 3333:3333 breakfree-api
```

### Project Evolution

To track the evolution of the project, please refer to the Release.

