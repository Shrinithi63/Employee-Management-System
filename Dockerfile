# Stage 1: Build React frontend
FROM node:24-alpine AS frontend-build
WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot backend
FROM maven:3.9-eclipse-temurin-25 AS backend-build
WORKDIR /app

COPY backend/pom.xml ./
RUN mvn -B dependency:go-offline

COPY backend/src ./src

# Copy React build output into Spring Boot static resources
COPY --from=frontend-build /app/dist ./src/main/resources/static

RUN mvn -B -DskipTests package

# Stage 3: Runtime
FROM eclipse-temurin:25-jre
WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]