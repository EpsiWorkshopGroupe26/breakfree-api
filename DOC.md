# BreakFree API Documentation

## Introduction

BreakFree API is a RESTful API that manages various aspects of users' mental and physical health, such as their addictions, emotions, goals, general information, and motivations. The API uses Bearer Tokens for authentication to secure access to routes and ensure that each user interacts only with their own data.

## Table of Contents

- [BreakFree API Documentation](#breakfree-api-documentation)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [API Configuration](#api-configuration)
  - [Authentication](#authentication)
  - [Postman Documentation](#postman-documentation)
  - [API Routes](#api-routes)
    - [Auth](#auth)
    - [Addictions](#addictions)
    - [Objectives](#objectives)
    - [Emotions](#emotions)
    - [General Information](#general-information)
    - [Mental Health](#mental-health)
    - [Motivations](#motivations)
  - [Testing with Postman](#testing-with-postman)
    - [Import the Collection:](#import-the-collection)
    - [Configure Authorization:](#configure-authorization)
    - [Test the Routes:](#test-the-routes)
  - [Final Remarks](#final-remarks)

## Prerequisites

Before using this API, make sure you have:

- Node.js and npm installed on your machine.
- A tool to test APIs, such as Postman.
- An instance of the BreakFree API running locally or on a remote server.

## API Configuration

Read the project's [README](README.en.md) for detailed instructions on configuring the API, installing dependencies, starting the server, and using the various features.

## Authentication

The API uses a JWT token system to secure access to routes. To access protected routes, you must:

1. Create a user account via the `register` endpoint.
2. Log in via the `login` endpoint to obtain a token.
3. Use this token as a Bearer Token in your request headers to access other routes.

## Postman Documentation

The complete API documentation is available on Postman and includes all routes, parameters, and response examples. You can access the documentation via the following link:

[Postman Documentation - BreakFree API](#)

To import the collection into your own Postman:

1. Download the JSON file of the collection from the repository or use the public link provided above.
2. In Postman, click `Import` and select the JSON file of the collection.

## API Routes

### Auth

| Method | Endpoint                  | Description                    |
|--------|---------------------------|--------------------------------|
| POST   | /api/v1/auth/register     | Register a new user            |
| POST   | /api/v1/auth/login        | Authenticate a user            |
| POST   | /api/v1/auth/logout       | Log out the user               |
| DELETE | /api/v1/auth/user/delete  | Delete the user's account      |

### Addictions

| Method | Endpoint                      | Description                    |
|--------|-------------------------------|--------------------------------|
| POST   | /api/v1/addictions/create     | Create a new addiction         |
| GET    | /api/v1/addictions/show/:id   | Retrieve a specific addiction  |
| GET    | /api/v1/addictions/shows      | List all addictions            |
| PUT    | /api/v1/addictions/update/:id | Update an addiction            |
| DELETE | /api/v1/addictions/delete/:id | Delete an addiction            |

### Objectives

| Method | Endpoint                                      | Description                    |
|--------|-----------------------------------------------|--------------------------------|
| POST   | /api/v1/objectives/create/:id                 | Create a goal for an addiction |
| GET    | /api/v1/objectives/shows                      | List all goals                 |
| GET    | /api/v1/objectives/show/:id/addiction/:idAddiction | Retrieve a specific goal       |
| PUT    | /api/v1/objectives/update/:id/addiction/:idAddiction | Update a goal                  |
| DELETE | /api/v1/objectives/delete/:id/addiction/:idAddiction | Delete a goal                  |

### Emotions

| Method | Endpoint                      | Description                    |
|--------|-------------------------------|--------------------------------|
| POST   | /api/v1/emotions/create       | Add a new emotion              |
| GET    | /api/v1/emotions/shows        | List all emotions              |
| GET    | /api/v1/emotions/show/:id     | Retrieve a specific emotion    |
| PUT    | /api/v1/emotions/update/:id   | Update an emotion              |
| DELETE | /api/v1/emotions/delete/:id   | Delete an emotion              |

### General Information

| Method | Endpoint                      | Description                    |
|--------|-------------------------------|--------------------------------|
| POST   | /api/v1/userInfos/create      | Create or update personal information |
| GET    | /api/v1/userInfos/show        | Retrieve the user's personal information |
| PUT    | /api/v1/userInfos/update/:id  | Update personal information    |
| DELETE | /api/v1/userInfos/delete/:id  | Delete personal information    |

### Mental Health

| Method | Endpoint                      | Description                    |
|--------|-------------------------------|--------------------------------|
| POST   | /api/v1/mentalHealths/create  | Record a new mental health state |
| GET    | /api/v1/mentalHealths/shows   | List all mental health records |
| GET    | /api/v1/mentalHealths/show/:id| Retrieve a specific record     |
| PUT    | /api/v1/mentalHealths/update/:id | Update a record               |
| DELETE | /api/v1/mentalHealths/delete/:id | Delete a record               |

### Motivations

| Method | Endpoint                      | Description                    |
|--------|-------------------------------|--------------------------------|
| POST   | /api/v1/motivations/create    | Create a new motivation        |
| GET    | /api/v1/motivations/shows     | List all motivations           |
| GET    | /api/v1/motivations/show/:id  | Retrieve a specific motivation |
| PUT    | /api/v1/motivations/update/:id | Update a motivation            |
| DELETE | /api/v1/motivations/delete/:id | Delete a motivation            |

## Testing with Postman

### Import the Collection:

1. Download the JSON file of the collection or use the shared link provided above.
2. Import it into Postman by clicking `Import`.

### Configure Authorization:

1. Select the BreakFree collection in Postman.
2. Go to the `Authorization` tab and select `Bearer Token`.
3. Add your JWT token after authentication via `/api/v1/auth/login`.

### Test the Routes:

1. Test each route using the specified parameters and request bodies in the documentation above.
2. Verify the expected responses to validate the API's functionality.

## Final Remarks

The BreakFree API is a powerful tool for managing and monitoring users' personal health aspects. Always use a valid token to access protected routes and test the features following the provided guidelines.

