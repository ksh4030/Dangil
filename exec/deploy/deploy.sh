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