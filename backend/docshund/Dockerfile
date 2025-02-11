FROM openjdk:21-slim

WORKDIR /usr/src/app

ARG JAR_PATH=./build/libs
ARG JAR_NAME=docshund-0.0.1-SNAPSHOT.jar

COPY ${JAR_PATH}/${JAR_NAME} app.jar

# Spring Boot 실행 (환경에 따라 프로파일 변경 가능)
CMD ["java", "-jar", "-Dspring.profiles.active=local", "app.jar"]
