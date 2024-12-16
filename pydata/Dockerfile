FROM python:3.9.13

WORKDIR /app/

COPY . .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

# ec2 자체에 시간대를 asia로 설정했다 해도 컨테이너는 기본적으로  UTC시간을 가지고있다.
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo Asia/Seoul > /etc/timezone

# 이미지에 환경변수를 지정해둔다 !  ( 배포 환경 설정을 진행한다 )
ENV APP_ENV=prod

CMD uvicorn --host=0.0.0.0 --port 8000 app.main:app
