package com.zl.main;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableEurekaClient
@ComponentScan("com")
@MapperScan("com.zl.dao")
public class SplsUserApplication {

	public static void main(String[] args) {
		SpringApplication.run(SplsUserApplication.class, args);
	}

}
