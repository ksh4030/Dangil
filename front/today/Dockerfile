FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

# 세쌍둥이를 모두 가져와서 빌드한다 !
COPY . .

# npx expo start 프레임워크를 전부 다 다운받아 온다
RUN npx expo export

# 빌드 이후 새로운 Nginx 빌드를 진행한다
FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d/*

# 만들어지는 컨테이너에 현재 ec2의 default 파일을 오른쪽에 경로에 복사한다 (엔진엑스 기본 설정)
COPY ./default.conf /etc/nginx/conf.d/default.conf

# 위 첫번째 빌드에서 만들어진 세쌍둥이를 복사해온다
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# 파이프라인에서 이미지를 컨테이너화 할때 실행되는 파일이다 ! (즉 실행 파일들)
CMD [ "nginx", "-g", "daemon off;"]