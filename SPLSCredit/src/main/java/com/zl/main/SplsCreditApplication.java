package com.zl.main;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@SpringBootApplication
@MapperScan("com.zl.dao")
@EnableEurekaClient
@ComponentScan("com.zl")
@EnableRedisHttpSession(maxInactiveIntervalInSeconds=300)
@EnableScheduling //定时器
//@EnableDistributedTransaction//开启分布式事务
public class SplsCreditApplication {

	public static void main(String[] args) {
		SpringApplication.run(SplsCreditApplication.class, args);
	}
	
}
