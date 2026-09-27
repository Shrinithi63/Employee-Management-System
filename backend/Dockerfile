FROM openjdk:25-rc-jdk

WORKDIR /app

COPY target/employee-0.0.1-SNAPSHOT.jar employee-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "employee-0.0.1-SNAPSHOT.jar"]
