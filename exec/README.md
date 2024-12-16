# 1.  개발환경

## 1.1. Frontend

- "expo": "~50.0.14"
- "react": "18.2.0"
- "react-native": "0.73.6"
- "typescript": "^5.1.3”

## 1.2. Backend

- Java
    - Openjdk 17.0.10
    - Gradle 8.5
    - Spring Boot 3.2.3
        - Spring Data JPA 3.2.3
        - Spring Boot Validation 3.2.3
        - Query DSL 5.0.0
        - JUnit 5.10.2
        - Lombok 1.18.30
        - Swagger 2.1.0
        - JavaGradle 8.5
    - Query DSL 5.0.0
    - JUnit 5.10.2
    - Lombok 1.18.30
    - Swagger 2.1.0
    - jjwt
    - Api 0.11.5Impl 0.11.5Jaxkson 0.11.5
    - Spring Kafka 3.1.3

- Python
    - fastapi 0.110.3
    - scikit-learn==1.2.2
    - diffusers 0.27.2
    - invisible-watermark 0.2.0
    - transformers 4.40.1
    - accelerate 0.29.3
    - safetensors 0.4.3
    - boto3 1.34.96
    - uvicorn 0.29.0
    - python-dotenv 1.0.1
    - openai 1.25.0
    - pydantic 2.7.1
    - peft 0.10.0
    - kafka-python 2.0.2

## 1.3. Server

- Ubuntu 20.04.6 LTS
- Nginx 1.25.4
- Docker 25.0.4
- Docker Compose (plugin) 2.24.1
- Jenkins 2.448

## 1.4. Database

- ElasticSearch 8.7.1
- MySQL 8.0

## 1.5. UI/UX

- Figma

## 1.6. IDE

- Visual Studio Code 1.86.2
- IntelliJ IDEA 2023.2

## 1.7. 형상 / 이슈관리

- Git
- Jira

## 1.8. 기타 Tool

- Postman 10.24.11

# 2. 환경 변수

## 2.1. Backend

- MYSQL_ROOT_PASSWORD
- MYSQL_USER_PROD_ID
- MYSQL_USER_PROD_PASSWORD
- MYSQL_USER_DEV_ID
- MYSQL_USER_DEV_PASSWORD
- KAKAO_CLIENT_ID
- KAKAO_CLIENT_SECRET
- NAVER_CLIENT_ID
- NAVER_CLIENT_SECRET
- SERVICE_JWT_SECRET_KEY
- KAFKA_DEV_SERVER_ADDRESS
- KAFKA_PROD_SERVER_ADDRESS
- KAFKA_SPRING_GROUP

# 3. EC2 세팅

## 3.1 Port

AWS EC2

| 내용 | External Port  | Internal Port |
| --- | --- | --- |
| SSH | 22 | - |
| HTTP ( HTTPS로 redirect) | 80 | - |
| HTTPS | 443 | - |
| Nginx | 80,443 | 80,443 |
| Certbot(SSL) | - | 80, 443 |
| MySQL | - | 3306 |
| Backend (Spring Boot) | - | 8080 |
| Jenkins | 9999 | 8080 |
| Elastic Search | 9200 | 9200 |
| Kibana | 5601 | 5601 |
| Kafka | 9092 | 9094 |
| Kafdrop | 9000 | 9000 |

GCP EC2

| Backend (FastAPI) | 8000 | 8000 |
| --- | --- | --- |

## 3.2. 방화벽(UFW) 설정

```java
# 1. 해당 포트 개방
# 22 TCP
# 80 TCP
# 443 TCP
# 8080 TCP
# 9999 TCP
# 9092 TCP
# 9000 TCP
# 예시
sudo ufw allow 22/TCP

# 2. UFW 활성화 및 상태 확인
sudo ufw enable
sudo ufw status verbose
```

## 3.3. 업데이트 서버 변경

```bash
vi /etc/apt/sources.list

:%s/ap-northeast-2.ec2.archive.ubuntu.com/mirror.kakao.com
:%s/security.ubuntu.com/mirror.kakao.com

sudo apt-get update
sudo apt-get upgrade
```

## 3.4. Docker 및 Docker compose 설치

```bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce

sudo systemctl start docker
docker --version

sudo systemctl enable docker

sudo usermod -aG docker $USER
```

## 3.5. SSL 발급

```bash
vi init-letsencrpyt.sh

#!/bin/bash
domains="[도메인]" 
rsa_key_size=4096
data_path="[설정 파일 보관 경로]"
email="[발급자 이메일]" # Adding a valid address is strongly recommended

chmod +x init-letsencrpyt.sh
./init-letsencrpyt.sh

vi init-letsencrpyt.sh
:%s/docker-compose/docker compose

./init-letsencrpyt.sh
```

## 3.6. Jenkins(DoD) Image 빌드

```bash
vi Dockerfile

FROM jenkins/jenkins:lastest
USER root

RUN apt-get update && \
    apt-get -y install apt-transport-https \
      ca-certificates \
      curl \
      gnupg2 \
      software-properties-common && \
    curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && \
    add-apt-repository \
      "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
      $(lsb_release -cs) \
      stable" && \
   apt-get update && \
   apt-get -y install docker-ce

RUN groupadd -f docker
RUN usermod -aG docker jenkins

docker build -t jenkins/custom .
```

## 3.8. Backend Dockerfile

```bash
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

ENTRYPOINT ["java","-jar", "-Dspring.profiles.active=prod" ,"app.jar"]
```

## 3.9. Docker Custom Network 생성

```bash
docker network create today-net
```

## 3.10. Docker compose 작성

1. 정적 컨테이너

```bash
services:
  nginx:
    container_name: nginx
    image: nginx:latest
    restart: always
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./nginx/service-color.inc:/etc/nginx/conf.d/service-color.inc
      - /data/certbot/conf:/etc/letsencrypt
      - /data/certbot/www:/var/www/certbot
    ports:
      - 80:80
      - 443:443
    environment:
      TZ: Asia/Seoul
    command: '/bin/sh -c ''while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g "daemon off;"'''

  certbot:
    container_name: certbot
    image: certbot/certbot
    restart: unless-stopped
    volumes:
      - /data/certbot/conf:/etc/letsencrypt
      - /data/certbot/www:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"

  mysql:
    container_name: mysql
    image: mysql:8.0
    restart: always
    # 외부 포트를 막아놓는다
    expose: 
      - 3306
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      TZ: Asia/Seoul
    command:
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    volumes:
      - /data/mysql/:/var/lib/mysql

  jenkins:
    container_name: jenkins
    image: jenkins/custom
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /jenkins:/var/jenkins_home
      - /env:/env
    ports:
      - 9999:8080
    environment:
      TZ: Asia/Seoul
#    expose:
#      - 9999
#    environment:
#      # 포트 번호를 8080 -> 9999 로 바꾸자
#      JENKINS_OPTS: --httpPort=9999

  kafka:
    container_name: kafka
    image: bitnami/kafka:latest
    ports:
      - '9092:9092'
    expose:
      - '9094'
    environment:
      # KRaft settings
      - KAFKA_CFG_NODE_ID=0
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@127.0.0.1:9093
      # Listeners
      - KAFKA_CFG_LISTENERS=CONTROLLER://:9093,PLAINTEXT://:9094,EXTERNAL://:9092
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9094,EXTERNAL://43.203.230.215:9092
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,EXTERNAL:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=PLAINTEXT

  kafdrop:
    container_name: kafdrop
    image: obsidiandynamics/kafdrop
    restart: "no"
    ports:
      - "9000:9000"
    environment:
      KAFKA_BROKER_CONNECT: "kafka:9094"
    depends_on:
      - kafka

networks:
  default:
    name: today-net
    external: true
```

1. ES 관련 컨테이너

```java
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.7.1
    container_name: elasticsearch
    environment:
      node.name: es01
      cluster.name: es-docker-cluster
      discovery.type: single-node
      xpack.security.enabled: false  # 보안 기능 비활성화
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - /elasticsearch/data:/usr/share/elasticsearch/data
    ports:
      - 9200:9200

  kibana:
    image: docker.elastic.co/kibana/kibana:8.7.1
    container_name: kibana
    environment:
      ELASTICSEARCH_URL: http://elasticsearch:9200
      ELASTICSEARCH_HOSTS: http://elasticsearch:9200  # SSL/TLS 비활성화
    ports:
      - 5601:5601
    depends_on:
      - elasticsearch

networks:
  default:
    name: today-net
    external: true
```

## 3.10. Nginx 설정

```bash
server {
    listen 80;
    listen [::]:80;
    server_name dangil.store;
    access_log off;

    location /.well-known/acme-challenge/ {
        allow all;
        root /var/www/certbot;
    }

    location / {
        return 308 https://$host$request_uri;
    }
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
    listen 443 ssl;
    server_name dangil.store;
    include /etc/nginx/conf.d/service-color.inc;

    # 서트봇이 볼륨으로 남겨두는 인증서를 가지고 이미지를 만들었고 엔진엑스 컨테이너에서 해당 인증서를 사용한다.
    ssl_certificate /etc/letsencrypt/live/dangil.store/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dangil.store/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # 부적절한 헤더도 요청을 허용한다.
    ignore_invalid_headers off;

    location /api/ws {
        resolver 127.0.0.11 valid=30s;
        proxy_pass http://spring_$spring_color:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }

    location /api {
        resolver 127.0.0.11 valid=30s;
        proxy_pass http://spring_$spring_color:8080;
        proxy_set_header X-Forwarded-Host $server_name;

        # 디폴트로 IP는 프록시로 변경되고 난뒤에 (리버스 프록시 기능)
        # 원래의 요청의 헤더에 설정을 수정 및 추가한다
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

}
```

```bash
set $spring_url http://172.17.0.1:8080;
set $react_url http://172.17.0.1:3000;
set $fastapi_url http://172.17.0.1:8000;
```

## 3.11. Docker compose UP

```bash
set $spring_color blue;
```

# 4. Blue & Green CI/CD 구축

## 4.1. Jenkins 설정

### 4.1.1. Pipeline Script 작성

```java
pipeline {
    agent any
    
    stages {
        stage('Clone') {
            steps {
                echo 'git clone'
                git branch: 'master', 
                credentialsId: 'user_name_pw', 
                url: 'https://lab.ssafy.com/s10-final/S10P31B108.git'
                
            }
        }
        stage('Backend build') {
            steps {
                dir('back') {
                    echo 'spring build & image'
                    sh 'docker build -t spring .'
                    sh 'docker image prune -f'
                }
            }
        }
        stage('Docker Compose') {
            steps {
                dir('exec/deploy') {
                    echo 'deploy & blue/green'
                    sh 'chmod +x deploy.sh'
                    sh './deploy.sh'
                }    
            }
        }
    }
}
```

### 4.1.2. Plugin 설치 목록

```bash
Post build task
Bitbucket Pipeline for Blue Ocean
Dashboard for Blue Ocean
Personalization for Blue Ocean
Display URL for Blue Ocean
Server Sent Events (SSE) Gateway
Events API for Blue Ocean
Blue Ocean Pipeline Editor
i18n for Blue Ocean
Autofavorite for Blue Ocean
GitHub Pipeline for Blue Ocean
Git Pipeline for Blue Ocean
Config API for Blue Ocean
Blue Ocean
Jersey 2 API
GitLab
Generic Webhook Trigger
GitLab Authentication
Gitlab API
GitLab Branch Source
Gitlab Merge Request Builder
Config File Provider
NodeJS
```

## 4.2 빌드 및 배포 Script

```bash
#!/bin/bash

# Working container check
# docker compose -p deploy-blue -f docker-compose.blue.yaml ps 컴포즈 작동 확인
EXIST_BLUE=$(docker compose -p deploy-blue -f docker-compose.blue.yaml ps | grep Up)

# -z zero confirm blue 컴포즈
if [ -z "$EXIST_BLUE" ]; then
    # blue
    docker compose -p deploy-blue -f docker-compose.blue.yaml up -d
    BEFORE_COLOR="green"
    AFTER_COLOR="blue"
else
    # green
    docker compose -p deploy-green -f docker-compose.green.yaml up -d
    BEFORE_COLOR="blue"
    AFTER_COLOR="green"
fi

# DNS 조회를 통해 IP 주소 찾아내자아아아
IP_ADDRESS=$(nslookup spring_${AFTER_COLOR} | grep 'Address:' | tail -n1 | awk '{print $2}')

# Spring Server health checking
for retry_count in {1..60}
do
    # spring_blue or spring_green 컨테이너 이름을 적어주고 싶다 !
    # (curl) http 요청을 보내본다.
    response=$(curl -s http://${IP_ADDRESS}:8080/api/health)
    up_count=$(echo $response | grep 'isWorking' | wc -l)

    if [ $up_count -ge 1 ]
    then
        echo "=========================="
        echo "> Spring Server is working"
        echo "=========================="
        break
    else
        echo "> Spring Health is not working: ${response}"
    fi

    # about 10 minuetes
    # (60번의 요청 이후에도 서버가 정상적으로 올라오지 않는다면) next 서버를 다운 시키고 엔진엑스의 포트 포워딩을 진행하지 않는다 !
    if [ $retry_count -eq 60 ]
    then
        echo "> Spring Server working failed"
        docker compose -p deploy-${AFTER_COLOR} -f docker-compose.${AFTER_COLOR}.yaml down
        exit 1;
    fi
    # wating 10 seconds(한번 요청 보내고 10초 기다린다 ! )
    sleep 10
done

# 엔진엑스의 포트포워딩
# 위에서 정상적으로 health 체크가 됬다면 down 되지 않는다 !
EXIST_AFTER=$(docker compose -p deploy-${AFTER_COLOR} -f docker-compose.${AFTER_COLOR}.yaml ps | grep Up)

if [ -n "$EXIST_AFTER" ]; then
    echo "nginx Setting"
    docker exec -i nginx /bin/bash -c "echo -e 'set \$spring_color ${AFTER_COLOR};' > /etc/nginx/conf.d/service-color.inc && nginx -s reload"
    set $spring_color = AFTER_COLOR

    echo "Completed Deploy!"
    echo "$BEFORE_COLOR server down(spring_${BEFORE_COLOR})"

    # 이전 컨테이너 (compoes) 를 다운시킨다
    docker compose -p deploy-${BEFORE_COLOR} -f docker-compose.${BEFORE_COLOR}.yaml down
fi
```

```bash
services:
  spring:
    container_name: spring_blue
    image: spring:latest
    restart: always
    env_file:
      - /env/spring.env
    expose:
      - 8080
    environment:
      TZ: Asia/Seoul

networks:
  default:
    name: today-net
    external: true
```

```bash
services:
  spring:
    container_name: spring_green
    image: spring:latest
    restart: always
    env_file:
      - /env/spring.env
    expose:
      - 8080
    environment:
      TZ: Asia/Seoul

networks:
  default:
    name: today-net
    external: true
```