FROM openjdk:17-alpine AS builder

WORKDIR /usr/src/app

# 실행 환경을 만들어준다
COPY build.gradle gradlew settings.gradle .

COPY gradle gradle

COPY src src

# 파일을 복사해오면 실행 권한이 없기에 실행 권한을 부여한다 !
RUN chmod +x gradlew

# 빌드를 실행한다 !
RUN ./gradlew clean bootJar

FROM openjdk:17-alpine

WORKDIR /usr/src/app

ARG JAR_FILE=build/libs/*.jar

COPY --from=builder /usr/src/app/${JAR_FILE} app.jar
RUN apk add tzdata && ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo Asia/Seoul > /etc/timezone

ENTRYPOINT ["java","-jar", "-Dspring.profiles.active=prod" ,"app.jar"]