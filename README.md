# Employee Management System

A full-stack Employee Management System built with a **React + Vite** frontend, a **Spring Boot** backend running on **Java 25**, and a **MySQL** database.

The whole app runs with one command:

```bash
docker compose up --build
```

Then open http://localhost:8080.

---

## Tech Stack

* **Frontend:** React, Vite
* **Backend:** Spring Boot, Java 25, Spring Data JPA
* **Database:** MySQL 8.0
* **Containerization:** Docker

---

## Quick Start (Local Setup)

**Prerequisite:** [Docker](https://docs.docker.com/get-docker/). You do not need Java, Maven, Node or MySQL installed.

**1. Clone the repository**

```bash
git clone https://github.com/Shrinithi63/Employee-Management-System.git
cd Employee-Management-System
```

**2. Create your `.env` file**

```bash
cp .env.example .env
```

Open `.env` and set your own passwords:

```env
MYSQL_ROOT_PASSWORD=change_me_root
MYSQL_PASSWORD=change_me_user
```

> `.env` is git-ignored. But `.env.example` is committed

**3. Build and start**

```bash
docker compose up --build
```

**4. Open the app**

http://localhost:8080

**Stop the app**

```bash
docker compose down        # stop containers, keep database data
docker compose down -v     # stop containers and delete database data
```

---

## How the Docker Build Works

The `Dockerfile` has three stages:

| Stage | Base image | What it does |
|---|---|---|
| `frontend-build` | `node:24-alpine` | Runs `npm ci` and `npm run build` for the React app |
| `backend-build` | `maven:3.9-eclipse-temurin-25` | Copies the React build into `src/main/resources/static`, then builds the JAR |
| Runtime | `eclipse-temurin:25-jre` | Copies only the final JAR. No Node, Maven or source code |

## How Docker Compose Works

- The database host is `mysql`, not `localhost`. Containers reach each other by service name.
- `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME` and `SPRING_DATASOURCE_PASSWORD` override the values in `application.properties`, so the same JAR runs locally and in Docker without code changes.
- MySQL has a **healthcheck**, and the backend uses `depends_on` with `condition: service_healthy`. `depends_on` alone only waits for the container to *start*, not to be *ready*. With the healthcheck, the backend starts only after MySQL answers, and connects on the first attempt.
- Database data is stored in the `mysql-data` volume, so it survives restarts.

## Running Without Docker (Development)

### Backend

**Prerequisites:** Java 25, Maven, and a local MySQL instance. Update the datasource settings in `backend/src/main/resources/application.properties` to match your database.

```bash
cd backend
mvn spring-boot:run
```

The API runs on http://localhost:8080.

### Frontend (hot reload)

**Prerequisites:** Node.js and npm.

```bash
cd frontend/ems-frontend
npm install
npm run dev
```

The Vite dev server runs on http://localhost:3000 (set in vite.config.js). Keep the backend running on port 8080 while you work.

---
