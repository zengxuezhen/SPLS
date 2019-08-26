package com.zl.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@SpringBootApplication
@ComponentScan("com.zl")
@EnableEurekaClient
//启用网关
@EnableZuulProxy
//启用session共享
@EnableRedisHttpSession(maxInactiveIntervalInSeconds=300)
public class SplsZuulApplication {

	public static void main(String[] args) {
		SpringApplication.run(SplsZuulApplication.class, args);
	}

}
