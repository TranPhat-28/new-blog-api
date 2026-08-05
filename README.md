# New Blog API

## 1. Project Overview

A RESTful blog API built with NestJS, MikroORM, and PostgreSQL.

This project provides a simple blog platform API with three main resources:

- Posts
- Comments
- Tags

## 2. Tech Stack

| Technology        | Purpose                                                         |
| ----------------- | --------------------------------------------------------------- |
| NestJS            | Main application framework for building the REST API            |
| TypeScript        | Strongly typed application code                                 |
| MikroORM          | ORM for entities, repositories, migrations, and database access |
| PostgreSQL        | Primary relational database                                     |
| Swagger / OpenAPI | API documentation and interactive exploration                   |
| class-validator   | Request DTO validation                                          |
| class-transformer | Query parameter and payload transformation                      |
| AutoMapper        | Mapping between entities and DTOs                               |
| Faker             | Generating realistic fake data for seeding                      |
| dotenv            | Loading environment variables                                   |
| Jest / Supertest  | Testing support                                                 |
| ESLint / Prettier | Code quality and formatting                                     |

## 3. Database Design

The API uses PostgreSQL with three main content entities plus a `User` entity for authentication and authorship:

- Post
- Comment
- Tag
- User


<img width="1482" height="820" alt="Schema" src="https://github.com/user-attachments/assets/370121eb-b44f-4787-99a2-322797c70d8c" />


### Relationships

- Post ↔ Comment: One-to-many
    - One post can have many comments.
    - Each comment belongs to a single post.
    - Each comment also has an author.
    - The comment side is the owning side of the relation through the post reference.

- Post ↔ Tag: Many-to-many
    - A post can have many tags.
    - A tag can be assigned to many posts.
    - The owning side of the relation is defined on the Post entity through the tags collection.

- Post ↔ User: Many-to-one
    - Each post has an author.
    - Only the post author can update, delete, or manage tags on their post.

### Entity notes

- Post entities contain title, content, timestamps, comments, tags, and an author reference.
- Comment entities contain content, a reference to their parent post, an author reference, and timestamps.
- Tag entities contain a unique name and timestamps.
- User entities handle authentication and are referenced as authors on posts and comments.

## 4. Implemented Features

The repository currently implements the following features:

- Email-based OTP authentication with JWT issuance
- Authenticated user retrieval via `/api/v1/me`
- CRUD operations for Posts with author-only update/delete and tag attachment/removal
- CRUD operations for Comments with authenticated creation and author-only update/delete
- CRUD operations for Tags
- Author relationships between Posts, Comments, and Users
- One-to-many relationship between Posts and Comments
- Many-to-many relationship between Posts and Tags
- Database migrations
- Database seeders and factories
- AutoMapper integration for entity/DTO mapping
- Separate request and response DTOs
- Validation using class-validator
- Global ValidationPipe
- Global exception filter
- Pagination support
- Sorting support
- Swagger/OpenAPI documentation

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

## Getting Started

### Installation

```bash
npm install
```

```bash
npm run start:dev
```

The API will be available at:

- http://localhost:3000
- Swagger UI: http://localhost:3000/api
