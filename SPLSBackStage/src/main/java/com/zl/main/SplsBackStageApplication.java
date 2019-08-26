package com.zl.main;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableEurekaClient
@ComponentScan("com.zl")
@MapperScan("com.zl.dao")
@FeignClient
public class SplsBackStageApplication {

	public static void main(String[] args) {
		SpringApplication.run(SplsBackStageApplication.class, args);
	}

}
