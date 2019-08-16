package com.zl.main;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@MapperScan("com.zl.dao")
@EnableEurekaClient
@ComponentScan("com.zl")
public class SplsCreditApplication {

	public static void main(String[] args) {
		SpringApplication.run(SplsCreditApplication.class, args);
	}
	
}
