package com.ssafy.today.global.config;

import com.ssafy.today.domain.diary.dto.request.DiaryContentCreated;
import com.ssafy.today.domain.diary.dto.request.DiaryContentRequest;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaConsumerConfig {
    @Value("${kafka.server}")
    private String KafkaServerIp;

    @Value("${kafka.group}")
    private String KafkaSpringGroup;
    @Bean
    public ConsumerFactory<String, DiaryContentCreated> consumerFactory() {
        Map<String, Object> config = new HashMap<>();
        // Broker 서버 설정
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, KafkaServerIp);
        // consumer 그룹 설정
        config.put(ConsumerConfig.GROUP_ID_CONFIG, KafkaSpringGroup);

        return new DefaultKafkaConsumerFactory<>(config, new StringDeserializer(), new JsonDeserializer<>(DiaryContentCreated.class));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, DiaryContentCreated> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, DiaryContentCreated> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());

        return factory;
    }
}
