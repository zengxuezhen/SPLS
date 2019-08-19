package com.zl.api;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;

/*
 * 提供调用用户服务接口
 * */
@FeignClient("Credit-service")
public interface CreditServiceApi {
	@RequestMapping("/querySubjectMatterAndType")
	String getSubjectMatter(Long id);
}
