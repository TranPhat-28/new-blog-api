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

## 3. Project Structure

```text
src/
├── app.module.ts
├── main.ts
├── common/
│   ├── dtos/
│   │   └── pagination-query.dto.ts
│   └── filters/
│       └── all-exceptions.filter.ts
├── database/
│   ├── factories/
│   │   ├── CommentFactory.ts
│   │   └── PostFactory.ts
│   └── seeders/
│       └── PostSeeder.ts
├── migrations/
├── modules/
│   ├── comment/
│   ├── post/
│   └── tag/
```

### Module responsibilities

- Post module: manages posts, post-specific queries, tag attachment/detachment, and post response DTOs
- Comment module: manages comments created under posts
- Tag module: manages tags and their listing/creation/deletion
- Common folder: reusable DTOs and globally used filters
- Database folder: factories and seeders used to populate development data
- Migrations folder: versioned database schema changes

## 4. Architecture

The application follows a standard layered flow:

```text
Client → Controller → Service → MikroORM → Database
```

### Request flow

1. The client sends an HTTP request to one of the API endpoints.
2. The controller receives the request and passes it to the corresponding service.
3. The service uses MikroORM to interact with the database.
4. The resulting entity data is mapped into response DTOs before being returned to the client.

### Main building blocks

- Controllers: receive HTTP requests and delegate logic to services
- Services: implement business logic and database operations
- Entities: represent database tables and relationships
- DTOs: define request and response payload shapes
- AutoMapper: maps entities to DTOs and request DTOs to entities

## 5. Database Design

The API uses PostgreSQL with three main entities:

- Post
- Comment
- Tag

### Relationships

- Post ↔ Comment: One-to-many
    - One post can have many comments.
    - Each comment belongs to a single post.
    - The comment side is the owning side of the relation through the post reference.

- Post ↔ Tag: Many-to-many
    - A post can have many tags.
    - A tag can be assigned to many posts.
    - The owning side of the relation is defined on the Post entity through the tags collection.

### Entity notes

- Post entities contain title, content, timestamps, comments, and tags.
- Comment entities contain content, a reference to their parent post, and timestamps.
- Tag entities contain a unique name and timestamps.

## 6. Implemented Features

The repository currently implements the following features:

- CRUD operations for Posts
- CRUD operations for Comments
- CRUD operations for Tags
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

## 7. API Endpoints

Swagger documentation is available at:

- http://localhost:3000/api

### Posts

| Method | Endpoint                          | Description                            |
| ------ | --------------------------------- | -------------------------------------- |
| GET    | /api/v1/posts                     | List posts with pagination and sorting |
| GET    | /api/v1/posts/:id                 | Get a single post                      |
| POST   | /api/v1/posts                     | Create a new post                      |
| PUT    | /api/v1/posts/:id                 | Update a post                          |
| PATCH  | /api/v1/posts/:id                 | Partially update a post                |
| DELETE | /api/v1/posts/:id                 | Delete a post                          |
| POST   | /api/v1/posts/:postId/tags/:tagId | Attach a tag to a post                 |
| DELETE | /api/v1/posts/:postId/tags/:tagId | Detach a tag from a post               |

### Comments

| Method | Endpoint                       | Description                       |
| ------ | ------------------------------ | --------------------------------- |
| GET    | /api/v1/posts/:postId/comments | List comments for a specific post |
| GET    | /api/v1/comments/:id           | Get a single comment              |
| POST   | /api/v1/posts/:postId/comments | Create a comment for a post       |
| PUT    | /api/v1/comments/:id           | Update a comment                  |
| DELETE | /api/v1/comments/:id           | Delete a comment                  |

### Tags

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | /api/v1/tags     | List tags        |
| GET    | /api/v1/tags/:id | Get a single tag |
| POST   | /api/v1/tags     | Create a tag     |
| DELETE | /api/v1/tags/:id | Delete a tag     |

## 8. Validation

Validation is configured globally in the application bootstrap process using a NestJS ValidationPipe.

### What is enabled

- whitelist: true — unknown properties are stripped from incoming payloads
- transform: true — query parameters and payloads are transformed where possible

### DTO validation rules

The request DTOs use validation decorators such as:

- IsString
- IsNotEmpty
- MinLength
- MaxLength
- IsInt
- Min
- Max
- IsOptional
- IsIn

Examples include:

- Post title and content must be strings with sensible length limits
- Comment content must be a non-empty string
- Tag name must be a non-empty string
- Pagination values must be positive integers

### Why response DTOs are not validated

Response DTOs are output contracts rather than incoming request payloads. They define how data is returned to clients, so validation is applied to incoming requests instead of to responses.

## 9. Pagination

Pagination is supported on list endpoints through the shared pagination query DTO.

### Query parameters

- page: the page number to retrieve; default is 1
- limit: the number of items per page; default is 10

### Validation

- page and limit must be integers
- both values must be greater than or equal to 1
- limit is capped at 100

### Example requests

```http
GET /api/v1/posts?page=2&limit=5
GET /api/v1/tags?page=1&limit=20
```

## 10. Sorting

Sorting is implemented for list endpoints.

### Posts

Posts support both a field selector and an order direction:

- sortBy: createdAt or title
- order: asc or desc

### Tags and Comments

Tags and comments currently support sorting by createdAt using the order parameter.

### Example requests

```http
GET /api/v1/posts?sortBy=createdAt&order=desc
GET /api/v1/posts?sortBy=title&order=asc
GET /api/v1/posts/123/comments?order=asc
GET /api/v1/tags?order=desc
```

## 11. Error Handling

The application uses a global exception filter located in the common filters folder.

### Behavior

- Catch-all exception handling is applied globally.
- Errors are logged with the HTTP method, URL, and stack trace when available.
- The response is returned as a JSON object containing:
    - statusCode
    - message
    - timestamp
    - path

This ensures that unexpected errors are reported consistently across the API.

## 12. Database Seeding

The database seeding layer is set up with MikroORM factories and a seeder.

### Current seed behavior

- PostFactory generates fake post titles and content.
- CommentFactory generates fake comment content.
- The main seed script creates 50 posts and assigns a random number of comments to each post.

### Commands

After configuring your PostgreSQL connection variables, the typical workflow is:

```bash
npx mikro-orm migration:up
npx mikro-orm seeder:run
```

These commands run the migrations and populate the database with seed data.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

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
