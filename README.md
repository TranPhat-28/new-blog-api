# New Blog API

## 1. Project Overview

A RESTful blog API built with NestJS, MikroORM, PostgreSQL and deployed using AWS.

|                                                                                                                                                                       | Technology        | Description                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------- |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" alt="NestJS" height="28">                                             | NestJS            | Framework for building the REST API.            |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" height="28">                                 | TypeScript        | Typed language used for the application.        |
| <img src="https://mikro-orm.io/img/favicon.ico" alt="MikroORM" height="28">                                                                                           | MikroORM          | ORM for entities, repositories, and migrations. |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" height="28">                                 | PostgreSQL        | Relational database.                            |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" alt="Swagger" height="28">                                          | Swagger / OpenAPI | API documentation and exploration.              |
| <img src="https://cdn.simpleicons.org/jsonwebtokens/bdbdbd" alt="JSON Web Tokens" height="28">                                                                        | JWT               | Token standard used for authentication.         |
| <img src="https://cdn.simpleicons.org/faker/FF5858" alt="Faker" height="28">                                                                                          | Faker             | Generates realistic seed data.                  |
| <img src="https://cdn.simpleicons.org/dotenv/ECD53F" alt="dotenv" height="28">                                                                                        | dotenv            | Loads configuration from environment variables. |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="Amazon Web Services" height="28"> | AWS               | Cloud platform for the project demo.            |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" alt="Jest" height="28">                                                      | Jest              | Test runner and HTTP testing tools.             |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg" alt="ESLint" height="28">                                             | ESLint / Prettier | Code linting and formatting.                    |

## 2. Implemented Features

The repository currently implements the following features:

- Fully implemented CRUD operations, including:
    - Paginated result
    - Sorting and filtering
    - Text search
    - Authorization-required operations
- User authentication using JWT
- Database seedings and migrations management
- Fully implemented entities and DTOs mapping
- Request validation handling and exception filter
- Swagger/OpenAPI documentation
- Email notification service

## 3. Database Design

<img width="1482" height="820" alt="Schema" src="https://github.com/user-attachments/assets/370121eb-b44f-4787-99a2-322797c70d8c" />

## 4. Infrastructure

<img width="1536" height="1024" alt="Diagram2" src="https://github.com/user-attachments/assets/131fbd5d-5abe-41b5-aaf7-5369c23ab186" />

## 5. API Endpoints

Swagger documentation is available at:

- http://localhost:3000/api

<img width="985" height="3058" alt="Swagger" src="https://github.com/user-attachments/assets/11a6552b-652d-4400-83c1-1ed69de9bcaa" />

### Auth

| Method | Endpoint           | Description                                  |
| ------ | ------------------ | -------------------------------------------- |
| POST   | /auth/request-code | Request an email OTP code for login/register |
| POST   | /auth/verify-code  | Verify OTP and receive JWT access token      |
| GET    | /api/v1/me         | Get current authenticated user details       |

### Posts

| Method | Endpoint                          | Description                                            |
| ------ | --------------------------------- | ------------------------------------------------------ |
| GET    | /api/v1/posts                     | List posts with pagination and sorting (authenticated) |
| GET    | /api/v1/posts/:id                 | Get a single post (authenticated)                      |
| POST   | /api/v1/posts                     | Create a new post (authenticated)                      |
| PUT    | /api/v1/posts/:id                 | Update a post (author only)                            |
| PATCH  | /api/v1/posts/:id                 | Partially update a post (author only)                  |
| DELETE | /api/v1/posts/:id                 | Delete a post (author only)                            |
| POST   | /api/v1/posts/:postId/tags/:tagId | Attach a tag to a post (author only)                   |
| DELETE | /api/v1/posts/:postId/tags/:tagId | Detach a tag from a post (author only)                 |

### Comments

| Method | Endpoint                       | Description                                       |
| ------ | ------------------------------ | ------------------------------------------------- |
| GET    | /api/v1/posts/:postId/comments | List comments for a specific post (authenticated) |
| GET    | /api/v1/comments/:id           | Get a single comment (authenticated)              |
| POST   | /api/v1/posts/:postId/comments | Create a comment for a post (authenticated)       |
| PUT    | /api/v1/comments/:id           | Update a comment (author only)                    |
| DELETE | /api/v1/comments/:id           | Delete a comment (author only)                    |

### Tags

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | /api/v1/tags     | List tags        |
| GET    | /api/v1/tags/:id | Get a single tag |
| POST   | /api/v1/tags     | Create a tag     |
| DELETE | /api/v1/tags/:id | Delete a tag     |
