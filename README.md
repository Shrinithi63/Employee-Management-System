# Employee Management System

A full-stack Employee Management System built with a **React + Vite** frontend, a **Spring Boot** backend running on **Java 25**, and a **MySQL** database.

The application is bundled so that the pre-built frontend static assets live directly inside the backend repository. So containerizing the application requires **only the backend and MySQL**, allowing for a seamless single-command startup.

---

## Tech Stack

* **Frontend:** React, Vite
* **Backend:** Spring Boot, Java 25
* **Database:** MySQL 8.0
* **Containerization:** Docker

---

## Local Setup

Clone the Repository

Clone the project repository to your local machine using Git:

git clone https://github.com/Shrinithi63/Employee-Management-System.git

### 1) Run the Application Locally via Docker Compose
Since the built frontend assets are already included in the backend repository, you can spin up the entire application (database + backend serving the UI) with a single command:

```bash
docker compose up --build
```

Once running, open your browser and access the application at: **`http://localhost:8080`**

---

### 2) Run the Backend App Separately Locally
If you want to run or debug the Spring Boot backend independently outside of Docker (make sure you have a local MySQL instance running or update your `application.properties`):

> **Prerequisite:** Make sure **Apache Maven** and **Java 25** are installed in your local environment before running the command below.

```bash
# Navigate to the backend directory
cd backend

# Run the Spring Boot application
mvn spring-boot:run
```

---

### 3) Run the Frontend App Separately Locally
If you want to run the React + Vite frontend in development mode with hot-reloading separately:

> **Prerequisite:** Make sure **Node.js** and **npm** are installed in your local environment.

```bash
# Navigate to the frontend directory
cd frontend/ems-frontend

# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
